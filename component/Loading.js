import { View, Image, Text } from "react-native";

function Loading({ progress }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./Img/Loading-dark-1s-200px.gif")}></Image>
      <Text>Loading...</Text>
      <Text>Progress: {progress}%</Text>
    </View>
  );
}
export default Loading;
