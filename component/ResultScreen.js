import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { BarChart, Chart} from "react-native-chart-kit";
import main from "./styles/main-s";

function ResultScreen() {
  const data = {
    labels: ['INFP', 'ISFP', 'INTP', 'ESFP', 'ENTP', 'ENTJ', 'INTP'],
    datasets: [
      {
        data: [70, 10, 5, 5, 5, 4, 1],
      },
    ],
    decimalPlaces: 0,
    
  };
  

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    // backgroundGradient: "white",
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.5, // 막대 너비
    withHorizontalLabels: false,
  };
  return (
    <>
    <Text>Logo</Text>
    <Text>result</Text>
    <View style={main.container}>
      <Text>▶Toggle</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width}
        height={250}
        chartConfig={chartConfig}
        fromZero={true} // 0부터 시작
        showBarTops={false} // 더 잘 보이게 하는 바 삭제
        // withInnerLines= {false} // 점선 삭제
        // withHorizontalLabels={false} // y 라벨 숨기기
        showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
        />
    </View>
    <View>
      <Text>▶Toggle</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width}
        height={250}
        chartConfig={chartConfig}
        fromZero={true} // 0부터 시작
        showBarTops={false} // 더 잘 보이게 하는 바 삭제
        // withInnerLines= {false} // 점선 삭제
        // withHorizontalLabels={false} // y 라벨 숨기기
        showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
        />
    </View>
    
    
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: "center",
  },
});
export default ResultScreen;
