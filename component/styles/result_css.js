import { StyleSheet, Dimensions } from "react-native";

const result_css = StyleSheet.create({
  // Main Styles
  container: {
    flex: 1,
    backgroundColor: "#CCC222",
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "space-between",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexDirection: "row",
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 0.15,
    width: Dimensions.get("window").width,
    alignItems: "center",
    textAlign: "center",
    // flexDirection: "row",
    backgroundColor: "pink",
    // height:
    //   Dimensions.get("window").height - (Dimensions.get("window").height - 420),
    // justifyContent: "space-between",
  },
  test: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    justifyContent: "space-between",
    widht: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "green",
    // justifyContent: "space-around",
  },
  // Result Styles
  result_container: {
    flex: 1,
    // flex: 0.3,
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
    // Footer까지 침범하는 녀석
    backgroundColor: "blue",
    flex: 1,
    // flexDirection: "column",
    justifyContent: "space-between",
    // height: Dimensions.get("window").height,
    // verticalAlign: "middle",
    textAlign: "center",
    // height: "100%",
    // minHeight: Dimensions.get("window").height,
    // height: "100%",
    // height: 10,
    // height: Dimensions.get("window").height - 200,
  },
  // Toggle Styles
  toggle_text: {
    fontSize: 14,
  },

  // Graph Styles
  graph_container: {
    borderWidth: 0.8,
    borderStyle: "solid",
    borderColor: "black",
  },

  // Share and return Styles
  sub_container: {
    // flex: 0.3,
    // marginTop: 20,
    flex: 1,
    borderTopWidth: 0.8,
    // borderTopStyle: "solid",
    // borderTopColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    // paddingBottom: 20,
    backgroundColor: "red",
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
