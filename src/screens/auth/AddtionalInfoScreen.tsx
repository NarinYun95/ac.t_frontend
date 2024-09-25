import React, { useRef } from 'react';
import { SafeAreaView, View, StyleSheet, TextInput, Text, TouchableOpacity, Keyboard, NativeSyntheticEvent, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useAuth from '@/hooks/queries/useAuth';
import { TextInputKeyPressEventData } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { authNavigations } from '@/constants';
import useForm from '@/hooks/useForm';
import { validateAdditionalInfo } from '@/utils';


type AdditionalInfoScreenProps = StackScreenProps<AuthStackParamList, typeof authNavigations.ADDITIONAL_INFO>;

function AdditionalInfoScreen({ navigation }: AdditionalInfoScreenProps) {
  const { userId } = useAuth();
  const bioRef = useRef<TextInput | null>(null);

  // useForm 훅 사용하여 입력값 관리 및 유효성 검사
  const { values, errors, touched, getTextInputProps, handleSubmit } = useForm({
    initialValue: { nickname: '', bio: '' },
    validate: validateAdditionalInfo,
  });

  const [gender, setGender] = React.useState('남');
  const [age, setAge] = React.useState<string | undefined>(undefined); // 선택 항목 기본값 설정

  const handleNicknameKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      bioRef.current?.focus();
    }
  };

  const onSubmit = async () => {
    if (!userId) {
      console.error('User ID가 없습니다.');
      return;
    }
  
    try {
      const response = await fetch('https://34.64.33.25:443/api/auth/additional-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          nickname: values.nickname,
          bio: values.bio,
          gender,
          age,
        }),
      });
  
      if (!response.ok) {
        // 응답이 정상적이지 않은 경우 (예: 상태 코드 4xx 또는 5xx)
        const errorData = await response.json();
        console.error('추가 정보 저장 실패:', errorData);
        Alert.alert('추가 정보 저장에 실패했습니다. 다시 시도해 주세요.');
        return;
      }
  
      const data = await response.json();
      console.log('추가 정보 저장 성공:', data);
  
      if (data.success) {
        // 응답 구조에 맞춰 이 조건을 확인
        navigation.navigate(authNavigations.BALANCE_GAME);
      } else {
        console.error('추가 정보 저장 실패:', data);
        Alert.alert('추가 정보 저장에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('추가 정보 저장 에러:', error);
      Alert.alert('서버와의 연결에 문제가 발생했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="닉네임 입력"
          {...getTextInputProps('nickname')}
          style={styles.input}
          multiline={false} // 한글 입력이 잘 되도록 multiline 설정
          autoCapitalize="none"
          autoCorrect={false} // 자동 수정 기능 끄기
          textAlignVertical="top" // Android에서 한글 입력 문제 해결
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => bioRef.current?.focus()}
          onKeyPress={handleNicknameKeyPress}
        />
        {touched.nickname && errors.nickname && <Text style={styles.errorText}>{errors.nickname}</Text>}

        <TextInput
          ref={bioRef}
          placeholder="한 줄 자기소개"
          {...getTextInputProps('bio')}
          style={styles.input}
          multiline={false} // 한글 입력이 잘 되도록 multiline 설정
          autoCapitalize="none"
          autoCorrect={false} // 자동 수정 기능 끄기
          textAlignVertical="top" // Android에서 한글 입력 문제 해결
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {touched.bio && errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

        <View style={styles.genderContainer}>
          <Text style={styles.label}>성별</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity onPress={() => setGender('남')}>
              <Text style={[styles.radio, gender === '남' && styles.radioSelected]}>남</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('여')}>
              <Text style={[styles.radio, gender === '여' && styles.radioSelected]}>여</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>나이</Text>
          <Picker
            selectedValue={age}
            onValueChange={(itemValue) => setAge(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="선택" value={undefined} />
            <Picker.Item label="20" value="20" />
            <Picker.Item label="21" value="21" />
            <Picker.Item label="22" value="22" />
          </Picker>
          {age === undefined && <Text style={styles.errorText}>나이를 선택해 주세요.</Text>}
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 50,
    color: '#888888',
  },
  inputContainer: {
    gap: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  radio: {
    fontSize: 16,
    color: '#333333',
  },
  radioSelected: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pickerContainer: {
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdditionalInfoScreen;
