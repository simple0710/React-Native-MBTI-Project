import { StyleSheet, Dimensions } from "react-native";

const result_css = StyleSheet.create({
  // Main Styles
  container: {
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "space-between",
    flexDirection: "row",
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 0.15,
    // width: Dimensions.get("window").width,
    width: 300,
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
    height: Dimensions.get("window").height,
    backgroundColor: "green",
    // justifyContent: "space-around",
  },
  // Result Styles
  result_container: {
    alignSelf: "center",
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
    // flexDirection: "row",
    height: Dimensions.get("window").height,
    // verticalAlign: "middle",
    textAlign: "center",
    // height: "100%",
    minHeight: Dimensions.get("window").height,
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
  sub_test: {},
  sub_container: {
    backgroundColor: "red",
    // flex: 1,
    // position: "absolute",
    // bottom: 0,
    alignSelf: "flex-end",
    // position: "absolute",
    bottom: 0,
    // width: Dimensions.get("window").width,
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 20,
    // flex: 1,
    // borderTopWidth: 0.8,
    // // alignContent: "flex-end",
    // borderTopStyle: "solid",
    // // borderTopColor: "black",
    // flexDirection: "row",
    // // justifyContent: "space-around",
    // alignItems: "center",
    // paddingTop: 20,
    // paddingBottom: 20,
    // backgroundColor: "red",
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
