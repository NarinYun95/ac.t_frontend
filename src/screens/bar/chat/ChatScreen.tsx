import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MateStackParamList } from '@/navigations/home/MateNavigator';

type ChatRoomParams = {
  chatRoomId: string;
  userId: string;
  onLeaveChatRoom?: (chatRoomId: string) => void;
};

type ChatRoomScreenProps = StackScreenProps<MateStackParamList, 'ChatRoom'> & {
  route: {
    params: ChatRoomParams;
  };
};

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function ChatRoomScreen({ route, navigation }: ChatRoomScreenProps) {
  const { chatRoomId, userId, onLeaveChatRoom } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const dummyMessages: Message[] = [
      { id: '1', text: '안녕하세요!', sender: 'other', timestamp: '1:10pm' },
      { id: '2', text: '반갑습니다!', sender: userId, timestamp: '1:11pm' },
      { id: '3', text: '오늘 날씨가 좋네요.', sender: 'other', timestamp: '1:12pm' },
    ];
    setMessages(dummyMessages);
  }, [chatRoomId, userId]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: userId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleLeaveChatRoom = () => {
    Alert.alert(
      "채팅방 나가기",
      "나가시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => {
            if (onLeaveChatRoom) {
              onLeaveChatRoom(chatRoomId);
            }
            Alert.alert("알림", "채팅방에서 나갔습니다.", [
              {
                text: "확인",
                onPress: () => navigation.goBack()
              }
            ]);
          }
        }
      ]
    );
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === userId ? styles.userMessage : styles.otherMessage]}>
      <Text style={[styles.messageText, item.sender === userId ? styles.userMessageText : styles.otherMessageText]}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('@/assets/icons/back_arrow.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>같이 스키탈 사람</Text>
        <TouchableOpacity onPress={handleLeaveChatRoom}>
          <Text style={styles.leaveButton}>나가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="메시지를 입력하세요..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Alice Blue
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4682B4', // Steel Blue
    borderBottomWidth: 1,
    borderBottomColor: '#B0C4DE', // Light Steel Blue
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  leaveButton: {
    color: '#F0F8FF', // Alice Blue
    fontSize: 16,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageList: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    minHeight: '100%',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1E90FF', // Dodger Blue
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#A9A9A9',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#B0C4DE', // Light Steel Blue
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Alice Blue
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#4682B4', // Steel Blue
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4', // Steel Blue
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;