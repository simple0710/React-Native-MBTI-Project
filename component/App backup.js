import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import HomeScreen from "./HomeScreen";
import ResultScreen from "./ResultScreen";

export default function App() {
  const [testValue, setTestValue] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [mbtiResult, setMbtiResult] = useState("");
  const [uri, setUri] = useState("");

  const Stack = createNativeStackNavigator();
  /** 파일 선택
   ** 값이 제대로 들어온 경우(try)
   * 1. .txt파일인 경우 파일 제목값(fileTitle)을 바꾼 파일명으로 변경
   * 2. 파일의 내용을 가져온 뒤 fileContent로 저장
   ** 값이 제대로 들어오지 못한 경우(catch)
   * 1. 취소
   * 2. 의도치 않은 종료(err)
   */
  const pickFile = async () => {
    try {
      setFileTitle("");
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText], // .txt 파일 한정
      });
      const resFile = result[0];
      // 선택한 파일이 텍스트 파일인 경우에만 읽어오도록 설정
      if (resFile.type === "text/plain") {
        // 텍스트 파일 읽어오기
        // 해당 파일이 있는 곳의 uri를 가져온 뒤 파일을 읽고 content에 저장
        console.log("result : ", resFile);
        setUri(resFile.uri);
        setFileTitle(resFile.name);
        // const content = await readTextFile(result[0].uri);
      } else {
        alert("텍스트 파일(.txt)을 선택해주세요.");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 사용자가 파일 선택을 취소한 경우
        console.log("Canceled");
      } else {
        // 에러 처리
        console.log(err);
      }
    }
  };
  // // .txt 파일 가져오기
  // const readTextFile = async (uri) => {
  //   const fileTitle = await fetch(uri)
  //     .then((response) => response.text())
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   return fileTitle;
  // };
  // 연결 확인
  const test = () => {
    axios
      .get("http://10.0.2.2:8080/test")
      .then((res) => {
        setTestValue(res.data);
      })
      .catch((err) => console.log(err));
  };
  /** MBTI 결과 받아오기
   ** 파일을 올려둔 경우
   * fileContent가 있는 경우
   *
   */
  const getMbtiResult = async () => {
    try {
      if (fileTitle) {
        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          type: "text/plain",
          name: fileTitle,
        });
        console.log(formData);
        await axios
          .post("http://10.0.2.2:8080/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setMbtiResult(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="HOME">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    // <View>
    //   <Text style={styles.title}>Logo</Text>
    //   <Text>실험입니다.</Text>

    //   <Text>앱 화면 및 서버 연결 테스트</Text>
    //   <Button title="click" onPress={test} />
    //   <Text>{testValue}</Text>
    //   <Button title="Select" onPress={pickFile} />
    //   <Text>파일 제목 : {fileTitle}</Text>
    //   <Button title="검색" onPress={getMbtiResult} />
    //   <Text>{mbtiResult}</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
