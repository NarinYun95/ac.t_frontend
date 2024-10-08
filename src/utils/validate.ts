import { isMatePostFormValues } from '@/screens/home/mate/MatePostCreateScreen';
import { MateFinderData, MentorMenteeData } from '@/types/domain';

type MatePostFormValues = Omit<MateFinderData, 'date'>;
type MentorMenteePostFormValues = Omit<MentorMenteeData, 'date'>;
type PostFormValues = MatePostFormValues | MentorMenteePostFormValues;

type UserInformation = {
  email: string;
  password: string;
};

type UserAdditionalInfo = {
  nickname: string;
  bio: string;
}


function validateUser(values: UserInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
}

function validateLogin(values: UserInformation) {
  return validateUser(values);
}

function validateSignup(values: UserInformation & { passwordConfirm: string; name: string; phone: string; }) {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '', name: '', phone: '' };

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  if (values.name.trim().length === 0) {
    signupErrors.name = '이름을 입력해주세요.';
  }

  if (!/^\d{10,11}$/.test(values.phone)) {
    signupErrors.phone = '유효한 전화번호를 입력해주세요.';
  }

  return signupErrors;
}

function validateAdditionalInfo (values:UserAdditionalInfo) {
  const errors ={
    nickname: '',
    bio: '',
  }

  // 닉네임 유효성 검사
  if (values.nickname.trim().length == 0) {
    errors.nickname='닉네임을 입력해주세요.'
  }
  // 바이오 유효성 검사
  if (values.bio.trim().length==0) {
    errors.bio='자기소개를 입력해주세요'
};
return errors;
}


function validateCreatePost(values: PostFormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.title) {
    errors.title = '제목을 입력해주세요.';
  }

  if (!values.description) {
    errors.description = '설명을 입력하세요.';
  }

  if (!values.locationTag) {
    errors.locationTag = '위치를 입력하세요.';
  }

  if (!values.activityTag) {
    errors.activityTag = '활동을 입력하세요.';
  }

  if (isMatePostFormValues(values)) {
    // MatePostFormValues인 경우
    if (!values.hashtags || values.hashtags.length === 0) {
      errors.hashtags = '최소 하나의 해시태그를 입력해주세요.';
    }
    if (!values.maxParticipants || values.maxParticipants < 1) {
      errors.maxParticipants = '유효한 참가자 수를 입력해주세요.';
    }
    if (!values.personal_preferences) {
      errors.personal_preferences = '개인 선호사항을 입력해주세요.';
    }
  } else {
    // MentorMenteePostFormValues인 경우
    if (!values.price || values.price < 0) {
      errors.price = '유효한 가격을 입력해주세요.';
    }
    if (!values.maxMentees || values.maxMentees < 1) {
      errors.maxMentees = '유효한 멘티 수를 입력해주세요.';
    }
  }

  return errors;
}

export { validateLogin, validateSignup, validateAdditionalInfo, validateCreatePost };
