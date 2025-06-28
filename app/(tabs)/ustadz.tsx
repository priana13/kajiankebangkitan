import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

import Navbar from '@/components/Navbar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const [listUstadz, setListUstadz] = useState([]);

  const fetchUstadz = async () => {
    try {
      const response = await fetch('https://kajian.sidonat.com/get-pemateri?json=true'); // Ganti dengan URL API yang sesuai
      const data = await response.json();
      setListUstadz(data);
      console.log('List Ustadz:', data);
    } catch (error) {
      console.error('Error fetching ustadz:', error);
    }
  };

  // Panggil fungsi fetchUstadz saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUstadz();
  }, []);

  return (     
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView contentContainerStyle={styles.container}>
      
      <Navbar title="List Ustadz" />
   
      <ThemedView style={styles.gridContainer}>
        {Array.isArray(listUstadz) && listUstadz.length > 0 ? (
          // Tampilkan grid 2 kolom
          listUstadz.reduce((rows: any[], ustadz, idx) => {
            if (idx % 2 === 0) rows.push([ustadz]);
            else rows[rows.length - 1].push(ustadz);
            return rows;
          }, []).map((row, rowIdx) => (
            <ThemedView key={rowIdx} style={styles.row}>
              {row.map((ustadz: any, colIdx: number) => (
                <ThemedView key={colIdx} style={styles.box}>
                  <ThemedText type="default" style={styles.boxText}>{ustadz.nama}</ThemedText>
                  <Link href={`/kajian/${ustadz.slug}`} style={styles.linkText}>kajian</Link>
                </ThemedView>
              ))}
              {/* Jika jumlah ustadz ganjil, tambahkan box kosong */}
              {row.length < 2 && <ThemedView style={[styles.box, { backgroundColor: 'transparent' }]} />}
            </ThemedView>
          ))
        ) : (
          <ThemedText type="default" style={styles.boxText}>Memuat data...</ThemedText>
        )}
      </ThemedView>

     </ScrollView>


       
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { paddingTop: 32, flexGrow: 1 },
  content: { flex: 1, marginHorizontal: 12 },

  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor:"transparent",
    paddingHorizontal:10
  },
  gridContainer: {
    marginTop: 24,
    gap: 12,
    padding: 12,
    
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  box: {
    flex: 1,
    aspectRatio: 1.8,
    backgroundColor: '#e0e7ef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    marginTop: 4,
    fontSize: 14,
    color: '#007AFF',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
});
