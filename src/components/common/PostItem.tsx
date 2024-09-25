import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CommonPostData } from '@/types/domain';

interface PostItemProps extends CommonPostData {
  id: string;
  image: string;
  onPress: (id: string) => void;
  renderSpecificFields?: () => React.ReactNode;
}

const PostItem: React.FC<PostItemProps> = ({ 
  id, 
  title, 
  description, 
  locationTag,
  activityTag,
  date,
  image, 
  onPress,
  renderSpecificFields 
}) => {
  return (
    <TouchableOpacity style={styles.postContainer} onPress={() => onPress(id)}>
      <Image source={{ uri: image }} style={styles.postImage} />
      <View style={styles.postTextContainer}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postDescription}>{description}</Text>
        <Text style={styles.postInfo}>{locationTag} | {activityTag}</Text>
        <Text style={styles.postDate}>{date}</Text>
        {renderSpecificFields && renderSpecificFields()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTextContainer: {
    padding: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
  },
  postInfo: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default PostItem;