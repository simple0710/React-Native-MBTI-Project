import { StyleSheet, Dimensions } from "react-native";

const result_css = StyleSheet.create({
  // Main Styles
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    // height: Dimensions.get("window").height,
    // marginBottom: 20,
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 0.15,
    width: 300,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "pink",
  },
  test: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    height: Dimensions.get("window").height,
    backgroundColor: "green",
  },
  // Result Styles
  result_container: {
    alignSelf: "center",
    flex: 1,
    borderRadius: 8,
    height: (Dimensions.get("window").height * 1) / 16,
    width: Dimensions.get("window").width - 300,
    backgroundColor: "#CCDEFA",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  result_text: {
    alignItems: "center",
    verticalAlign: "middle",
    // flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  body: {
    backgroundColor: "blue",
    height: Dimensions.get("window").height,
    textAlign: "center",
    minHeight: Dimensions.get("window").height,
  },
  // Toggle Styles
  toggle_text: {
    fontSize: 14,
    marginBottom: 5,
  },

  // Graph Styles
  graph_container: {
    borderWidth: 0.8,
    borderStyle: "solid",
    borderColor: "black",
    marginBottom: 20,
  },

  // Share and return Styles
  // footer_open
  footer: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
  },
  // footer_close
  footer_menu: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width / 3,
    flexDirection: "row",
    padding: 10,
  },

  footer_button: {
    alignContent: "center",
    width: Dimensions.get("window").width / 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
    height: Dimensions.get("window").height / 20,
    backgroundColor: "white",
  },
  footer_text: {
    flex: 1,
    verticalAlign: "middle",
    textAlign: "center",
  },
});

export default result_css;
