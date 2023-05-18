// ResultScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Button, Text, DefaultTheme } from "react-native-paper";

import { BarChart } from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import axios from "axios";
// css
// import styles from "./styles/result_css";
import Loading from "./Loading";

function ResultScreen({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const [finalProgress, setFinalProgress] = useState(0);
  const [value, setValue] = useState(0);

  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  // const [progress, setProgress] = useState(0);
  const [footerFlag, setFooterFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState([]);
  const [mbtiData, setMbtiData] = useState("");
  const test = "red";
  const viewRef = useRef();
  const api = "http://10.0.2.2:8080";
  // "https://port-0-react-native-mbti-project-lme62alhih8uuf.sel4.cloudtype.app";
  // "http://kiuti.iptime.org:3000";
  const flagInsert = (dataLen) => {
    for (let i = 0; i < dataLen; i++) {
      const True = true;
      setViewFlag((state) => [...state, True]);
    }
  };
  const handleFooterFlag = () => {
    setFooterFlag((state) => !state);
  };
  // 토글 기능 수행
  const handleViewItem = (index) => {
    let flagCopy = [...viewFlag];
    flagCopy[index] = !flagCopy[index];
    setViewFlag(flagCopy);
  };

  const onCapture = async () => {
    try {
      const uri = await viewRef.current.capture();
      const shareOptions = {
        title: "test",
        message: "Some message",
        url: uri,
        type: "image/jpeg",
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error(error);
    }
  };
  const mbtiColor = [
    [
      ["INTJ", "논리술사"],
      ["INTP", "전략가"],
      ["ENTJ", "통솔자"],
      ["ENTP", "논리술사"],
      "#88619A",
      "분석가형",
    ],
    [
      ["ISTJ", "현실주의자"],
      ["ISFJ", "방어자"],
      ["ESTJ", "경영진"],
      ["ESFJ", "영사"],
      "#4298B4",
      "관리자형",
    ],
    [
      ["INFJ", "옹호자"],
      ["INFP", "중재자"],
      ["ENFJ", "선도자"],
      ["ENFP", "활동가"],
      "#33A474",
      "외교관형",
    ],
    [
      ["ISTP", "거장"],
      ["ISFP", "모험가"],
      ["ESTP", "기업가"],
      ["ESFP", "연예인"],
      "#E4AE3A",
      "탐험가형",
    ],
  ];
  const MBTIResultList = (items, index) => {
    let color = "black";
    let mbtiTextType1 = "";
    let mbtiTextType2 = "";
    for (let i = 0; i < mbtiColor.length; i++) {
      for (let j = 0; j < mbtiColor[i].length; j++) {
        if (mbtiColor[i][j][0] == items.labels[0]) {
          color = mbtiColor[i][4];
          mbtiTextType1 = mbtiColor[i][5];
          mbtiTextType2 = mbtiColor[i][j][1];
          break;
        }
      }
    }
    return (
      <>
        <View
          style={{
            alignSelf: "center",
            marginBottom: 20,
            width: Dimensions.get("window").width - 50,
          }}
        >
          <Button
            onPress={() => {
              handleViewItem(index);
            }}
            style={{ alignSelf: "flex-start" }}
          >
            {!viewFlag[index] ? (
              <Text key={index}>▼ "{items.name}"님의 결과</Text>
            ) : (
              <Text key={index}>▶ "{items.name}"님의 결과</Text>
            )}
          </Button>
          {!viewFlag[index] && (
            <>
              <View>
                <BarChart
                  data={items}
                  width={Dimensions.get("window").width - 50} // 그래프 사이 간격
                  height={220}
                  // style={styles.graph_container}
                  chartConfig={chartConfig}
                  fromZero={true} // 0부터 시작
                  showBarTops={false} // 더 잘 보이게 하는 바 삭제
                  showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
                  // withInnerLines={false} // 점선 삭제
                  // yLabelsOffset={"   "}
                  yAxisSuffix=" %"
                  // withHorizontalLabels={false} // y 라벨 숨기기
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text>
                  <Text style={{ color: color }}>{items.labels[0]} </Text>:{" "}
                  {mbtiTextType1} - {mbtiTextType2}
                </Text>
              </View>
            </>
          )}
        </View>
      </>
    );
  };

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
          alert("Re Upload");
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
  // BarChart 설정
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 0, // 소수점 자릿수
    // color: (opacity = 1) => `rgba(175, 0, 0, ${opacity})`, // 막대 색상
    color: (opacity = 1) => `rgba(0, 189, 19, ${opacity})`, // 막대 색상

    // color: (opacity = 1) => `rgba(25, 150, 110, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.6, // 막대 너비
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
    console.log("loading bar...");
    loadingInterval();
  }, [mbtiData]);

  useEffect(() => {
    setViewFlag([]);
    setMbtiData([
      {
        name: "김찬민",
        labels: ["INFP", "ISFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
        datasets: [
          {
            data: [70, 10, 5, 5, 5, 4, 1],
          },
        ],
      },
      {
        name: "김찬민 2",
        labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
        datasets: [
          {
            data: [60, 10, 5, 5, 5, 4, 1],
          },
        ],
      },
      {
        name: "김찬민 3",
        labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
        datasets: [
          {
            data: [50, 10, 5, 5, 5, 4, 1],
          },
        ],
      },
      {
        name: "김찬민 3",
        labels: ["ISFP", "INFP", "INTP", "ESFP", "ENTP", "ENTJ", "INTP"],
        datasets: [
          {
            data: [50, 10, 5, 5, 5, 4, 1],
          },
        ],
      },
    ]);
    if (route && route.params && route.params.data) {
      const formData = route.params.data;
      getMbtiResult(formData);
      // 프로그래스 바의 진행 상황을 업데이트하는 코드
    } else {
      console.log("Empty Data");
      // navigation.navigate("Home");
    }
  }, []);
  return (
    <>
      {finalProgress == 100 && mbtiData ? (
        <>
          <SafeAreaView
            sylte={{
              flex: 1,
            }}
          >
            <FlatList
              ListHeaderComponentStyle={{
                backgroundColor: "rgb(111, 225,187)",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black",
                marginBottom: 20,
              }}
              data={mbtiData}
              renderItem={({ item, index }) => MBTIResultList(item, index)}
              ListHeaderComponent={
                <>
                  <Text style={{ fontSize: 24, color: "white" }}>Result</Text>
                </>
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </SafeAreaView>
          {/* footer */}
          {/* {footerFlag ? (
            <>
              <View>
                <TouchableOpacity onPress={onCapture}>
                  <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                >
                  <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFooterFlag}>
                  <Text>Menu</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <SafeAreaView>
              <TouchableOpacity onPress={handleFooterFlag}>
                <Text>Menu</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )} */}
        </>
      ) : (
        <>
          <Loading
            progress={mbtiData ? finalProgress : progress}
            value={value}
          ></Loading>
        </>
      )}
    </>
  );
}

export default ResultScreen;
