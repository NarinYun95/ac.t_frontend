import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MateFinderScreen from '@/screens/home/mate/MateFinderScreen';
import MentorMenteeScreen from '@/screens/home/mate/MentorMenteeScreen';
import MatePostDetailScreen from '@/screens/home/mate/MatePostDetailScreen';
import MatePostCreateScreen from '@/screens/home/mate/MatePostCreateScreen';
import { mateNavigations } from '@/constants';
import CustomTabBar from '@/components/CustomTabBar';

const Tab = createMaterialTopTabNavigator();
const MateFinderStack = createStackNavigator();
const MentorMenteeStack = createStackNavigator();
const RootStack = createStackNavigator();

export type MateStackParamList = {
  [mateNavigations.MATE_TAB]: undefined;
  [mateNavigations.MATE_FINDER]: undefined;
  [mateNavigations.MENTOR_MENTEE]: undefined;
  [mateNavigations.POST_DETAIL]: { postId: string; postType: 'mate' | 'mentorMentee' };
  [mateNavigations.CREATE_POST]: { postType: 'mate' | 'mentorMentee' };
};

// Wrapper 함수들
const MateFinderScreenWrapper = (props: any) => <MateFinderScreen {...props} />;
const MentorMenteeScreenWrapper = (props: any) => <MentorMenteeScreen {...props} />;
const MatePostDetailScreenWrapper = (props: any) => <MatePostDetailScreen {...props} />;
const MatePostCreateScreenWrapper = (props: any) => <MatePostCreateScreen {...props} />;

function MateFinderStackNavigator() {
  return (
    <MateFinderStack.Navigator>
      <MateFinderStack.Screen 
        name={mateNavigations.MATE_FINDER}
        component={MateFinderScreenWrapper}
        options={{ headerShown: false }}
      />
      <MateFinderStack.Screen 
        name={mateNavigations.POST_DETAIL}
        component={MatePostDetailScreenWrapper}
        options={{ title: 'Mate 상세' }}
      />
      <MateFinderStack.Screen 
        name={mateNavigations.CREATE_POST}
        component={MatePostCreateScreenWrapper}
        options={{ title: 'Mate 글쓰기' }}
      />
    </MateFinderStack.Navigator>
  );
}

function MentorMenteeStackNavigator() {
  return (
    <MentorMenteeStack.Navigator>
      <MentorMenteeStack.Screen 
        name={mateNavigations.MENTOR_MENTEE}
        component={MentorMenteeScreenWrapper}
        options={{ headerShown: false }}
      />
      <MentorMenteeStack.Screen 
        name={mateNavigations.POST_DETAIL}
        component={MatePostDetailScreenWrapper}
        options={{ title: '멘토멘티 상세' }}
      />
      <MentorMenteeStack.Screen 
        name={mateNavigations.CREATE_POST}
        component={MatePostCreateScreenWrapper}
        options={{ title: '멘토멘티 글쓰기' }}
      />
    </MentorMenteeStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen 
        name="MateFinderTab" 
        component={MateFinderStackNavigator} 
        options={{ title: 'Mate 찾기' }}
      />
      <Tab.Screen 
        name="MentorMenteeTab" 
        component={MentorMenteeStackNavigator} 
        options={{ title: '멘토멘티' }}
      />
    </Tab.Navigator>
  );
}

const MateNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen 
        name={mateNavigations.MATE_TAB} 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default MateNavigator;