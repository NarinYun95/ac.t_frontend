import axiosInstance from "./axios";
import { Category, Profile } from "../types/domain";
import { getEncryptStorage, setEncryptStorage } from "../utils";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";

type RequestUser = {
  email: string;
  password: string;
  name?: string;    // 추가
  phone?: string;   // 추가
};

type ResponseToken ={
  accessToken: string;
  refreshToken: string;
}

type KakaoLoginResponse = {
  accessToken: string;
  refreshToken: string;
  kakaoId: string;
  email: string;
  name: string;
};


//회원가입
const postSignup = async ({ email, password }: RequestUser): Promise<void> => {
  try {
    const { data } = await axiosInstance.post('/api/auth/register', {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error('Signup Error:', error);
    throw error; // 필요한 경우 에러를 다시 던져서 호출한 쪽에서 처리할 수 있게 할 수 있음
  }
};



// 로그인
const postLogin = async ({ email, password }: RequestUser): Promise<ResponseToken> => {
  try {
    const { data } = await axiosInstance.post(
      '/api/auth/login',
      { email, password },
      { withCredentials: true } // 쿠키 포함 설정
    );

    // accessToken은 localStorage에 저장
    await EncryptedStorage.setItem('accessToken', data.accessToken);

    // refreshToken은 서버에서 쿠키로 저장되므로 별도 저장 불필요
    return data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

//카카오 로그인
const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  try {
    const { data } = await axiosInstance.post('/api/auth/oauth/kakao', { token }, { withCredentials: true } // 쿠키를 포함하는 설정
      );
    return data;
  } catch (error) {
    console.error('Kakao Login Error:', error);
    throw error;
  }
};

type ResponseProfile = Profile & Category
//유저의 프로필 정보
const getProfile = async (): Promise<ResponseProfile> => {
  try {
    const { data } = await axiosInstance.get('/api/auth/me');
    return data;
  } catch (error) {
    console.error('Get Profile Error:', error);
    throw error;
  }
};

//토큰 리프레쉬: 인크립트 스토리지에 저장된 리프레쉬 토큰을 불러와서 헤더로 넣어줌
//토큰을 리프레쉬 성공한다는 거 자체가 이미 로그인한 적이 있어서 인크립트 스토리지에 리프레쉬 토큰이 저장되어있는 유저
//이걸 꺼내서 리프레시 api로 get요청을 보냄, 이때 헤더로 리프레시 토큰을 담아서 요청


// getAccessToken 함수: 서버에서 새로 받은 access-token을 localStorage에 저장
const getAccessToken = async (): Promise<ResponseToken> => {
  try {
    const response = await axiosInstance.post(
      '/api/auth/token',
      {},
      {
        withCredentials: true, // 쿠키 포함 설정
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const accessToken = response.data.accessToken;

    // 새로 받은 accessToken을 Encrypted Storage에 저장
    if (accessToken) {
      await setEncryptStorage('accessToken', accessToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('Access Token received and set:', accessToken);
    }

    return { accessToken, refreshToken: '' }; // refreshToken은 쿠키로 관리되므로 빈 값
  } catch (error) {
    console.error('Get Access Token Error:', error);
    if (axios.isAxiosError(error) && error.response) {
      // 서버에서 반환한 에러 메시지 처리
      throw new Error(error.response.data.message || 'Failed to get access token');
    }
    throw new Error('Network error occurred');
  }
};




//로그아웃 함수
const logout = async () => {
  try {
    await axiosInstance.post('/api/auth/logout', 
      {},
    { withCredentials: true }
  );
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
};

export {postSignup, postLogin, getProfile, getAccessToken, logout, kakaoLogin};
export type {RequestUser, ResponseToken, KakaoLoginResponse, ResponseProfile}