import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TPrimaryButton } from "@/types/components";
import { responsiveFontSize } from "@/utils/responsive";
import { TColors } from "@/types/theme";

const PrimaryButton = ({ label, onPress, disabled, width }: TPrimaryButton) => {
  const { colors } = useTheme();
  const typedColors = colors as TColors;
  const styles = getStyles(typedColors);

  return (
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
  );
};

export default PrimaryButton;

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    button: {
      backgroundColor: "#166EBA",
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
