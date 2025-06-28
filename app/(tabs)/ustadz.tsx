import { ImageBackground, ScrollView, StyleSheet } from 'react-native';

import Navbar from '@/components/Navbar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  // Data tulisan yang bisa diubah secara dinamis
  const boxTexts = [
    'Ust.Herman Saptaji', 'Ust. Ibrahim Bafadhol',
    'Ust.Hawari', 'Ust.Ahmad jamaludin',
    'Ust.M.Sarbini', 'Ust. Ali Maulida',
    'Ust.Ende Hasan', 'Ust. Faishol',
    'Ust.Solahuddin', 'Ust.Fatih',
    'Ust.Arifin', 'Ust.Yusuf Supriadi',
  ];
  // Link dinamis untuk setiap box
  const boxLinks = [
    '/kajian/herman', '/kajian/ibrahim',
    '/kajian/hawari', '/kajian/ahmad',
    '/kajian/sarbini', '/kajian/ali',
    '/kajian/ende', '/kajian/faishol',
    '/kajian/solahuddin', '/kajian/fatih',
    '/kajian/arifin', '/kajian/yusuf',
  ];

  return (     
    <ImageBackground
      source={require('@/assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >

      <ScrollView contentContainerStyle={styles.container}>
      
      <Navbar title="List Ustadz" />
   
      <ThemedView style={styles.gridContainer}>
        {Array.from({ length: 6 }).map((_, rowIdx) => (
          <ThemedView key={rowIdx} style={styles.row}>
            {Array.from({ length: 2 }).map((_, colIdx) => {
              const idx = rowIdx * 2 + colIdx;
              return (
                <ThemedView key={colIdx} style={styles.box}>
                  <ThemedText type="default" style={styles.boxText}>{boxTexts[idx]}</ThemedText>
                  <Link href={boxLinks[idx] as any} style={styles.linkText}>kajian</Link>
                </ThemedView>
              );
            })}
          </ThemedView>
        ))}
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
