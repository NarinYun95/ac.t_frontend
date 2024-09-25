import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import MateFinderScreen from '@/screens/home/mate/MateFinderScreen';
import MentorMenteeScreen from '@/screens/home/mate/MentorMenteeScreen';
import MatePostDetailScreen from '@/screens/home/mate/MatePostDetailScreen';
import MatePostCreateScreen from '@/screens/home/mate/MatePostCreateScreen';
import { mateNavigations } from '@/constants';
import CustomTabBar from '@/components/CustomTabBar';
import { NavigatorScreenParams, CompositeScreenProps } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator<TabParamList>();
const RootStack = createStackNavigator<MateStackParamList>();

export type TabParamList = {
  [mateNavigations.MATE_FINDER]: undefined;
  [mateNavigations.MENTOR_MENTEE]: undefined;
};

export type MateStackParamList = {
  [mateNavigations.MATE_TAB]: NavigatorScreenParams<TabParamList>;
  [mateNavigations.POST_DETAIL]: { postId: string; postType: 'mate' | 'mentorMentee' };
  [mateNavigations.CREATE_POST]: { postType: 'mate' | 'mentorMentee' };
};

export type MateScreenProps = CompositeScreenProps<
  MaterialTopTabScreenProps<TabParamList>,
  StackScreenProps<MateStackParamList>
>;

function TabNavigator() {
  return (
    <Tab.Navigator 
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <Tab.Screen 
        name={mateNavigations.MATE_FINDER}
        component={MateFinderScreen} 
        options={{ title: 'Mate 찾기' }}
      />
      <Tab.Screen 
        name={mateNavigations.MENTOR_MENTEE}
        component={MentorMenteeScreen} 
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
      <RootStack.Screen 
        name={mateNavigations.POST_DETAIL}
        component={MatePostDetailScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, color: '#007AFF' }}>{'<'} 뒤로</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen 
        name={mateNavigations.CREATE_POST}
        component={MatePostCreateScreen}
        options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 16, color: '#007AFF' }}>{'<'} 뒤로</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </RootStack.Navigator>
  );
};

export default MateNavigator;