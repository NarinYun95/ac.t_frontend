import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import { authNavigations } from '@/constants';
import SignupScreen from '@/screens/auth/SignupScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import AdditionalInfoScreen from '@/screens/auth/AddtionalInfoScreen';
import SignupCompleteScreen from '@/screens/auth/SignupCompleteScreen';
import BalanceGameScreen from '@/screens/auth/BalanceGameScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.KAKAO]: undefined;
  [authNavigations.ADDITIONAL_INFO]: undefined; // 네비게이션 타입에 추가
  [authNavigations.SIGNUP_COMPLETE]: undefined;
  [authNavigations.BALANCE_GAME]: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black'
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '로그인'
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignupScreen}
        options={{
          headerTitle: '회원가입'
        }} />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KakaoLoginScreen}
        options={{
          headerTitle: '카카오 로그인'
        }} />
      <Stack.Screen
        name={authNavigations.ADDITIONAL_INFO}  // 새로운 스크린 추가
        component={AdditionalInfoScreen}
        options={{
          headerTitle: '추가 정보 입력'
        }} />
      <Stack.Screen
        name={authNavigations.SIGNUP_COMPLETE}
        component={SignupCompleteScreen}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen
        name={authNavigations.BALANCE_GAME}  // 새로운 스크린 추가
        component={BalanceGameScreen}
        options={{
          headerTitle: '취향 밸런스 게임'
        }} />
    </Stack.Navigator>

  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
