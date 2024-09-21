import CustomButton from '@/components/CustomButton';
import { authNavigations } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

type SignupCompleteScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.SIGNUP_COMPLETE>;

function SignupCompleteScreen({ navigation }: SignupCompleteScreenProps) {
  const handleConfirm = () => {
    // 확인 버튼 클릭 시 초기 화면으로 돌아가기 또는 원하는 페이지로 이동
    navigation.navigate(authNavigations.AUTH_HOME); // 또는 다른 페이지로 이동할 수 있습니다.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>회원가입이 완료되었습니다!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton label='처음으로' onPress={handleConfirm} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center', // SafeAreaView 내 요소들을 세로 기준으로 중앙 정렬
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center', // messageContainer와 buttonContainer를 세로 중앙으로 정렬
    gap: 200,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
  },
  buttonContainer: {
    // flex 제거하여 버튼 크기 고정
  },
});

export default SignupCompleteScreen;
