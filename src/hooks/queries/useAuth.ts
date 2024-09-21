import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken, getProfile, kakaoLogin, logout, postLogin, postSignup, ResponseToken, KakaoLoginResponse } from "@/api/auth";
import { ResponseError, UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils/encryptStorage"; // Encrypted Storage 함수를 사용
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect, useState } from "react";
import queryClient from "@/api/queryClients";
import { numbers, queryKeys, storageKeys } from "@/constants";
import CookieManager from "@react-native-cookies/cookies";

// 쿠키에서 리프레시 토큰을 삭제하는 함수 (전체 쿠키 삭제 방식)
const removeCookie = async () => {
  try {
    await CookieManager.clearAll(); // 모든 쿠키를 삭제
    console.log('All cookies cleared successfully');
  } catch (error) {
    console.error('Failed to remove cookies:', error);
  }
};

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin<T>(loginAPI: MutationFunction<ResponseToken | KakaoLoginResponse, T>, mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({ accessToken}) => {
      // 액세스 토큰만 Encrypted Storage에 저장
      await setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
      setHeader('Authorization', `Bearer ${accessToken}`);
      // 리프레시 토큰은 서버에서 HttpOnly 쿠키로 설정되므로 여기서 처리하지 않음
    },
    onError: (error: ResponseError, variables, context) => {
      console.error('Login Error:', error, 'Variables:', variables, 'Context:', context);
      if (mutationOptions?.onError) {
        mutationOptions.onError(error, variables, context);
      }
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE] });
    },
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
}

// 리프레쉬 토큰으로 액세스 토큰 갱신
function useGetRefreshToken() {
  const { isSuccess, data, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess && data.accessToken) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKeys.ACCESS_TOKEN, data.accessToken); // ACCESS_TOKEN을 Encrypted Storage에 저장
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.ACCESS_TOKEN); // 저장된 ACCESS_TOKEN 삭제
      
      // 리프레시 토큰 쿠키에서 삭제
      removeCookie();
    }
  }, [isError]);

  return { isSuccess, isError };
}

// 프로필 가져오기
function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.ACCESS_TOKEN); // 저장된 ACCESS_TOKEN 삭제
      
      // 리프레시 토큰 쿠키에서 삭제 (인자 없이 호출)
      removeCookie();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions
  });
}

// 인증 훅 사용
function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess // 성공한 이후 프로필 가져올 수 있도록
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const logoutMutation = useLogout();
  
  // userId를 가져옴
  const [userId, setUserIdState] = useState<string | null>(null);
  const [isLoginState, setIsLoginState] = useState(isLogin);

  useEffect(() => {
    setIsLoginState(isLogin);
  }, [isLogin]);

  return { 
    signupMutation, 
    loginMutation, 
    isLogin: isLoginState,
    setIsLogin: setIsLoginState,
    getProfileQuery, 
    logoutMutation, 
    kakaoLoginMutation, 
    userId 
  };
}

export default useAuth;
