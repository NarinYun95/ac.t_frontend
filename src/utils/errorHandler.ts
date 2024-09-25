// utils/errorHandler.ts
interface ResponseError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
const getErrorMessage = (error: ResponseError) => {
  const backendMessage = error.response?.data?.message || '';

  switch (backendMessage) {
    case 'User not found':
      return '존재하지 않는 이메일입니다.';
    case 'Invalid credentials':
      return '비밀번호가 올바르지 않습니다.';
    // 다른 에러 케이스들...
    default:
      return '오류가 발생했습니다. 다시 시도해주세요.';
  }
};

const handleApiError = (error: ResponseError) => {
  const errorMessage = getErrorMessage(error);
  // 여기에 토스트 메시지 표시 또는 다른 전역 에러 처리 로직을 추가할 수 있습니다.
  console.error(errorMessage);
  return errorMessage;
};

export {getErrorMessage, handleApiError};
export type { ResponseError };