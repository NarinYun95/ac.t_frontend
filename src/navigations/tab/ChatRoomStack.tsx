import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '@/screens/bar/chat/ChatScreen';


export type ChatRoomStackParamList = {
  ChatRoom: { chatRoomId: string; userId: string };
};

const Stack = createStackNavigator<ChatRoomStackParamList>();

const ChatRoomStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
      name="ChatRoom" 
      component={ChatRoomScreen}
       />
    </Stack.Navigator>
    
  );
};

export default ChatRoomStack;