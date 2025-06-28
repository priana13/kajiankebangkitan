import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

import Navbar from '@/components/Navbar';
import VideoList from '@/components/VideoList';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Navbar />
        <View style={styles.content}>
          <VideoList />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { paddingTop: 32, flexGrow: 1 },
  content: { flex: 1, marginHorizontal: 12 },
});
