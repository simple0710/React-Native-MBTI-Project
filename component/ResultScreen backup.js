// ResultScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import axios from "axios";
// css
import styles from "./styles/result_css";
import Loading from "./Loading";

function ResultScreen({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState(0);

  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  // const [progress, setProgress] = useState(0);
  const [footerFlag, setFooterFlag] = useState(false);
  const [colorFlag, setColorFlag] = useState(0);
  const [viewFlag, setViewFlag] = useState([]);
  const [mbtiData, setMbtiData] = useState("");
  const test = "red";
  const viewRef = useRef();
  const api =
    //  "http://10.0.2.2:8080";
    // "https://port-0-react-native-mbti-project-lme62alhih8uuf.sel4.cloudtype.app";
    "http://kiuti.iptime.org:3000";
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

  const MBTIResultList = (items, index) => {
    ["infp"];
    if (items.labels == "infp") console.log(items);
    return (
      <>
        <View>
          <TouchableOpacity
            onPress={() => {
              handleViewItem(index);
            }}
          >
            {viewFlag[index] ? (
              <Text key={index}>▼ "{items.name}"님의 결과</Text>
            ) : (
              <Text key={index}>▶ "{items.name}"님의 결과</Text>
            )}
          </TouchableOpacity>
          {viewFlag[index] && (
            // <View style={styles.container}>
            // <View style={styles.graph_container}>
            <>
              <BarChart
                data={items}
                width={Dimensions.get("window").width - 50} // 그래프 사이 간격
                height={220}
                style={styles.graph_container}
                chartConfig={chartConfig}
                fromZero={true} // 0부터 시작
                showBarTops={false} // 더 잘 보이게 하는 바 삭제
                showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
                // withInnerLines={false} // 점선 삭제
                // yLabelsOffset={"   "}
                yAxisSuffix=" %"
                // withHorizontalLabels={false} // y 라벨 숨기기
              />
              <Text style={{ alignSelf: "center" }}>
                <Text style={{ color: test }}>ISTJ</Text> : 관리자형 -
                현실주의자
              </Text>
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
        // console.log(res.data);
        // console.log(typeof res.data);
        // console.log(res.data);
        // console.log(res.data);
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
    backgroundGradientTo: "#ffffff",
    // backgroundGradient: "white",
    decimalPlaces: 0, // 소수점 자릿수
    // color: (opacity = 1) => `rgba(175, 0, 0, ${opacity})`, // 막대 색상
    color: (opacity = 1) => `rgba(0, 189, 19, ${opacity})`, // 막대 색상

    // color: (opacity = 1) => `rgba(25, 150, 110, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.6, // 막대 너비
  };
  const intervalTest = () => {
    if (progress < 100) {
      try {
        const interval = setInterval(
          () => {
            setProgress((prevProgress) => {
              const newProgress =
                prevProgress + Math.floor(Math.random() * 9) + 1;
              if (prevProgress <= 99) {
                if (mbtiData && prevProgress == 99) {
                  console.log("끝 :");
                  console.log(mbtiData);
                  console.log("화면 출력");
                  clearInterval(interval);
                  return 100;
                } else {
                  console.log(newProgress);
                  if (prevProgress >= 99) {
                    if (!mbtiData) {
                      clearInterval(interval);
                      retu;
                    }
                    return 99;
                  } else {
                    return newProgress;
                  }
                }
              } else {
                clearInterval(interval);
              }
            });
          },
          mbtiData
            ? Math.floor(Math.random() * (1500 - 500 + 1)) + 500
            : Math.floor(Math.random() * (3000 - 2500 + 1)) + 2500
        );
      } catch {
        alert("Err");
        navigation.navigate("Home");
      }
    }
    console.log(1);
  };
  // useEffect(() => {
  //   console.log("loading bar...");
  //   intervalTest();
  // }, [mbtiData]);

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
      // getMbtiResult(formData);
      // 프로그래스 바의 진행 상황을 업데이트하는 코드

      // getMbtiResult(paramsData);
      // console.log(paramsData);
      // const listLength = formData.length;
      // console.log("파일 내용 출력", formData._parts);
    } else {
      console.log("Not Data");
      // navigation.navigate("Home");
    }
  }, []);
  return (
    <>
      {mbtiData ? (
        <>
          <ViewShot
            style={styles.container}
            ref={viewRef}
            options={{ format: "png", quality: 0.9 }}
          >
            <FlatList
              // contentContainerStyle={{ padding: 20 }}
              ListHeaderComponentStyle={{
                backgroundColor: "rgb(111, 225,187)",
              }}
              data={mbtiData}
              renderItem={({ item, index }) => MBTIResultList(item, index)}
              ListHeaderComponent={
                <>
                  <SafeAreaView style={styles.result_container}>
                    <Text style={styles.result_text}>Result</Text>
                  </SafeAreaView>
                </>
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </ViewShot>
          {/* footer */}
          {footerFlag ? (
            <>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.footer_button}
                  onPress={onCapture}
                >
                  <Text style={styles.footer_text}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footer_button}
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={styles.footer_text}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footer_button}
                  onPress={handleFooterFlag}
                >
                  <Text style={styles.footer_text}>Menu</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <SafeAreaView style={styles.footer_menu}>
              <TouchableOpacity
                onPress={handleFooterFlag}
                style={styles.footer_button}
              >
                <Text style={styles.footer_text}>Menu</Text>
              </TouchableOpacity>
            </SafeAreaView>
          )}
        </>
      ) : (
        <>
          <View style={styles.loading_container}>
            <Loading progress={progress} value={value}></Loading>
          </View>
        </>
      )}
    </>
  );
}

export default ResultScreen;
