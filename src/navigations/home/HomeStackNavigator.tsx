import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/screens/bar/home/HomeScreen';
import ActivityScreen from '@/screens/home/activity/ActivityScreen';
import StoreScreen from '@/screens/home/store/StoreScreen';
import EventScreen from '@/screens/home/event/EventScreen';
import { homeNavigations } from '@/constants';
import MateNavigator from '@/navigations/home/MateNavigator';
import PostScreen from '@/screens/home/post/PostScreen';

export type HomeStackParamList = {
  [homeNavigations.HOME_MAIN]: undefined;
  [homeNavigations.ACTIVITY]: undefined;
  [homeNavigations.POST]: undefined;
  [homeNavigations.MATE]: undefined;
  [homeNavigations.STORE]: undefined;
  [homeNavigations.EVENT]: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <HomeStack.Screen
        name={homeNavigations.HOME_MAIN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={homeNavigations.ACTIVITY}
        component={ActivityScreen}
        options={{ headerTitle: '액티비티' }}
      />
      <HomeStack.Screen
        name={homeNavigations.POST}
        component={PostScreen}
        options={{ headerTitle: '게시판' }}
      />
      <HomeStack.Screen
        name={homeNavigations.MATE}
        component={MateNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={homeNavigations.STORE}
        component={StoreScreen}
        options={{ headerTitle: '스토어' }}
      />
      <HomeStack.Screen
        name={homeNavigations.EVENT}
        component={EventScreen}
        options={{ headerTitle: '이벤트' }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;