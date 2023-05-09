import { StyleSheet, Dimensions } from "react-native";

const home_css = StyleSheet.create({
  // Main Styles
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Button Styles
  button: {
    borderRadius: 8,
    // 중앙 정렬
    alignItems: "center",
    flexDirection: "row",
  },

  // Upload Button Styles
  upload: {
    height: (Dimensions.get("window").height * 1) / 15,
    width: Dimensions.get("window").width - 200,
    backgroundColor: "#9191E9",
  },
  upload_text: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Check Button Styles
  check: {
    marginTop: 20,
    height: (Dimensions.get("window").height * 1) / 15,
    width: Dimensions.get("window").width - 250,
    backgroundColor: "#C7DBFB",
  },
  check_text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default home_css;
