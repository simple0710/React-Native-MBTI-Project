import { StyleSheet, Dimensions } from "react-native";

const result_css = StyleSheet.create({
  // Main Styles
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },

  // Result Styles
  result_container: {
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
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  // Toggle Styles
  toggle_text: {
    fontSize: 14,
  },

  // Graph Styles
  graph_container: {
    // backgroundColor: "white",
    borderWidth: 0.8,
    borderStyle: "solid",
    borderColor: "black",
    // borderRadius: 4,

    // width: "70%",
    // paddingRight: 30,
    // alignItems: "center",
    // marginBottom: 10,
  },

  // Share and return Styles
  sub_container: {
    marginTop: 20,
    borderTopWidth: 0.8,
    // borderTopStyle: "solid",
    // borderTopColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  sub_button: {
    width: Dimensions.get("window").width / 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
    height: Dimensions.get("window").height / 20,
  },

  sub_text: {
    flex: 1,
    verticalAlign: "middle",
    textAlign: "center",
  },
});

export default result_css;
