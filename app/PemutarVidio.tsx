import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import Navbar from '@/components/Navbar';
import { Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = Math.round((width - 24) * 9 / 16); // 16:9 aspect ratio, with horizontal margin

// const videos = Array.from({ length: 15 }).map((_, i) => ({
//   id: String(i + 1),
//   title: `Judul Video ${i + 1}`,
//   category: ['Kajian', 'Motivasi', 'Ibadah'][i % 3],
//   date: `2024-06-${(i + 10).toString().padStart(2, '0')}`,
// }));

type VideoItem = {
  id: string;
  judul: string;
  kategori: string;
  pemateri: string;
  thumbnail: string; // URL dari API
};

function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

export default function HomeScreen() {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const [listVideo, setListVideo] = useState<VideoItem[]>([]);
  
  const fetchVideo = async () => {
    try {
      const response = await fetch('https://kajian.sidonat.com/get-video?json=true'); // Ganti dengan URL API yang sesuai
      const data = await response.json();
      setListVideo(data);

      // console.log('List Video:', data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Panggil fungsi fetchVideo saat komponen pertama kali dimuat
  useEffect(() => {
    fetchVideo();
  }, []);


  useEffect(() => {
    if (item) {
     
      navigation.setOptions({
        title: item.title,
      });
    }
  }, [item, navigation]);

  return (
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Navbar title={item.judul}  />
        <View style={styles.videoWrapper}>
          <WebView
            source={{ uri: item.url }}
            style={styles.video}
            allowsFullscreenVideo
          />
        </View>
        <View style={styles.listWrapper}>
          {listVideo.map((videoItem, idx) => (
            <TouchableOpacity
              key={videoItem.id}
              onPress={() => navigation.navigate('PemutarVidio', { item: videoItem })}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.card,
                  idx === 0 ? styles.cardTopRounded : null,
                  idx === listVideo.length - 1 ? styles.cardBottom : null,
                ]}
              >
                <View>
                  <View style={styles.row}>
                    <View style={styles.dot} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>{capitalizeWords(videoItem.judul)}</Text>
                      <View style={styles.infoRow}>
                        <Text style={styles.category}>{videoItem.kategori}</Text>
                        <Text style={styles.date}>{videoItem.pemateri}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}


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