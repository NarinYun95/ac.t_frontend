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
  HOME_MAIN: 'HomeMain',
  ACTIVITY: 'Activity',
  POST: 'Post',
  MATE: 'Mate',
  STORE: 'Store',
  EVENT: 'Event',
} as const

const mateNavigations = {
  MATE_TAB: 'MateTab',
  MATE_FINDER: 'MateFinder',
  MENTOR_MENTEE: 'MentorMentee',
  POST_DETAIL: 'PostDetail',
  CREATE_POST: 'CreatePost',
} as const;

export { authNavigations, homeNavigations, mateNavigations }
