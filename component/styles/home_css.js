import { StyleSheet, Dimensions } from "react-native";

const home_css = StyleSheet.create({
  // Main Styles
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },

  // Button Styles
  button: {
    borderRadius: 8,
    // 중앙 정렬
    alignItems: "center",
    flexDirection: "row",
  },
  // Header Styles
  header: {
    flex: 0.4,
    width: Dimensions.get("window").width,
    verticalAlign: "middle",
    textAlign: "center",
    // backgroundColor: "#8e001c",
    // 파랑이
    backgroundColor: "#99CCFF",
    // backgroundColor: "#99FF99",
    alignItems: "center",
  },
  logo_text: {
    flex: 1,
    verticalAlign: "middle",
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },

  // Body Styles
  body: {
    flex: 0.3,
    width: Dimensions.get("window").width,
    verticalAlign: "center",
    alignItems: "center",
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
  footer: {
    flex: 0.05,
    textAlign: "center",
    // backgroundColor: "#CCCCCC",
    borderTopColor: "black",
    // position: "absolute",
    // bottom: 0,
    alignItems: "center",
  },
  footer_text: {
    flex: 1,
    fontSize: 12,
    verticalAlign: "middle",
  },
});

export default home_css;
