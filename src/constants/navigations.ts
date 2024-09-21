const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  KAKAO: 'Kakao',
  ADDITIONAL_INFO: 'Additional Info', // 여기에 추가: 'Additional Info'
  SIGNUP_COMPLETE: 'Signup Complete',
  BALANCE_GAME: 'Balance game'
} as const;

const homeNavigations = {
HOME: 'Home',
ACTIVITY: 'Activity',
EVENT: 'Event',
MATE: 'Mate',
POST: 'Post',
STORE: 'Store',
} as const

export {authNavigations, homeNavigations}
