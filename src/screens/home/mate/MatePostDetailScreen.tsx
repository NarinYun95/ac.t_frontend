import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MateStackParamList } from '@/navigations/home/MateNavigator';
import { mateNavigations } from '@/constants';
import { MateFinderData, MentorMenteeData } from '@/types/domain';

type MatePostDetailScreenProps = StackScreenProps<MateStackParamList, typeof mateNavigations.POST_DETAIL>;

function MatePostDetailScreen({ route, navigation }: MatePostDetailScreenProps) {
  const { postId, postType } = route.params;

  // 더미 데이터 (실제 구현 시 API에서 데이터를 가져와야 함)
  const post: MateFinderData | MentorMenteeData = postType === 'mate' 
    ? {
        title: 'Mate 게시글 제목',
        description: '게시글 내용\n상세 설명 / 준비물 / 난이도 등',
        locationTag: '서울',
        activityTag: '등산',
        date: '2024-09-15',
        hashtags: ['#등산', '#주말'],
        maxParticipants: 5,
        personal_preferences: '초보자 환영'
      }
    : {
        title: 'Mentor/Mentee 게시글 제목',
        description: '멘토링 내용\n상세 설명 / 커리큘럼 등',
        locationTag: '온라인',
        activityTag: '프로그래밍',
        date: '2024-09-20',
        price: 50000,
        maxMentees: 3
      };

  const handleJoinChat = () => {
    Alert.alert(
      "채팅방 참여",
      "채팅방에 참여하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "예",
          onPress: () => {
            // API 호출 (실제 구현 시 이 부분을 구현해야 함)
            const chatRoomId = "66decd1dc59913e163354677"; // 예시 ID
            const userId = "66d59b814caf44370e040e41"; // 예시 ID

            // 채팅방 화면으로 이동
            navigation.navigate('ChatRoom', { chatRoomId, userId });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{postType === 'mate' ? 'Mate 찾기' : '멘토멘티'} 게시글</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{post.title}</Text>
        <Text style={styles.infoText}>위치: {post.locationTag}</Text>
        <Text style={styles.infoText}>활동: {post.activityTag}</Text>
        <Text style={styles.infoText}>날짜: {post.date}</Text>
        {postType === 'mate' && 'maxParticipants' in post && (
          <>
            <Text style={styles.infoText}>최대 참가자 수: {post.maxParticipants}</Text>
            <Text style={styles.infoText}>해시태그: {post.hashtags.join(', ')}</Text>
            <Text style={styles.infoText}>선호사항: {post.personal_preferences}</Text>
          </>
        )}
        {postType === 'mentorMentee' && 'price' in post && (
          <>
            <Text style={styles.infoText}>가격: {post.price}원</Text>
            <Text style={styles.infoText}>최대 멘티 수: {post.maxMentees}</Text>
          </>
        )}
        <Text style={styles.contentText}>{post.description}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleJoinChat}>
        <Text style={styles.buttonText}>채팅방 참여하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  categoryContainer: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationContainer: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
  },
  titleContainer: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 200,
  },
  contentText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default MatePostDetailScreen;