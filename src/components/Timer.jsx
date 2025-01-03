import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Timer = ({ time }) => {

  const formatterTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatterTime}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333"
  }
})

export default Timer