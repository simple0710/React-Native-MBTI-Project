import { StyleSheet, Dimensions } from "react-native";

const button = StyleSheet.create({
  upload: {
    height: Dimensions.get('window').height * 1 / 15,
    width: Dimensions.get('window').width - 200,
    backgroundColor: "#9191E9",
  },
  check: {
    marginTop: 20,
    height: Dimensions.get('window').height * 1 / 15,
    width: Dimensions.get('window').width - 250,

    backgroundColor: "#C7DBFB",
  },
})

export default button;