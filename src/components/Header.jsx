import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const options = ["Pomodoro", "Short Break", "Long Break"]

const Header = ({ setTime, currentTime, setCurrentTime }) => {

  const handlePress = (index) => {
    const newTime = index === 0 ? 60 : index === 1 ? 5 : 15;
    setCurrentTime(index)
    setTime(newTime * 60)
  }

  return (
    <View style={styles.container}>
      {
        options.map((item, index) => (
          <TouchableOpacity
            style={[styles.itemStyle, currentTime !== index && { borderColor: "transparent" }]}
            key={index}
            onPress={() => handlePress(index)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  itemStyle: {
    alignItems: "center",
    width: "33%",
    borderWidth: 3,
    padding: 5,
    borderColor: "white",
    borderRadius: 10,
    marginVertical: 20
  }
})

export default Header