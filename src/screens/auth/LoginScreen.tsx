import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import { TextInput } from 'react-native-gesture-handler';
import useAuth from '@/hooks/queries/useAuth';
import { ResponseError } from '@/types/common';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';

type LoginScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.LOGIN>;

function LoginScreen({navigation}:LoginScreenProps) {
	const passwordRef = useRef<TextInput | null>(null);
	const { loginMutation } = useAuth();
	const [loginError, setLoginError] = useState<string | undefined>(undefined); // 에러 메시지를 저장할 상태

	const login = useForm({
		initialValue: { email: '', password: '' },
		validate: validateLogin,
	})


	// 백엔드 에러 메시지를 한국어로 변환하는 함수
	const getErrorMessage = (error: ResponseError) => {
		const backendMessage = error.response?.data?.message || '';

		switch (backendMessage) {
			case 'User not found':
				return '존재하지 않는 이메일입니다.'; // 이메일이 존재하지 않는 경우
			case 'Invalid credentials':
				return '비밀번호가 올바르지 않습니다.'; // 비밀번호 불일치 시
			default:
				return '로그인 중 오류가 발생했습니다.'; // 일반적인 오류 메시지
		}
	};

	const handleSubmit = () => {
		setLoginError(undefined); // 제출 전 에러 메시지 초기화
		loginMutation.mutate(login.values, {
			onSuccess: () => {
				navigation.navigate(authNavigations.ADDITIONAL_INFO)
			},
			onError: (error: ResponseError) => {
				setLoginError(getErrorMessage(error)); // 로그인 실패 시 에러 메시지 설정
			},
		});
	};


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContiainer}>
				<InputField
					autoFocus //자동으로 키보드 띄우기
					placeholder='이메일'
					error={login.errors.email || loginError}
					touched={login.touched.email} //터치된 상태 입력
					inputMode="email"
					returnKeyType='next'
					blurOnSubmit={false}  //키보드 안내려감
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