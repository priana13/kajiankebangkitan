import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6AA0E7', dark: '#2475DF' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ustadz</ThemedText>
      </ThemedView>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  gridContainer: {
    marginTop: 24,
    gap: 12,
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
});
