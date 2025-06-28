import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const shalatOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function Navbar(props: { title?: string | null }) {
  const [time, setTime] = useState('');
  const [nextShalat, setNextShalat] = useState('');
  // ambil title dari prop
  const { title } = props;
 

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    axios.get('https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=2')
      .then(res => {
        const timings = res.data.data.timings;
        const now = new Date();
        let found = false;
        for (let i = 0; i < shalatOrder.length; i++) {
          const name = shalatOrder[i];
          const jam = timings[name]; // format "HH:mm"
          const [h, m] = jam.split(':').map(Number);
          const waktuShalat = new Date(now);
          waktuShalat.setHours(h, m, 0, 0);
          if (now < waktuShalat) {
            setNextShalat(`${namaShalat(name)}: ${jam}`);
            found = true;
            break;
          }
        }
        // Jika sudah lewat semua, tampilkan shalat pertama besok (atau Isha hari ini)
        if (!found) {
          setNextShalat(`${namaShalat(shalatOrder[0])}: ${timings[shalatOrder[0]]}`);
        }
      });

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* StatusBar agar icon notifikasi (jam, batre, dll) jadi putih */}
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{title?? 'Kajian Kebangkitan'}</Text>
      <View style={styles.right}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.shalat}>{nextShalat}</Text>
      </View>
    </View>
  );
}

// Fungsi untuk mengubah nama API ke nama Indonesia
function namaShalat(apiName: string) {
  switch (apiName) {
    case 'Fajr': return 'Subuh';
    case 'Dhuhr': return 'Dzuhur';
    case 'Asr': return 'Ashar';
    case 'Maghrib': return 'Maghrib';
    case 'Isha': return 'Isya';
    default: return apiName;
  }
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  right: { alignItems: 'flex-end' },
  time: { fontSize: 16, color: '#fff' },
  shalat: { fontSize: 14, color: '#fff' },
});