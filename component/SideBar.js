// Sidebar.js
import React, { useRef, useState } from "react";
import {
  View,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { Text } from "react-native-paper";

const Sidebar = () => {
  const sidebarWidth = Dimensions.get("window").width / 2; // 사이드바의 너비
  const sidebarRef = useRef(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const [isOpen, setIsOpen] = useState(true); // 사이드바가 열려있는지 여부를 추적

  // 드래그시 애니메이션 효과
  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderMove: (event, gesture) => {
  //     if (gesture.dx > 0 && gesture.dx < sidebarWidth && isOpen) {
  //       pan.x.setValue(gesture.dx);
  //     }
  //   },
  //   onPanResponderRelease: (event, gesture) => {
  //     if (gesture.dx < sidebarWidth / 2) {
  //       Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
  //       setIsOpen(true);
  //     } else {
  //       Animated.spring(pan, { toValue: { x: sidebarWidth, y: 0 } }).start();
  //       setIsOpen(false);
  //     }
  //   },
  // });

  // 활성화
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
  });

  // 버튼 클릭시 애니메이션 효과
  const toggleSidebar = () => {
    console.log(isOpen);
    if (isOpen) {
      Animated.spring(pan, {
        toValue: { x: -sidebarWidth, y: 0 },
      }).start();
      setIsOpen(false);
    } else {
      Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      setIsOpen(true);
    }
  };

  const sidebarStyle = {
    transform: [{ translateX: pan.x }],
  };

  return (
    <>
      {/* icon */}
      <TouchableOpacity
        style={{
          zIndex: 1,
          position: "absolute",
          top: 5,
          right: 5,
        }}
        onPress={toggleSidebar}
      >
        <Image
          source={require("./Img/info.png")}
          resizeMode="contain"
          style={{ height: 20, width: 20 }}
          // onPress={sideFlagHandler}
        ></Image>
      </TouchableOpacity>
      {/* sideBar */}
      {!isOpen && (
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
            style={{ flex: 1 }}
            onPress={toggleSidebar}
          ></TouchableOpacity>
        </View>
      )}
      <Animated.View
        ref={sidebarRef}
        style={[
          {
            zIndex: 2,
            position: "absolute",
            // top: 0,
            right: -Dimensions.get("window").width / 2,
            width: Dimensions.get("window").width / 2,
            height: Dimensions.get("window").height * 2,
            backgroundColor: "white",
            alignItems: "center",
            alignContent: "center",
          },
          sidebarStyle,
        ]}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            zIndex: 2,
            flex: 0.04,
            backgroundColor: "grey",
            width: Dimensions.get("window").width / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>상세 정보</Text>
        </View>
        <View
          style={{
            flex: 0.9,
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 5, marginBottom: 5 }}>version : 0.0.1</Text>
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
      </Animated.View>
    </>
  );
};

export default Sidebar;
