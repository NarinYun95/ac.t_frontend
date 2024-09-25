import { homeNavigations } from '@/constants';
import { HomeStackParamList } from '@/navigations/home/HomeStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type HomeScreenProps = StackScreenProps<HomeStackParamList,
  typeof homeNavigations.STORE
>;

const StoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Store Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
export default StoreScreen;
