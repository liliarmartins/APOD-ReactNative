import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import RenderImage from './components/RenderImageComponent/RenderImage';

const date = new Date();

export default function App() {
  return (
    <View style={styles.container}>
      <RenderImage date={date} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
