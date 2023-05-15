// ResultScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import axios from "axios";
// css
// import styles from "./styles/result_css";
import Loading from "./Loading";

function ResultScreen({ route, navigation }) {
  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  const [loading, setLoading] = useState(true);
  const [viewFlag, setViewFlag] = useState([]);
  const [mbtiData, setMbtiData] = useState("");
  const viewRef = useRef();
  const api =
    // "https://port-0-react-native-mbti-project-lme62alhih8uuf.sel4.cloudtype.app";
    "http://10.0.2.2:8080";

  const flagInsert = (dataLen) => {
    for (let i = 0; i < dataLen; i++) {
      const True = true;
      setViewFlag((state) => [...state, True]);
    }
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
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() => {
              handleViewItem(index);
            }}
          >
            {viewFlag[index] ? (
              <Text style={styles.toggle_word} key={index}>
                ▼ {items.name}님의 결과
              </Text>
            ) : (
              <Text style={styles.toggle_word} key={index}>
                ▶ {items.name}님의 결과
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {viewFlag[index] && (
          // <View style={styles.container}>
          <View style={styles.graph_container}>
            <BarChart
              data={items}
              width={400} // 그래프 사이 간격
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
          // </View>
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
        // setLoading(false);
        if (res.data == "fail") {
          navigation.navigate("Home");
          alert("re upload");
        }

        console.log(res.data);
        console.log(typeof res.data);

        console.log(res.data);
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
    color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.5, // 막대 너비
  };

  useEffect(() => {
    setViewFlag([]);

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
    ]);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.content}>
          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <View style={styles.profile} />
              <Text style={styles.name}>윾또막</Text>
            </View>
            <View style={styles.userComment}>
              <Text>대화명을 입력하세요</Text>
            </View>
          </View>

          <View style={styles.elem}>
            <View style={styles.userInfo}>
              <View style={styles.profile} />
              <Text style={styles.name}>저커버그</Text>
            </View>
            <View style={styles.userComment}>
              <Text>정말 맥주라도 한 잔 사는게 어떻겠니?</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer} />
      </View>
      {/* {mbtiData ? (
        <>
          <ViewShot
            style={styles.test}
            ref={viewRef}
            options={{ format: "png", quality: 0.9 }}
          >
            <FlatList
              // styles={styles.test}
              ListHeaderComponentStyle={styles.header}
              // ListFooterComponentStyle={{ flex: 1 }}
              data={mbtiData}
              renderItem={({ item, index }) => MBTIResultList(item, index)}
              ListHeaderComponent={
                <>
                  <View style={styles.result_container}>
                    <Text style={styles.result_text}>Result</Text>
                  </View>
                </>
              }
              ListFooterComponent={
                <>
                  <View style={styles.sub_container}>
                    <TouchableOpacity
                      style={styles.sub_button}
                      onPress={onCapture}
                    >
                      <Text style={styles.sub_text}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.sub_button}
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <Text style={styles.sub_text}>뒤로가기</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
              // keyExtractor={(item, index) => index.toString()}
            />
          </ViewShot>
        </>
      ) : (
        <>
          <View style={styles.loading_container}>
            <Loading></Loading>
          </View>
        </>
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "green",
  },
  footer: {
    height: 60,
    backgroundColor: "red",
  },
  content: {
    flex: 1,
  },

  elem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#eee",
    borderBottomWidth: 0.5,
    padding: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userComment: {
    padding: 8,
    backgroundColor: "yellow",
    borderRadius: 5,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "yellow",
  },
  name: {
    paddingLeft: 10,
  },
});

export default ResultScreen;
