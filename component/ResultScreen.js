// ResultScreen.js
import React, { useState, useEffect, useRef } from "react";
import { Text, TouchableOpacity, FlatList, View, Button } from "react-native";
import { BarChart } from "react-native-chart-kit";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
// css
import styles from "./styles/result_css";

function ResultScreen({ route, navigation }) {
  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  const [viewFlag, setViewFlag] = useState([]);
  const flagInsert = (dataLen) => {
    for (let i = 0; i < dataLen; i++) {
      const True = true;
      setViewFlag((state) => [...state, True]);
    }
  };
  const [mbtiData, setMbtiData] = useState("");
  // 토글 기능 수행
  const handleViewItem = (index) => {
    let flagCopy = [...viewFlag];
    flagCopy[index] = !flagCopy[index];
    setViewFlag(flagCopy);
  };
  const viewRef = useRef();

  const onCapture = async () => {
    try {
      const uri = await viewRef.current.capture();
      const shareOptions = {
        title: "Share via",
        message: "Some message",
        url: uri,
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
        {viewFlag[index] && (
          <View style={styles.container}>
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
          </View>
        )}
      </>
    );
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
      const paramsData = route.params.data;
      const listLength = paramsData.length;
      flagInsert(listLength);
      setMbtiData(paramsData);
    }
  }, []);
  return (
    <>
      {mbtiData ? (
        <>
          <View style={styles.container}>
            <FlatList
              ListHeaderComponentStyle={styles.container}
              data={mbtiData}
              renderItem={({ item, index }) => MBTIResultList(item, index)}
              ListHeaderComponent={
                <View style={styles.result_container}>
                  <Text style={styles.result_text}>Result</Text>
                </View>
              }
              ListFooterComponent={
                <View style={styles.sub_container}>
                  <TouchableOpacity style={styles.sub_button}>
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
              }
              // keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      ) : (
        <View>
          <ViewShot ref={viewRef}>
            {/* 내용 */}
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
            <Text>안녕</Text>
          </ViewShot>
          <Button title="공유" onPress={onCapture} />
        </View>
      )}
    </>
  );
}

export default ResultScreen;
