import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} />
      <TouchableOpacity style={styles.circle} />
      <TouchableOpacity style={styles.circle} />
      <TouchableOpacity style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  circle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#03a9f4' },
});