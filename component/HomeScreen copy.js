// HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";
// css
import styles from "./styles/home_css";
// component

function HomeScreen({ navigation }) {
  const [fileTitle, setFileTitle] = useState("");
  const [mbtiResult, setMbtiResult] = useState("");
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState("");
  const api =
    // "https://port-0-react-native-mbti-project-lme62alhih8uuf.sel4.cloudtype.app";
    "http://10.0.2.2:8080";
  const pickFile = async () => {
    try {
      console.log("Picking file");
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
        // setUri("");
        // setFileTitle("");
      } else {
        // 에러 처리
        console.log(err);
      }
    }
  };
  /** MBTI 결과 받아오기
   ** 파일을 올려둔 경우
   * fileContent가 있는 경우
   *
   */
  const getMbtiResult = async () => {
    try {
      if (fileTitle) {
        setLoading(true);
        setFileTitle("");
        setUri("");
        const formData = new FormData();
        formData.append("file", {
          uri: uri,
          type: "text/plain",
          name: fileTitle,
        });
        console.log("보낼 데이터 ", formData);
        navigation.navigate("Result", { data: formData });
      } else {
        ToastAndroid.show("파일을 넣으세요 :)", ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log(err);
      ToastAndroid.show("err", ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    setFileTitle("");
    setUri("");
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo_text}>KIU:TI</Text>
        </View>
        {/* 파일 업로드 */}
        <TouchableOpacity
          onPress={pickFile}
          style={StyleSheet.compose(styles.button, styles.upload)}
        >
          <Text style={styles.upload_text}>File Upload</Text>
        </TouchableOpacity>
        <Text>{fileTitle ? fileTitle : "입력해주세요"}</Text>

        {/* MBTI 검사 */}
        <TouchableOpacity
          onPress={getMbtiResult}
          style={StyleSheet.compose(styles.button, styles.check)}
        >
          <Text style={styles.check_text}>Check</Text>
        </TouchableOpacity>
        <Text>{mbtiResult}</Text>

        {/* 테스트 */}
        {/* <TouchableOpacity
          title="Login"
          onPress={() => navigation.navigate("Result")}
        >
          <Text>화면 이동 테스트</Text>
        </TouchableOpacity> */}
        <View style={styles.test}>
          <Text style={styles.test}>Made by BootStrap</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>약관</Text>
          <Text style={styles.footer_text}>copyright</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;
