import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import { BarChart, Chart } from "react-native-chart-kit";
import main from "./styles/main-s";
import text from "./styles/text-s";
import button from "./styles/button-s";
import area from "./styles/area-s";

function ResultScreen({ route }) {
  // MBTI 데이터이 길이를 구해 해당 값으로 값을 한다.
  const [viewFlag, setViewFlag] = useState([true, true, true]);

  // 토글 기능 수행
  const handleViewItem = (index) => {
    let flagCopy = [...viewFlag];
    flagCopy[index] = !flagCopy[index];
    setViewFlag(flagCopy);
    // setViewFlag[index](!viewFlag[index]);
  };

  // BarChart 설정
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    // backgroundGradient: "white",
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.5, // 막대 너비
    withHorizontalLabels: false,
  };

  // 받을 값 data
  const MBTIData = [
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
  ];
  // 리스트 Header, 새로운 컴포넌트를 생성해서 만들어도 됨
  const MBTIListHeder = () => {
    return (
      <>
        <View style={main.header}>
          <Text style={text.title}>Logo</Text>
          <Text style={StyleSheet.compose(text.upload, button.result)}>
            result
          </Text>
        </View>
      </>
    );
  };

  const MBTIListFooter = () => {
    return (
      <>
        <View>
          <Text>공유하기</Text>
        </View>
      </>
    );
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
            <Text style={text.toggle_word} key={index}>
              ▼ {items.name}님의 결과
            </Text>
          ) : (
            <Text style={text.toggle_word} key={index}>
              ▶ {items.name}님의 결과
            </Text>
          )}
        </TouchableOpacity>
        {viewFlag[index] && (
          <BarChart
            data={items}
            width={Dimensions.get("window").width}
            height={250}
            chartConfig={chartConfig}
            fromZero={true} // 0부터 시작
            showBarTops={false} // 더 잘 보이게 하는 바 삭제
            showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
            // withInnerLines= {false} // 점선 삭제
            // withHorizontalLabels={false} // y 라벨 숨기기
          />
        )}
      </>
    );
  };
  useEffect(() => {
    // setViewFlag([... viewFlag])
    console.log("받은 데이터", route);
  }, []);
  return (
    <>
      <SafeAreaView>
        <FlatList
          styles={area.h10}
          data={MBTIData}
          renderItem={({ item, index }) => MBTIResultList(item, index)}
          // keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={MBTIListHeder}
          ListFooterComponent={MBTIListFooter}
        />
      </SafeAreaView>
    </>
  );
}

export default ResultScreen;
