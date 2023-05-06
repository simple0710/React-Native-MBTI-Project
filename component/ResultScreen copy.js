import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
function ResultScreen() {
  const data = {
    labels: ['INFP', 'ISFP', 'INTP', 'ESFP', 'ENTP', 'ENTJ'],
    datasets: [
      {
        data: [70, 10, 5, 5, 5, 1],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // 소수점 자릿수
    color: (opacity = 1) => `rgba(26, 147, 111, ${opacity})`, // 막대 색상
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 텍스트 색상
    strokeWidth: 2, // 막대 두께
    barPercentage: 0.5, // 막대 너비
  };
  return (
    <View>
      <BarChart style={styles.container}
        data={data}
        width={Dimensions.get('window').width - 100}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 8,
  },
});
export default ResultScreen;
