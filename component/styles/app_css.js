import { StyleSheet } from "react-native";

const app_css = StyleSheet.create({
  // Main Styles
  main_container: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },

  // Header Styles
  header: {
    flex: 0.2,
    verticalAlign: "middle",
    textAlign: "center",
    backgroundColor: "#CCCCCC",
    alignItems: "center",
  },
  logo_text: {
    flex: 1,
    verticalAlign: "middle",
    fontSize: 50,
    fontWeight: "bold",
  },

  // Router Styles
  router: {
    flex: 0.75,
  },
  // Footer Styles
  footer: {
    flex: 0.05,
    textAlign: "center",
    backgroundColor: "#CCCCCC",
    alignItems: "center",
  },
  footer_text: {
    flex: 1,
    fontSize: 12,
    verticalAlign: "middle",
  },
});

export default app_css;
