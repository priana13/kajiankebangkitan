import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const videos = [
  { id: '1', title: 'Judul bawaan vidio' },
  { id: '2', title: 'Judul bawaan vidio' },
  { id: '3', title: 'Judul bawaan vidio' },
];

export default function VideoList() {
  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bbb',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});