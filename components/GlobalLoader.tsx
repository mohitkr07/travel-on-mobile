import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, StyleSheet } from "react-native";
import { useAppSelector } from "@/hooks/hooks";
import { API_STATUS } from "@/constants/constants";

const GlobalLoader = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { globalLoaderOn } = useAppSelector((state) => state.app);
  const { profileLoading, onboardLoading } = useAppSelector(
    (state) => state.profile
  );

  const isLoading =
    profileLoading === API_STATUS.LOADING ||
    globalLoaderOn ||
    onboardLoading === API_STATUS.LOADING;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: isLoading ? 0.5 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isLoading, opacityAnim]);

  return (
    isLoading && (
      <Animated.View
        pointerEvents={"auto"}
        style={[
          StyleSheet.absoluteFill,
          {
            position: "absolute",
            zIndex: 2000,
            backgroundColor: "black",
            opacity: opacityAnim,
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -20 }, { translateY: -20 }],
          }}
        />
      </Animated.View>
    )
  );
};

export default GlobalLoader;
