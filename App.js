import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#f7dc6f", "#a2d9ce", "#d7bde2"]

export default function App() {

  const [isWorking, setIsWorking] = useState(false)
  const [time, setTime] = useState(60 * 60)
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)
  const [newTimeInput, setNewTimeInput] = useState();
  const [memoryTimeInput, setMemoryTimeInput] = useState(time);
  const [isFocused, setIsFocused] = useState(false); //Refactor

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    )

    await sound.playAsync()
  }

  const handleStartStop = () => {
    playSound()
    setIsActive(prev => !prev)
    setNewTimeInput(0)
  }

  const handleReset = () => {
    setTime(memoryTimeInput * 60)
  }

  const handleInputTime = (time) => {
    setNewTimeInput(time);
    setMemoryTimeInput(time)

    setTime(time * 60)
  };

  //Refactor
  const handleBlur = () => {
    setIsFocused(false);
    Keyboard.dismiss(); // Cierra el teclado
  };

  const handleFocus = () => {
    setIsFocused(true);
  };
  //********** */

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

        <TextInput
          style={[
            styles.input,
            isFocused ? styles.inputActive : styles.inputInactive,
          ]}
          keyboardType="numeric"
          onChangeText={handleInputTime}
          value={newTimeInput}
          placeholder="Ingrese un número"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <TouchableOpacity style={styles.constinerButton} onPress={handleStartStop}>
          <Text style={[styles.button]}>{isActive ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.constinerButton} onPress={handleReset}>
          <Text style={[styles.button]}>Reset</Text>
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
    marginVertical: 20,
    borderRadius: 15,
    alignItems: "center"
  },
  button: {
    color: "white",
    fontWeight: "bold"
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
    marginTop: 10
  },
  inputActive: {
    borderColor: "blue",
  },
  inputInactive: {
    borderColor: "gray",
  },
});
