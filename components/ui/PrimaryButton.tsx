import { TPrimaryButton } from "@/types/components";
import { TColors } from "@/types/theme";
import { responsiveFontSize } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PrimaryButton = ({ label, onPress, disabled, width, style }: TPrimaryButton) => {
  const { colors } = useTheme();
  const typedColors = colors as TColors;
  const styles = getStyles(typedColors);

  return (
    <View style={[{ width: width || "100%"}, style]}>
      <TouchableOpacity
      style={[styles.button, disabled && { backgroundColor: "transparent" }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.buttonParent,
          disabled && { backgroundColor: typedColors.backgroundDisabled },
        ]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    button: {
      backgroundColor: "#1FA1CC",
      borderRadius: 16,
      height: 54,
      width: "100%",
      alignItems: "center",
    },
    buttonParent: {
      backgroundColor: colors.primary,
      width: "100%",
      height: "92%",
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: responsiveFontSize(2.2),
      letterSpacing: 1,
    },
  });
