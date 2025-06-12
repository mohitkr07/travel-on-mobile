import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";

interface RadioButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 18,
    },
    radioCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: colors.textDisabled,
      marginRight: 8,
    },
    genderText: {
      fontSize: 14,
      color: "#222",
    },
  });

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  isActive,
  onPress,
}) => {
  const { colors } = useTheme();

  const styles = getStyles(colors as TColors);

  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View
        style={[
          styles.radioCircle,
          isActive && {
            borderColor: colors.primary,
            backgroundColor: colors.primary,
          },
        ]}
      />
      <Text style={styles.genderText}>{label}</Text>
    </TouchableOpacity>
  );
};
