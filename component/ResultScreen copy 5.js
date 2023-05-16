// ResultScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
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

  const [viewFlag, setViewFlag] = useState([]);
  const [mbtiData, setMbtiData] = useState("");
  const viewRef = useRef();
  const api =
    // "https://port-0-react-native-mbti-project-lme62alhih8uuf.sel4.cloudtype.app";
    "http://10.0.2.2:8080";
  const handleButtonPress = () => {
    // 서버에서 값을 받아온다고 가정하고, 값을 받은 후 setProgress를 통해 상태를 업데이트합니다.
    // 받은 값을 기반으로 화면에 출력할 수 있습니다.
    // 이 부분은 실제 서버 요청 및 처리 로직에 따라 구현해야 합니다.
    const receivedValue = 50; // 받은 값
    setProgress(receivedValue);
  };
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
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            handleViewItem(index);
          }}
        >
          {!viewFlag[index] ? (
            <Text style={styles.toggle_text} key={index}>
              ▼ {items.name}님의 결과
            </Text>
          ) : (
            <Text style={styles.toggle_text} key={index}>
              ▶ {items.name}님의 결과
            </Text>
          )}
        </TouchableOpacity>
        {!viewFlag[index] && (
          <View style={styles.container}>
            <View style={styles.graph_container}>
              <BarChart
                data={items}
                width={Dimensions.get("window").width - 50} // 그래프 사이 간격
                height={220}
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
          </View>
        )}
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
          alert("re upload");
        }
        // console.log(res.data);
        // console.log(typeof res.data);
        // console.log(res.data);
        setMbtiData(res.data);
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
    color: (opacity = 1) => `rgba(175, 0, 0, ${opacity})`, // 막대 색상

    // color: (opacity = 1) => `rgba(25, 150, 110, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.6, // 막대 너비
  };

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
      // getMbtiResult(paramsData);
      // console.log(paramsData);
      // const listLength = formData.length;
      // console.log("파일 내용 출력", formData._parts);
      // getMbtiResult(formData);
    } else {
      console.log("Not Data");
    }
  }, []);
  return (
    <>
      {mbtiData ? (
        <>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ViewShot
                style={styles.container}
                ref={viewRef}
                options={{ format: "png", quality: 0.9 }}
              >
                <FlatList
                  contentContainerStyle={{ padding: 20 }}
                  data={mbtiData}
                  renderItem={({ item, index }) => MBTIResultList(item, index)}
                  ListHeaderComponent={
                    <>
                      <View style={styles.result_container}>
                        <Text style={styles.result_text}>Result</Text>
                      </View>
                    </>
                  }
                  keyExtractor={(item, index) => index.toString()}
                />
              </ViewShot>
            </View>
          </View>
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
                  <Text style={styles.footer_text}>뒤로가기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footer_button}
                  onPress={handleFooterFlag}
                >
                  <Text style={styles.footer_text}>button</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.footer_menu}>
              <TouchableOpacity
                onPress={handleFooterFlag}
                style={styles.footer_button}
              >
                <Text style={styles.footer_text}>Menu</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>
          <View style={styles.loading_container}>
            <Loading progress={progress} value={value}></Loading>
            <Text>Loading...</Text>
            {/* <Text>Progress: {progress}%</Text> */}
          </View>
        </>
      )}
    </>
  );
}

export default ResultScreen;
