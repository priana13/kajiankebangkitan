import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const videos = [
  {
    id: '1',
    title: 'Keutamaan Qurban',
    category: 'Ibadah',
    pemateri: 'Ust. Ahmad',
    thumbnail: require('@/assets/images/qurban.jpg'),
  },
  {
    id: '2',
    title: 'Makna Hijrah',
    category: 'Motivasi',
    pemateri: 'Ust. Budi',
    thumbnail: require('@/assets/images/qurban.jpg'),
  },
  {
    id: '3',
    title: 'Adab Menuntut Ilmu',
    category: 'Adab',
    pemateri: 'Ust. Chandra',
    thumbnail: require('@/assets/images/qurban.jpg'),
  },
];

type VideoItem = {
  id: string;
  judul: string;
  kategori: string;
  pemateri: string;
  thumbnail: string; // URL dari API
};

export default function VideoList({ onPressItem }: { onPressItem?: (item: any) => void }) {


    const [listVideo, setListVideo] = useState<VideoItem[]>([]);
  
    const fetchVideo = async () => {
      try {
        const response = await fetch('https://kajian.sidonat.com/get-video?json=true'); // Ganti dengan URL API yang sesuai
        const data = await response.json();
        setListVideo(data);

        console.log('List Video:', data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Panggil fungsi fetchVideo saat komponen pertama kali dimuat
    useEffect(() => {
      fetchVideo();
    }, []);



  return (
    <FlatList
      data={listVideo}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem && onPressItem(item)}>
          <View style={styles.card}>
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.judul}</Text>
              <Text style={styles.category}>{item.kategori}</Text>
              <Text style={styles.pemateri}>{item.pemateri}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bbb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 2,
  },
  pemateri: {
    fontSize: 13,
    color: '#555',
  },
});