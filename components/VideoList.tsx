import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

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

export default function VideoList({ onPressItem }: { onPressItem?: (item: any) => void }) {
  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressItem && onPressItem(item)}>
          <View style={styles.card}>
            <Image source={item.thumbnail} style={styles.thumbnail} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>{item.category}</Text>
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