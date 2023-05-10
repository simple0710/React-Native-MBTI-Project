import { View, Image } from "react-native";

function Loading() {
  return (
    <View>
      <Image source={require("./loading/Spinner-1s-200px.gif")}></Image>
    </View>
  );
}
export default Loading;
