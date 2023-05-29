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
      <View
        style={{
          alignItems: "center",
          // borderTopColor: "black",
          // borderTopWidth: 0.6,
          // borderStyle: "solid",
          marginTop: 10,
          position: "absolute",
          bottom: 0,
        }}
      >
        <Text
          style={StyleSheet.compose(styles.text, {
            borderTopColor: "black",
            borderBottomWidth: 0.6,
            borderStyle: "solid",
          })}
        >
          딥러닝 모델 정보
        </Text>
        <Text style={styles.text}>
          딥러닝 엔진 v1.2.1: KIUTI Convolutional Transformer Network v5
        </Text>
        <Text style={styles.text}>파라미터 수: 15,154,608</Text>
        <Text style={styles.text}>
          전처리 엔진 v1.5.0: Synonym Substitution with WordNet
        </Text>
        <Text style={styles.text}>
          학습 정확도: 0.9996, 검증 정확도: 0.9347
        </Text>
        <Text style={styles.text}>(정밀도: 0.9356, 재현율: 0.9347)</Text>
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
