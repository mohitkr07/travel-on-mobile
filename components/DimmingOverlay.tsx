import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/hooks";

const DimmingOverlay = () => {
  const { bottomSheetIndex } = useAppSelector((state) => state.app);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: bottomSheetIndex >= 0 ? 0.5 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [bottomSheetIndex]);

  return (
    <Animated.View
      pointerEvents={bottomSheetIndex >= 0 ? "auto" : "none"}
      style={[StyleSheet.absoluteFill, { backgroundColor: "black", opacity: opacityAnim }]}
    />
  );
};

export default DimmingOverlay;