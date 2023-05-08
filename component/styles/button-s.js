import { StyleSheet, Dimensions } from "react-native";

const button = StyleSheet.create({
  button: {
    borderRadius: 8,
    // 중앙 정렬
    alignItems: "center",
    flexDirection: "row",
  },
  upload: {
    height: (Dimensions.get("window").height * 1) / 15,
    width: Dimensions.get("window").width - 200,
    backgroundColor: "#9191E9",
  },
  check: {
    marginTop: 20,
    height: (Dimensions.get("window").height * 1) / 15,
    width: Dimensions.get("window").width - 250,

    backgroundColor: "#C7DBFB",
  },
  result: {
    flex: 0.1,
    alignItems: "center",
    flexDirection: "row",
    verticalAlign: "middle",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#CCDEFA",
    borderRadius: 8,
    height: (Dimensions.get("window").height * 1) / 15,
    width: Dimensions.get("window").width - 250,
  },
});

export default button;
