import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Header from './src/components/Header';

//const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"]

const [isWorking, setIsWorking] = useState(false)
const [time, setTime] = useState(25 * 60)
const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header time={time} />
      <Text style={styles.text}>Pomodoro</Text>
      {/* <Text style={styles.text}>{time}</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 30 : 10,
  },
  text: {
    fontSize: 32
  }
});
