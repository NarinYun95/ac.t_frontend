import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MateStackParamList } from '@/navigations/home/MateNavigator';
import { mateNavigations } from '@/constants';
import useForm from '@/hooks/useForm';
import { validateCreatePost } from '@/utils';
import { MateFinderData, MentorMenteeData } from '@/types/domain';

type MatePostCreateScreenProps = StackScreenProps<MateStackParamList, typeof mateNavigations.CREATE_POST>;

// date 필드를 제외한 타입 정의
type MatePostFormValues = Omit<MateFinderData, 'date'>;
type MentorMenteePostFormValues = Omit<MentorMenteeData, 'date'>;
type PostFormValues = MatePostFormValues | MentorMenteePostFormValues;


// 타입 가드 함수 추가
export function isMatePostFormValues(values: PostFormValues): values is MatePostFormValues {
  return 'hashtags' in values;
}

function MatePostCreateScreen({ route, navigation }: MatePostCreateScreenProps) {
  const { postType } = route.params;

  const initialValues: PostFormValues = postType === 'mate'
    ? {
      title: '',
      description: '',
      locationTag: '',
      activityTag: '',
      hashtags: [],
      maxParticipants: 1,
      personal_preferences: '',
    } as MatePostFormValues
    : {
      title: '',
      description: '',
      locationTag: '',
      activityTag: '',
      price: 0,
      maxMentees: 1,
    } as MentorMenteePostFormValues;

  const { values, errors, touched, getTextInputProps, handleSubmit, updateValues } = useForm<PostFormValues>({
    initialValue: initialValues,
    validate: validateCreatePost,
  });

  const onSubmit = () => {
    // 현재 시간을 ISO 문자열로 생성
    const currentDate = new Date().toISOString();

    // API 호출 로직
    const postData = {
      ...values,
      date: currentDate, // 현재 시간을 추가
      type: postType,
    };
    console.log('게시글 생성:', postData);
    // TODO: API 호출 구현
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{postType === 'mate' ? 'Mate 찾기' : '멘토멘티'} 게시글 작성</Text>

      {/* 공통 필드 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          placeholder="제목을 입력하세요"
          {...getTextInputProps('title')}
        />
        {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="설명을 입력하세요"
          multiline
          numberOfLines={4}
          {...getTextInputProps('description')}
        />
        {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>위치</Text>
        <TextInput
          style={styles.input}
          placeholder="위치를 입력하세요"
          {...getTextInputProps('locationTag')}
        />
        {touched.locationTag && errors.locationTag && <Text style={styles.errorText}>{errors.locationTag}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>활동</Text>
        <TextInput
          style={styles.input}
          placeholder="활동을 입력하세요"
          {...getTextInputProps('activityTag')}
        />
        {touched.activityTag && errors.activityTag && <Text style={styles.errorText}>{errors.activityTag}</Text>}
      </View>

      {/* Mate 찾기 특정 필드 */}
      {postType === 'mate' && isMatePostFormValues(values) && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>해시태그</Text>
            <TextInput
              style={styles.input}
              placeholder="해시태그를 입력하세요 (쉼표로 구분)"
              value={values.hashtags.join(', ')}
              onChangeText={(text) => {
                const hashtagArray = text.split(',').map(tag => tag.trim());
                updateValues({ hashtags: hashtagArray } as Partial<MatePostFormValues>);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>최대 참가자 수</Text>
            <TextInput
              style={styles.input}
              placeholder="최대 참가자 수를 입력하세요"
              keyboardType="numeric"
              {...getTextInputProps('maxParticipants' as keyof PostFormValues)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>개인 선호사항</Text>
            <TextInput
              style={styles.input}
              placeholder="개인 선호사항을 입력하세요"
              {...getTextInputProps('personal_preferences' as keyof PostFormValues)}
            />
          </View>
        </>
      )}

      {/* 멘토멘티 특정 필드 */}
      {postType === 'mentorMentee' && !isMatePostFormValues(values) && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>가격</Text>
            <TextInput
              style={styles.input}
              placeholder="가격을 입력하세요"
              keyboardType="numeric"
              {...getTextInputProps('price' as keyof PostFormValues)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>최대 멘티 수</Text>
            <TextInput
              style={styles.input}
              placeholder="최대 멘티 수를 입력하세요"
              keyboardType="numeric"
              {...getTextInputProps('maxMentees' as keyof PostFormValues)}
            />
          </View>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>게시글 작성</Text>
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MatePostCreateScreen;