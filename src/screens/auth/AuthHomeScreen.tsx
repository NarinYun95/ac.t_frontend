import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/CustomButton';
import { authNavigations, colors } from '@/constants';


type AuthHomeScreenProps = StackScreenProps<AuthStackParamList,
    typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({ navigation }: AuthHomeScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={require('@/assets/logo.png')} />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    label="카카오 로그인"
                    onPress={() => navigation.navigate(authNavigations.KAKAO)}
                    style={styles.kakaoButtonContainer}
                    textStyle={styles.kakaoButtonText}
                />
                <CustomButton
                    label="이메일 로그인"
                    onPress={() => navigation.navigate(authNavigations.LOGIN)}
                />
                <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
                    <Text style= {styles.emailText}>이메일로 가입하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 40,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 1.5,
        width: Dimensions.get('screen').width / 2
    },
    buttonContainer: {
        flex: 1,
        gap: 10,
    },
    kakaoButtonContainer:{
        backgroundColor: '#FEE500',
    },
    kakaoButtonText: {
        color: '#000000',
    },
    emailText: {
        textDecorationLine: 'underline',
        fontWeight: '500',
        padding: 10,
        color: colors.BLACK,
        textAlign: 'center'
    }
});

export default AuthHomeScreen;
