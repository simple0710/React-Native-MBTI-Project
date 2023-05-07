import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
import text from "./styles/text-s";
import button from "./styles/button-s";

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
            navigation.navigate("Result", {data : res.data}); // 화면 이동
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
      <View style={styles.container}>
        {/* Logo */}
        <Text style={styles.title}>Logo</Text>
        {/* Main */}
        <View style={styles.maincontainer}>
          {/* 파일 업로드 */}
          <TouchableOpacity
            onPress={pickFile}
            style={StyleSheet.compose(styles.button, button.upload)}
          >
            <Text style={text.upload}>File Upload</Text>
          </TouchableOpacity>
          <Text>{fileTitle ? fileTitle : "입력해주세요"}</Text>

          {/* MBTI 검사 */}
          <TouchableOpacity
            onPress={getMbtiResult}
            style={StyleSheet.compose(styles.button, button.check)}
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
        <Text>Made by BootStrap</Text>
        {/* <Text>약관</Text>
        <Text>약관</Text>  */}
      </View>
    </>
  );
}

// css
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
  },
  maincontainer: {
    // margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    marginBottom: 250,
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 8,
    // 중앙 정렬
    alignItems: "center",
    flexDirection: "row",
  },
});


export default HomeScreen;
