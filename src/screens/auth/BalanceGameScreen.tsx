import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Button,} from 'react-native';

function BalanceGameScreen() {
  const [preferences, setPreferences] = useState({
    location_preference: '',
    environment_preference: '',
    group_preference: '',
    season_preference: '',
  });

  const handleSelection = (category: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = () => {
    fetch('http://34.64.33.25:443/api/auth/balance-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...preferences }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 성공시 다음 단계로 이동
          console.log('밸런스 게임 저장 성공', data);
        } else {
          console.error('밸런스 게임 저장 실패', data);
        }
      })
      .catch((error) => console.error('밸런스 게임 저장 에러', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameContainer}>
        {/* 밸런스 게임 선택 UI 추가 */}
        <Button title="육상 vs 해양" onPress={() => handleSelection('location_preference', '육상')} />
        <Button title="실내 vs 야외" onPress={() => handleSelection('environment_preference', '실내')} />
        <Button title="다인원 vs 소인원" onPress={() => handleSelection('group_preference', '다인원')} />
        <Button title="동계 vs 하계" onPress={() => handleSelection('season_preference', '동계')} />
      </View>
      <Button title="SUBMIT" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  gameContainer: {
    gap: 20,
  },
});

export default BalanceGameScreen;
