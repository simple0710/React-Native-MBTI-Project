// HomeScreen.js
import React, { useRef, useState, useEffect } from "react";
import { Animated, StyleSheet, View, ToastAndroid, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import DocumentPicker from "react-native-document-picker";
// css
// import styles from "./styles/home_css";
// component

function HomeScreen({ navigation }) {
  const [fileTitle, setFileTitle] = useState("");
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState("");
  const [sideFlag, setSideFlag] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  const animatedStyle = {
    opacity : animatedValue,
    transform: [
        {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      }
    ]
  }
  // const theme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: "blue",
  //   },
  // };

  const api =
    // "https://port-0-react-native-mbti-projsect-lme62alhih8uuf.sel4.cloudtype.app";
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
  const confingHandler = () => {
    setSideFlag((state) => !state)
  }

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
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", alignContent: "center" }}
      >
        {/* Title */}
        <View
          style={{
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            width: Dimensions.get("window").width,
            flex: 0.4,
          }}
        >
          <Text style={{ fontSize: 40, color: "white" }}>KIU:TI</Text>
          <Text 
          style={{position: "absolute", top:0, right:0,backgroundColor: "white"}} 
          onPress={() => {
            setSideFlag((state) => !state)
            console.log(sideFlag)
            startAnimation();
          }}
          >설정</Text>
        </View >
        {/* Body */}
        
        {sideFlag && 
        // <View><Text>g</Text></View>
        <View style={{zIndex:1, position:"absolute", backgroundColor: "rgba(0, 0, 0, 0.25)", width: Dimensions.get("window").width, height: Dimensions.get("window").height}} 
        >
        <TouchableOpacity 
        onPress={confingHandler}
        activeOpacity={2}
        style={{flex: 1}}>

        </TouchableOpacity>
        
        <View
        activeOpacity={2}
        style={{
          flex: 1,
          position: "absolute", 
          top: 0, 
          right: 0, 
          height: Dimensions.get("window").height, 
          width:Dimensions.get("window").width / 2 ,backgroundColor: "white"
        , alignItems:"center"
        , alignContent:"center"
        }}>
          <View style={{zIndex: 2, flex: 0.05, backgroundColor: "blue", width:Dimensions.get("window").width / 2
          , justifyContent: "center"
          , alignItems: "center"
        }}>
            <Text
            onPress={confingHandler}
            >상세 정보</Text>
          </View>
          <View style={{flex: 0.9, 
          // width: Dimensions.get("window").width / 2
          }}>
            <Text>버전</Text>
            <Text>버전</Text>
            <Text>버전</Text>
          </View>
        </View>
        </View>

      }

        <View
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 파일 업로드 */}
          <Button
            onPress={pickFile}
            style={{
              backgroundColor: "white",
              width: Dimensions.get("window").width - 200,
            }}
          >
            <Text>File Upload</Text>
          </Button>
          <Text style={{ marginBottom: 20 }}>
            {fileTitle ? fileTitle : "카카오톡 .txt 파일을 업로드 해주세요"}
          </Text>

          {/* MBTI 검사 */}
          <Button
            onPress={getMbtiResult}
            style={{
              backgroundColor: "white",
              width: Dimensions.get("window").width - 250,
              marginBottom: 40,
            }}
          >
            <Text>Check</Text>
          </Button>

          {/* 테스트 */}
          <Button title="Login" onPress={() => navigation.navigate("Result")}>
            <Text>화면 이동 테스트</Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("Help")}
            style={{ backgroundColor: "white" }}
          >
            <Text>도움말</Text>
          </Button>
          <View>{/* <Text>Made by BootStrap</Text> */}</View>
        </View>

        {/* Footer */}
        <View style={{ position: "absolute", bottom: 0, alignItems: "center" }}>
          <Text>약관</Text>
          <Text>ⓒ 2023. BootStrap all rights reserved</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default HomeScreen;
