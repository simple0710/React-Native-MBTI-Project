import { View, Image, Text } from "react-native";

function Loading({ progress }) {
  return (
    <View style={{alignItems: "center"}}>
      <Image source={require("./loading/Spinner-1s-200px.gif")}></Image>
      <Text>Loading...</Text>
      <Text>Progress: {progress}%</Text>
    </View>
  );
}
export default Loading;
