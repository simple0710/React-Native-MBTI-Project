import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

function HelpScreen() {
  return (
    // <View style={{ backgroundColor: theme.colors.accent }}>
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text>1. 오른쪽 상단 "3줄" 클릭</Text>
            <Image
              source={require("./Img/help/help-1.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            <Text>2. 오른쪽 하단 "톱니바퀴" 모양 선택</Text>
            <Image
              source={require("./Img/help/help-2.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            <Text>3. "채팅방 관리"의 "대화 내용 내보내기" 선택</Text>
            <Image
              source={require("./Img/help/help-3.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            <Text>4. "모든 메시지 내부저장소에 저장" 선택</Text>
            <Image
              source={require("./Img/help/help-4.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            <Text>5. "File Upload" 선택 후, 저장한 카카오톡 txt파일 선택</Text>
            <Image
              source={require("./Img/help/help-5.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            <Text>6. "Check" 버튼 선택 후 결과 확인</Text>
            <Image
              source={require("./Img/help/help-6.jpg")}
              style={styles.image}
              resizeMode="contain"
            ></Image>
            {/* <Image source={require("./Img/Loading-dark-1s-200px.gif")}></Image> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "blue",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,

    // justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
});

export default HelpScreen;
