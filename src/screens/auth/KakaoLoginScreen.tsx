import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import axios from 'axios';
import Config from 'react-native-config';
import useAuth from '@/hooks/queries/useAuth';
import { authNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import axiosInstance from '@/api/axios';

type KakaoLoginScreenProps = StackScreenProps<AuthStackParamList,
  typeof authNavigations.KAKAO
>;

const REDIRECT_URI = 'https://34.64.33.25/api/auth/kakao/callback';

function KakaoLoginScreen({ navigation }: KakaoLoginScreenProps) {
  const { kakaoLoginMutation, setIsLogin } = useAuth();

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');
      requestToken(code);
    }
  };

  // 카카오로부터 토큰 요청
  const requestToken = async (code: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: Config.KAKAO_REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        },
      });

      const accessToken = response.data.access_token;

      kakaoLoginMutation.mutate(accessToken, {
        onSuccess: async (data) => {
          // 타입 좁히기를 사용하여 data가 KakaoLoginResponse 타입인지 확인
          if ('kakaoId' in data && 'email' in data && 'name' in data) {
            // 서버에서 받은 응답 처리
            const registerResponse = await axiosInstance.post('/api/auth/kakao/register', {
              kakaoId: data.kakaoId,
              email: data.email,
              name: data.name,
            }, 
            { withCredentials: true } // 쿠키를 포함하는 설정
          );

            if (registerResponse.status === 200 && registerResponse.data.userId) {
              // 성공적으로 로그인했으므로 isLogin 상태를 true로 설정
              setIsLogin(true);
            } else {
              // 새로운 유저라면 추가 정보 입력 화면으로 이동
              navigation.navigate(authNavigations.ADDITIONAL_INFO);
            }
          } else {
            console.error('Unexpected data format:', data);
          }
        },

      });
    } catch (error) {
      console.error('토큰 요청 에러:', error);
      // 에러 처리 로직 추가 가능
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `http://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
      />
      {/* 로딩 표시를 추가할 수 있습니다. */}
      {kakaoLoginMutation.status === 'pending' && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default KakaoLoginScreen;
