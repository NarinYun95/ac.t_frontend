import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatRoomStackParamList } from '@/navigations/tab/ChatRoomStack';

type ChatListScreenNavigationProp = StackNavigationProp<ChatRoomStackParamList, 'ChatList'>;

interface ChatRoom {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  type: 'mate' | 'mentorMentee';
}

const dummyChatRooms: ChatRoom[] = [
  { id: '1', title: '같이 스키탈 사람', lastMessage: '네, 알겠습니다!', lastMessageTime: '1:15pm', type: 'mate' },
  { id: '2', title: 'Micheal Ashton', lastMessage: '내일 만나요', lastMessageTime: '3:25pm', type: 'mentorMentee' },
  { id: '3', title: 'Chris Stapleton', lastMessage: '감사합니다', lastMessageTime: '4:20pm', type: 'mate' },
  { id: '4', title: 'Kelly Atkins Band', lastMessage: '좋은 하루 되세요', lastMessageTime: '7:06pm', type: 'mentorMentee' },
  { id: '5', title: 'Paul Beardsley', lastMessage: '내일 봐요', lastMessageTime: '8:22pm', type: 'mate' },
  { id: '6', title: 'DJ B Renn', lastMessage: '알겠습니다', lastMessageTime: '9:17pm', type: 'mentorMentee' },
];

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation<ChatListScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'mate' | 'mentorMentee'>('mate');

  const filteredChatRooms = dummyChatRooms.filter(room => room.type === activeTab);

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={styles.chatRoomItem}
      onPress={() => navigation.navigate('ChatRoom', { chatRoomId: item.id, userId: 'currentUserId' })}
    >
      <Image
        source={require('@/assets/icons//bar/chatlist.png')}
        style={styles.profileImage}
      />
      <View style={styles.chatRoomInfo}>
        <Text style={styles.chatRoomTitle}>{item.title}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mate' && styles.activeTab]}
          onPress={() => setActiveTab('mate')}
        >
          <Text style={[styles.tabText, activeTab === 'mate' && styles.activeTabText]}>Mate 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mentorMentee' && styles.activeTab]}
          onPress={() => setActiveTab('mentorMentee')}
        >
          <Text style={[styles.tabText, activeTab === 'mentorMentee' && styles.activeTabText]}>멘토멘티</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredChatRooms}
        renderItem={renderChatRoom}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
  },
  listContainer: {
    padding: 10,
  },
  chatRoomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatRoomInfo: {
    flex: 1,
  },
  chatRoomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatListScreen;