import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { validateSignup } from '@/utils';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/queries/useAuth';
import { authNavigations } from '@/constants';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import axiosInstance from '@/api/axios';

type SignupScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.SIGNUP>;

function SignupScreen({ navigation }: SignupScreenProps) {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const phoneRef = useRef<TextInput | null>(null);
  const verificationCodeRef = useRef<TextInput | null>(null);

  const { signupMutation, loginMutation } = useAuth();

  const signup = useForm({
    initialValue: { email: '', password: '', passwordConfirm: '', name: '', phone: '' },
    validate: validateSignup,
  });

  const handleEmailVerificationRequest = async () => {
    try {
      const response = await axiosInstance.post('/api/auth/send-email', {
        email: signup.values.email,
      });
      if (response.status === 200) {
        setVerificationCodeSent(true);
        setVerificationMessage('인증코드를 입력해주세요.');
      }
    } catch (error) {
      console.error('인증 코드 발송 오류:', error);
    }
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      const verificationCodeNumber = parseInt(verificationCode, 10); // 문자열을 숫자로 변환
      const response = await axiosInstance.post('/api/auth/verify-email', {
        email: signup.values.email,
        inputAuthNumber: verificationCodeNumber,
      });
      if (response.status === 200) {
        setIsEmailVerified(true);
        setVerificationMessage('확인되었습니다.');
      } else {
        setVerificationMessage('인증코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('인증 코드 확인 오류:', error);
    }
  };

  const handleSubmit = async () => {
    if (!isEmailVerified) {
      signup.setErrors({ email: '이메일 인증을 완료해주세요.' });
      return;
    }

    const { email, password, name, phone } = signup.values;

    try {
      await signupMutation.mutateAsync({ email, password, name, phone });

      // 회원가입 성공 시 완료 페이지로 이동
      navigation.navigate(authNavigations.SIGNUP_COMPLETE);
    } catch (error: any) {
      // 회원가입 중 오류가 발생했을 때 처리
      if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
        // 이메일 중복 오류를 useForm의 errors에 설정
        signup.setErrors({ email: '이미 사용 중인 이메일입니다.' });
      } else {
        signup.setErrors({ email: '회원가입 중 문제가 발생했습니다.' });
      }
    }
  };

  // 이메일 입력 필드와 버튼을 렌더링하는 컴포넌트
  const renderInputWithButton = (inputProps: any, buttonText: string, onPress: () => void) => (
    <View style={styles.inputWithButtonContainer}>
      <TextInput
        style={styles.inputWithButtonInput}
        {...inputProps}
      />
      <TouchableOpacity style={styles.inputWithButton} onPress={onPress}>
        <Text style={styles.verificationButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        {renderInputWithButton(
          {
            placeholder: '이메일',
            ...signup.getTextInputProps('email'),
            autoCapitalize: "none",
            keyboardType: "email-address",
            returnKeyType: 'next',
            onSubmitEditing: () => passwordRef.current?.focus(),
          },
          '인증 요청',
          handleEmailVerificationRequest
        )}

        {/* 이메일 오류 메시지 출력 */}
        {signup.errors.email && signup.touched.email && (
          <Text style={styles.errorText}>{signup.errors.email}</Text>
        )}

        {verificationCodeSent && (
          <>
            {renderInputWithButton(
              {
                ref: verificationCodeRef,
                placeholder: '인증 코드',
                value: verificationCode,
                onChangeText: setVerificationCode,
                returnKeyType: 'next',
                onSubmitEditing: handleVerificationCodeSubmit,
              },
              '확인',
              handleVerificationCodeSubmit
            )}
            <Text style={styles.verificationMessage}>{verificationMessage}</Text>
          </>
        )}

        <InputField
          ref={passwordRef}
          placeholder='비밀번호'
          textContentType='oneTimeCode'
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder='비밀번호 확인'
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => nameRef.current?.focus()}
          {...signup.getTextInputProps('passwordConfirm')}
        />
        <InputField
          ref={nameRef}
          placeholder='이름'
          error={signup.errors.name}
          touched={signup.touched.name}
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => phoneRef.current?.focus()}
          {...signup.getTextInputProps('name')}
          autoCapitalize="none"
          keyboardType="default"
        />
        <InputField
          ref={phoneRef}
          placeholder='전화번호'
          error={signup.errors.phone}
          touched={signup.touched.phone}
          keyboardType="phone-pad"
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('phone')}
        />
      </View>
      <CustomButton label='회원가입' onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
  inputWithButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithButtonInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  inputWithButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  verificationButtonText: {
    color: '#000',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  verificationMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default SignupScreen;
