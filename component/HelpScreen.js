import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

function HelpScreen() {
  // const theme = useTheme();

  return (
    // <View style={{ backgroundColor: theme.colors.accent }}>
    <>
      <View>
        <Text>PC</Text>
        <Text>1. 카카오톡 채팅방 진입</Text>
        <Text>2. 오른쪽 상단 3줄 클릭</Text>
        <Text>3. 대화 내용 → 대화 내보내기</Text>
        <Text>1. 카카오톡 채팅방 진입</Text>
        <Text></Text>
      </View>
      <View>
        <Text>Phone</Text>
        <Text>1. 카카오톡 아무 "채팅방" 선택</Text>
        <Text>2. 오른쪽 상단 "3줄" 클릭</Text>
        <Text>3. 오른쪽 하단 "톱니바퀴" 모양 선택</Text>
        <Text>4. "채팅방 관리"의 "대화 내용 내보내기" 선택</Text>
        <Text>5. "모든 메시지 내부저장소에 저장" 선택</Text>
        <Text>6. "모든 메시지 내부저장소에 저장" 선택</Text>
        <Text>7. "File Upload" 선택 후, 저장한 카카오톡 txt파일 선택</Text>
        <Text>8. "Check" 버튼 선택 후 결과 확인</Text>
      </View>
    </>
  );
}

export default HelpScreen;
