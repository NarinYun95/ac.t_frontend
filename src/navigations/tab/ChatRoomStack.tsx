import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatRoomScreen from '@/screens/bar/chat/ChatScreen';
import { chatNavigations } from '@/constants';
import ChatListScreen from '@/screens/bar/chat/ChatList';


export type ChatRoomStackParamList = {
  [chatNavigations.CHAT_LIST]: undefined;
  [chatNavigations.CHAT_ROOM]: { chatRoomId: string; userId: string ;};
};

const Stack = createStackNavigator<ChatRoomStackParamList>();

const ChatRoomStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};


export default ChatRoomStack;