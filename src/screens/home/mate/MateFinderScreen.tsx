import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { mateNavigations } from '@/constants';
import { MateStackParamList } from '@/navigations/home/MateNavigator';
import { MateFinderData } from '@/types/domain';
import PostItem from '@/components/common/PostItem';

type Props = StackScreenProps<MateStackParamList, typeof mateNavigations.MATE_FINDER>;

const dummyPosts: (MateFinderData & { id: string, image: string })[] = Array(5).fill(null).map((_, index) => ({
  id: index.toString(),
  title: '게시글 제목',
  description: '게시글 설명',
  locationTag: '서울',
  activityTag: '하이킹',
  date: '2024-09-15',
  image: 'https://example.com/image.jpg',
  hashtags: ['#등산', '#주말'],
  maxParticipants: 5,
  personal_preferences: '초보자 환영'
}));

const MateFinderScreen = ({ navigation, route }: Props) => {
  const [activeTab, setActiveTab] = useState<'mate' | 'mentorMentee'>('mate');

  const renderPost = ({ item }: { item: MateFinderData & { id: string, image: string } }) => (
    <PostItem
      {...item}
      onPress={(id) => navigation.push(mateNavigations.POST_DETAIL, { postId: id, postType: activeTab })}
      renderSpecificFields={() => (
        <>
          <Text>최대 참가자: {item.maxParticipants}</Text>
          <Text>해시태그: {item.hashtags.join(', ')}</Text>
          <Text>선호사항: {item.personal_preferences}</Text>
        </>
      )}
    />
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
        data={dummyPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.push(mateNavigations.CREATE_POST, { postType: activeTab })}
      >
        <Image
          source={require('@/assets/icons/edit.png')}
          style={styles.fabIcon}
        />
      </TouchableOpacity>
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
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  postImage: {
    width: '100%',
    height: 150,
  },
  postTextContainer: {
    padding: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  fabIcon: {
    width: 24,
    height: 24,
    tintColor: 'white', // 아이콘 색상을 흰색으로 변경
  },
});

export default MateFinderScreen;