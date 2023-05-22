// First.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { Button, Text, DefaultTheme } from "react-native-paper";

import { BarChart } from "react-native-chart-kit";
import MatchGraph from "./graph/MatchGraph";
// css
// import styles from "./styles/result_css";

const First = ({ route }) => {
  const mbtiData = route.params.mbtiData;
  const [viewFlag, setViewFlag] = useState([]);

  // 토글 기능 수행
  const handleViewItem = useCallback((index) => {
    let flagCopy = [...viewFlag];
    flagCopy[index] = !flagCopy[index];
    setViewFlag(flagCopy);
  });

  /**
   * MBTI Color 지정
   */
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

  const MBTIResultList = useCallback((items, index) => {
    let color = "black";
    let mbtiTextType1 = "";
    let mbtiTextType2 = "";
    for (let i = 0; i < mbtiColor.length; i++) {
      for (let j = 0; j < mbtiColor[i].length; j++) {
        // 적절한 유형에 매치한다.
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
        <SafeAreaView
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
            {viewFlag[index] ? (
              <Text key={index}>▼ "{items.name}"님의 결과</Text>
            ) : (
              <Text key={index}>▶ "{items.name}"님의 결과</Text>
            )}
          </Button>
          {viewFlag[index] && (
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
              <View
                style={{
                  width: "90%",
                  // backgroundColor: "blue",
                  alignSelf: "center",
                  marginBottom: 5,
                }}
              >
                <Text>장점</Text>
                <Text>1. test</Text>
                <Text>2. test2</Text>
                <Text>3. test3</Text>
              </View>
              <MatchGraph
                mbtiData={mbtiData}
                myName={items.name}
                myMbti={items.labels[0]}
              ></MatchGraph>
            </>
          )}
        </SafeAreaView>
      </>
    );
  });

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

  useEffect(() => {
    setViewFlag([]);
  }, []);
  return (
    <>
      <>
        <SafeAreaView
          sylte={{
            flex: 1,
          }}
        >
          <FlatList
            data={mbtiData}
            renderItem={({ item, index }) => MBTIResultList(item, index)}
            ListHeaderComponent={
              <>
                {/* <Text style={{ fontSize: 24, color: "black" }}>Result</Text> */}
              </>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
        {/* footer */}
      </>
    </>
  );
};

export default First;
