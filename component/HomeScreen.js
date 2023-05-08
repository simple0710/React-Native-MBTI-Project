import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import main from "./styles/main-s";
import text from "./styles/text-s";
import button from "./styles/button-s";
import area from "./styles/area-s";

function HomeScreen({ navigation }) {
  const [testValue, setTestValue] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [mbtiResult, setMbtiResult] = useState("");
  const [uri, setUri] = useState("");

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
        setUri("");
        setFileTitle("");
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
        await axios
          .post("http://10.0.2.2:8080/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setMbtiResult(res.data);
            console.log("전달할 값", mbtiResult);
            navigation.navigate("Result", { data: mbtiResult, items: "ok" }); // 화면 이동
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
    // <View style={styles.container}>
    <>
      <SafeAreaView style={area.h10}>
        {/* Logo */}
        <View style={main.header}>
          <Text style={text.title}>Logo</Text>
        </View>
        {/* Main */}
        <View style={main.main}>
          {/* 파일 업로드 */}
          <TouchableOpacity
            onPress={pickFile}
            style={StyleSheet.compose(button.button, button.upload)}
          >
            <Text style={text.upload}>File Upload</Text>
          </TouchableOpacity>
          <Text>{fileTitle ? fileTitle : "입력해주세요"}</Text>

          {/* MBTI 검사 */}
          <TouchableOpacity
            onPress={getMbtiResult}
            style={StyleSheet.compose(button.button, button.check)}
          >
            <Text style={text.upload}>Check</Text>
          </TouchableOpacity>
          <Text>{mbtiResult}</Text>

          {/* 테스트 */}
          <TouchableOpacity
            title="Login"
            onPress={() => navigation.navigate("Result")}
          >
            <Text>화면 이동 테스트</Text>
          </TouchableOpacity>
        </View>
        <View style={main.footer}>
          <Text style={text.footer}>약관</Text>
          <Text style={text.footer}>Made by BootStrap</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  test: {
    // flex: 1,
    textAlign: "center",
    backgroundColor: "#CCCCCC",
  },
});
export default HomeScreen;
