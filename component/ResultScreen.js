// ResultScreen.js
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native-paper";
import { Dimensions, SafeAreaView, View } from "react-native";
import axios from "axios";
// component
import Loading from "./Loading";
import First from "./menu/screen/First";

const Tab = createMaterialTopTabNavigator();

function ResultScreen({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const [finalProgress, setFinalProgress] = useState(0);

  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  const [viewFlag, setViewFlag] = useState([]);
  const [mbtiData, setMbtiData] = useState("");

  // const api = "http://10.0.2.2:3000";
  const api = "http://kiuti.iptime.org:3000";

  const getMbtiResult = async (formData) => {
    await axios
      .post(`${api}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data == "fail") {
          navigation.navigate("Home");
          alert("Upload Fail");
        }
        setMbtiData(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("요청 취소");
        }
        console.log(err);
      });
  };

  const loadingInterval = () => {
    const intervalSpeed = mbtiData
      ? Math.floor(Math.random() * (400 - 300 + 1)) + 300
      : Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
    if (mbtiData) {
      setFinalProgress(progress);
      const interval = setInterval(() => {
        setFinalProgress((prevFinalProgress) => {
          const newProgress =
            prevFinalProgress + Math.floor(Math.random() * 9) + 1;
          if (newProgress > 99) {
            if (prevFinalProgress == 99) {
              clearInterval(interval);
              return 100;
            }
            return 99;
          } else {
            return newProgress;
          }
        });
      }, intervalSpeed);
    }
    try {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + Math.floor(Math.random() * 9) + 1;
          if (newProgress > 99) {
            if (mbtiData) {
              if (prevProgress >= 99) {
                clearInterval(interval);
                return 100;
              }
            } else {
              clearInterval(interval);
            }
            return 99;
          }
          return newProgress;
        });
      }, intervalSpeed);
    } catch {
      alert("Err");
      navigation.navigate("Home");
    }
  };
  useEffect(() => {
    // console.log("loading bar...");
    loadingInterval();
  }, [mbtiData]);

  useEffect(() => {
    setViewFlag([]);
    // setProgress(100);
    // setMbtiData([
    //   {
    //     name: "김찬민",
    //     labels: ["INFP", "ISFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
    //     datasets: [
    //       {
    //         data: [70, 10, 5, 5, 5, 4, 1],
    //       },
    //     ],
    //   },
    //   {
    //     name: "김찬민 2",
    //     labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
    //     datasets: [
    //       {
    //         data: [60, 10, 5, 5, 5, 4, 1],
    //       },
    //     ],
    //   },
    //   {
    //     name: "김찬민 3",
    //     labels: ["ESFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
    //     datasets: [
    //       {
    //         data: [50, 10, 5, 5, 5, 4, 1],
    //       },
    //     ],
    //   },
    //   {
    //     name: "김찬민 4",
    //     labels: ["ISTP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
    //     datasets: [
    //       {
    //         data: [50, 10, 5, 5, 5, 4, 1],
    //       },
    //     ],
    //   },
    // ]);
    if (route && route.params && route.params.data) {
      const formData = route.params.data;
      getMbtiResult(formData);
      // 프로그래스 바의 진행 상황을 업데이트하는 코드
    } else {
      // console.log("Empty Data");
      alert("Empty Data");
      navigation.navigate("Home");
    }
  }, []);
  return (
    <>
      {finalProgress == 100 && mbtiData ? (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <First mbtiData={mbtiData}></First>
            {/* <Tab.Navigator
              initialRouteName="First"
              screenOptions={{
                tabBarLabelStyle: {
                  fontSize: 12,
                },
                tabBarItemStyle: { width: Dimensions.get("window").width / 3 },
                tabBarStyle: {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab.Screen
                name="First"
                component={First}
                initialParams={{ mbtiData }}
              />
              <Tab.Screen
                name="Second"
                component={Second}
                initialParams={{ mbtiData }}
              />
            </Tab.Navigator> */}
          </SafeAreaView>
        </>
      ) : (
        <>
          <Loading progress={mbtiData ? finalProgress : progress}></Loading>
        </>
      )}
    </>
  );
}

export default ResultScreen;
