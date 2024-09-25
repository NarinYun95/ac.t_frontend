
import axios, { AxiosError } from 'axios';
import { getAccessToken } from './auth';
import { setEncryptStorage } from '@/utils';
import Config from 'react-native-config';
import { storageKeys } from '@/constants';
import { Platform } from 'react-native';
import { handleApiError, ResponseError } from '@/utils/errorHandler';


const axiosInstance = axios.create({
  baseURL: "https://34.64.33.25:443",
  // React Native에서는 httpsAgent 대신 다른 방식으로 SSL 검증을 비활성화합니다
  withCredentials: true, // 필요한 경우 쿠키 사용
});



axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      console.error('Original request is undefined');
      return Promise.reject(error);
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (!(originalRequest as any)._retry) {
            (originalRequest as any)._retry = true;
            try {
              const { accessToken } = await getAccessToken();
              await setEncryptStorage(storageKeys.ACCESS_TOKEN, accessToken);
              axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              return axiosInstance(originalRequest);
            } catch (refreshError) {
              console.error('토큰 갱신 실패:', refreshError);
              // 로그아웃 처리
              // await logout();
              return Promise.reject(refreshError);
            }
          }
          break;
        case 403:
          console.error('권한이 없습니다. 상태 코드:', error.response.status);
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다. 상태 코드:', error.response.status);
          break;
        case 500:
          console.error('서버 내부 오류가 발생했습니다. 상태 코드:', error.response.status);
          break;
        default:
          console.error(`알 수 없는 오류가 발생했습니다. 상태 코드: ${error.response.status}`);
          break;
      }
    } else if (error.request) {
      console.error('네트워크 오류가 발생했습니다. 서버로부터 응답을 받지 못했습니다.');
    } else {
      console.error('요청 설정 중 오류가 발생했습니다:', error.message);
    }

    // handleApiError 함수를 사용하여 에러 메시지 생성
    const errorMessage = handleApiError(error as ResponseError);
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
