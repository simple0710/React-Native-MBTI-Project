import { StyleSheet } from "react-native";

const main = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
  },
  result_container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "grey",
  },
  flex_container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "red",
  },
  main: {
    flex: 0.65,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  header: {
    flex: 0.3,
    verticalAlign: "middle",
    textAlign: "center",
    backgroundColor: "#CCCCCC",
    alignItems: "center",
  },
  footer: {
    flex: 0.05,
    textAlign: "center",
    backgroundColor: "#CCCCCC",
    alignItems: "center",
  },
});

export default main;
