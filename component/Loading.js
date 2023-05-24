import { StyleSheet, View, Image, Text } from "react-native";

function Loading({ progress }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./Img/Loading-dark-1s-200px.gif")}></Image>
      <Text>Loading...</Text>
      <Text>Progress: {progress}%</Text>
      <View
        style={{
          alignItems: "center",
          borderTopColor: "black",
          borderTopWidth: 0.6,
          borderStyle: "solid",
          marginTop: 3,
        }}
      >
        <Text style={styles.text}>" 예측 결과는 대화방의 분위기에 따라 "</Text>
        <Text style={styles.text}>실제 성격과 다를 수 있습니다</Text>
      </View>
    </View>
  );
}
export default Loading;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
  },
});
