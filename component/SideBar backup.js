import React, { useRef, useState } from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from "react-native";

const Sidebar = () => {
  const sidebarWidth = Dimensions.get("window").width; // 사이드바의 너비
  const sidebarRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const [sideFlag, setSideFlag] = useState(false); // 사이드바가 열려있는지 여부를 추적
  const sideFlagHandler = () => {
    setSideFlag((state) => !state);
  };
  // const panResponder = PanResponder.create({
  //   // 터치가 시작될 때 호출되는 콜백 함수, true인 경우 PanResponder가 활성화
  //   onStartShouldSetPanResponder: () => true,
  //   // 터치 이동 중에 호출되는 콜백 함수
  //   // event : 이벤트 정보
  //   // gesure : 제스처 정보
  //   onPanResponderMove: (event, gesture) => {
  //     // 가로 이동 확인 후 이동한 거리에 따라 애니메이션 적용
  //     if (gesture.dx > 0 && gesture.dx < sidebarWidth && sideFlag) {
  //       pan.x.setValue(gesture.dx);
  //     }
  //   },
  //   onPanResponderRelease: (event, gesture) => {
  //     if (gesture.dx < sidebarWidth / 2) {
  //       Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
  //       setSideFlag(false);
  //     } else {
  //       Animated.spring(pan, { toValue: { x: sidebarWidth, y: 0 } }).start();
  //       setSideFlag(true);
  //     }
  //   },
  // });
  // const configHandler = () => {
  //   setSideFlag((state) => !state);
  // };
  // const toggleSidebar = () => {
  //   if (sideFlag) {
  //     Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
  //     setSideFlag(false);
  //   } else {
  //     Animated.spring(pan, { toValue: { x: sidebarWidth, y: 0 } }).start();
  //     setSideFlag(true);
  //   }
  // };

  const sidebarStyle = {
    transform: [{ translateX: pan.x }],
  };

  return (
    <>
      {/* Info */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
        onPress={sideFlagHandler}
      >
        <Image
          source={require("./Img/info.png")}
          resizeMode="contain"
          style={{ height: 20, width: 20 }}
          onPress={sideFlagHandler}
        ></Image>
      </TouchableOpacity>
      {/* first */}
      {sideFlag && (
        // <View><Text>g</Text></View>
        <View
          style={{
            zIndex: 1,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <TouchableOpacity
            onPress={sideFlagHandler}
            style={{ flex: 1 }}
          ></TouchableOpacity>

          <View
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              right: 0,
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width / 2,
              backgroundColor: "white",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                zIndex: 2,
                flex: 0.05,
                backgroundColor: "grey",
                width: Dimensions.get("window").width / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>상세 정보</Text>
            </View>
            <View
              style={{
                flex: 0.9,
                alignItems: "center",
                // width: Dimensions.get("window").width / 2
              }}
            >
              <Text style={{ marginTop: 5, marginBottom: 5 }}>
                version : 0.0.1
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://sites.google.com/view/kiuti");
                }}
              >
                <Text
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                  }}
                >
                  개인정보처리방침
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Sidebar;
