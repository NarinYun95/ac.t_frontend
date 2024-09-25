import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { mateNavigations } from '@/constants';
import { MateStackParamList } from '@/navigations/home/MateNavigator';
import PostItem from '@/components/common/PostItem';
import { MentorMenteeData } from '@/types/domain';

type MentorMenteeScreenProps = StackScreenProps<MateStackParamList, typeof mateNavigations.MENTOR_MENTEE>;

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

function MentorMenteeScreen({ navigation }: MentorMenteeScreenProps) {
  const renderPost = ({ item }: { item: MentorMenteeData & { id: string, image: string } }) => (
    <PostItem
      {...item}
      onPress={(id) => navigation.push(mateNavigations.POST_DETAIL, { postId: id , postType: 'mentorMentee'})}
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
});

export default MentorMenteeScreen;