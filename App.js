import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, TextInput } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"]

export default function App() {

  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(60 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )

    await sound.playAsync()
  }

  const handleStartStop = () => {
    playSound()
    setIsActive(prev => !prev)
  }

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTimeout(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  return (
    <SafeAreaView style={[styles.containerArea, { backgroundColor: colors[currentTime] }]}>
      <View style={styles.container}>

        <Text style={styles.text}>Pomodoro!</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        {/* <TextInput type="number" /> */}
        <TouchableOpacity style={styles.constinerButton} onPress={handleStartStop}>
          <Text style={[styles.button]}>{isActive ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerArea: {
    flex: 1
  },
  container: {
    marginTop: Platform.OS === "android" ? 30 : 10,
    paddingHorizontal: 15
  },
  text: {
    fontSize: 32
  },
  constinerButton: {
    backgroundColor: "#333",
    padding: 15,
    margingTop: 15,
    borderRadius: 15,
    alignItems: "center"
  },
  button: {
    color: "white",
    fontWeight: "bold"
  }
});
