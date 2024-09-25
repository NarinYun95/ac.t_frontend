import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { mateNavigations } from '@/constants';
import { MateStackParamList, TabParamList } from '@/navigations/home/MateNavigator';
import PostItem from '@/components/common/PostItem';
import { MentorMenteeData } from '@/types/domain';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<TabParamList, typeof mateNavigations.MENTOR_MENTEE>,
  StackScreenProps<MateStackParamList>
>;

const dummyMentorMenteePosts: (MentorMenteeData & { id: string, image: string })[] = Array(5).fill(null).map((_, index) => ({
  id: index.toString(),
  title: '멘토멘티 제목',
  description: '멘토멘티 설명',
  locationTag: '온라인',
  activityTag: '프로그래밍',
  date: '2024-09-20',
  image: 'https://example.com/mentor-image.jpg',
  price: 50000,
  maxMentees: 3
}));

const MentorMenteeScreen: React.FC<Props> = ({ navigation }) => {
  const renderPost = ({ item }: { item: MentorMenteeData & { id: string, image: string } }) => (
    <PostItem
      {...item}
      onPress={(id) => navigation.push(mateNavigations.POST_DETAIL, { postId: id, postType: 'mentorMentee' })}
      renderSpecificFields={() => (
        <>
          <Text>가격: {item.price}원</Text>
          <Text>최대 멘티 수: {item.maxMentees}</Text>
        </>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyMentorMenteePosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.push(mateNavigations.CREATE_POST, { postType: 'mentorMentee' })}
      >
        <Image
          source={require('@/assets/icons/edit.png')}
          style={styles.fabIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 10,
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

export default MentorMenteeScreen;