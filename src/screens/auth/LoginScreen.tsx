import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';
import { ResponseError, handleApiError } from '@/utils/errorHandler';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';

type LoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.LOGIN>;

function LoginScreen({navigation}:LoginScreenProps) {
  const passwordRef = useRef<TextInput | null>(null);
  const { loginMutation } = useAuth();
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const login = useForm({
    initialValue: { email: '', password: '' },
    validate: validateLogin,
  })

  const handleSubmit = () => {
    setLoginError(undefined);
    loginMutation.mutate(login.values, {
      onSuccess: () => {
        navigation.navigate(authNavigations.ADDITIONAL_INFO)
      },
      onError: (error: ResponseError) => {
        const errorMessage = handleApiError(error);
        setLoginError(errorMessage);
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContiainer}>
        <InputField
          autoFocus
          placeholder='이메일'
          error={login.errors.email || loginError}
          touched={login.touched.email}
          inputMode="email"
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder='비밀번호'
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType='join'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContiainer: {
    gap: 20,
    marginBottom: 30,
  }
});

export default LoginScreen;