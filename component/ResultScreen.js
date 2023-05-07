import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { BarChart, Chart} from "react-native-chart-kit";
import main from "./styles/main-s";

function ResultScreen() {
  const [viewFlag, setViewFlag] = useState([0]);

  const handleViewItem = (flag) => {
    return !flag;
  }
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


  const MBTIData =[{
    name: "김찬민",
    flag: true,
    labels: ['INFP', 'ISFP', 'INTP', 'ESFP', 'ENTP', 'ENTJ', 'INTP'],
    datasets: [
      {
        data: [70, 10, 5, 5, 5, 4, 1],
      },
    ],
  },
  {
    name: "김찬민 2",
    flag: true,
    labels: ['ISFP', 'INFP', 'INTP', 'ESFP', 'ENTP', 'ENTJ', 'INTP'],
    datasets: [
      {
        data: [60, 10, 5, 5, 5, 4, 1],
      },
    ],
  }];
  const test = 1;
  const MBTIResultList = MBTIData.map((items, index) => {
    return (
    <>
      <View style={main.container}>
        <TouchableOpacity onPress={() => {
          console.log(items.flag);
          items.flag = handleViewItem(items.flag)
        }}>
          <Text key={index}>▶{items.name}님의 결과</Text>
        </TouchableOpacity>
        {items.flag &&
        <BarChart
          data={items}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={chartConfig}
          fromZero={true} // 0부터 시작
          showBarTops={false} // 더 잘 보이게 하는 바 삭제
          // withInnerLines= {false} // 점선 삭제
          // withHorizontalLabels={false} // y 라벨 숨기기
          showValuesOnTopOfBars={true} // 그래프 상단 퍼센트 표시
          />}
      </View>
    </>
    )
  })

  useEffect(() => {
    // setViewFlag([... viewFlag])
  }, [MBTIData])
  return (
    <>
    <Text>Logo</Text>
    <Text>result</Text>
      <View>
        {MBTIResultList}
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
