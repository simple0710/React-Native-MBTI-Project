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
        {/* SideBarHeader */}
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
        {/* SideBarBody */}
        <View
          style={{
            flex: 0.9,
            alignItems: "center",
          }}
        >
          {/* 버전 정보 */}
          <Text style={{ marginTop: 5, marginBottom: 5 }}>version : 0.0.2</Text>
          {/* 개인정보처리방침 */}
          <TouchableOpacity
            style={{ marginBottom: 5 }}
            onPress={() => {
              Linking.openURL("https://sites.google.com/view/kiuti");
            }}
          >
            <Text
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 0.6,
                borderStyle: "solid",
              }}
            >
              개인정보처리방침
            </Text>
          </TouchableOpacity>
          {/* 개발자 정보 notion 멤버 링크*/}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://instinctive-seeker-860.notion.site/5b59899c4adf4b2889d0b2c882cf1e23"

                // "https://scholar.google.com/citations?user=5nEEICYAAAAJ&hl=ko&oi=ao"
              );
            }}
          >
            <Text
              style={{
                borderBottomColor: "black",
                borderStyle: "solid",
                borderBottomWidth: 0.6,
              }}
            >
              개발자 정보
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;
