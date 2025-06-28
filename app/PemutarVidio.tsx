import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

import Navbar from '@/components/Navbar';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round((width - 24) * 9 / 16); // 16:9 aspect ratio, with horizontal margin

const videos = Array.from({ length: 15 }).map((_, i) => ({
  id: String(i + 1),
  title: `Judul Video ${i + 1}`,
  category: ['Kajian', 'Motivasi', 'Ibadah'][i % 3],
  date: `2024-06-${(i + 10).toString().padStart(2, '0')}`,
}));

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Navbar />
        <View style={styles.videoWrapper}>
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/_av6zpUw9Us' }}
            style={styles.video}
            allowsFullscreenVideo
          />
        </View>
        <View style={styles.listWrapper}>
          {videos.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.card,
                idx === 0 ? styles.cardTopRounded : null,
                idx === videos.length - 1 ? styles.cardBottom : null,
              ]}
            >
              <View>
                <View style={styles.row}>
                  <View style={styles.dot} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.infoRow}>
                      <Text style={styles.category}>{item.category}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

import { Text } from 'react-native';

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { paddingTop: 8, flexGrow: 1, paddingBottom: 0 },
  videoWrapper: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  video: {
    width: width - 24,
    height: VIDEO_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  listWrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 10,
    paddingTop: 16,
    paddingHorizontal: 20,
    flex: 1,
    minHeight: 400,
  },
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',

  },
  cardTopRounded: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cardBottom: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976d2',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  category: {
    fontSize: 13,
    color: '#1976d2',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginLeft: 20,
    marginTop: 2,
    textAlign: 'right',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});