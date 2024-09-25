type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  kakaoImageUri: string | null;
  loginType: 'email' | 'kakao' | 'apple';
}

interface CommonPostData {
  title: string;
  description: string;
  locationTag: string;
  activityTag: string;
  date: string;
}

interface MateFinderData extends CommonPostData {
  hashtags: string[];
  maxParticipants: number;
  personal_preferences: string;
}

interface MentorMenteeData extends CommonPostData {
  price: number;
  maxMentees: number;
}

export type {MarkerColor, Category, ImageUri, Profile, Marker, Post,CommonPostData, MateFinderData, MentorMenteeData};