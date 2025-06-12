import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";

interface FormFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    label: {
      fontSize: 14,
      color: colors.textDisabled,
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 16,
      marginTop: 6,
      marginBottom: 12,
      paddingHorizontal: 12,
      height: 54,
      borderColor: colors.border,
      borderWidth: 1,
    },
  });

export const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  const { colors } = useTheme();

  const styles = getStyles(colors as TColors);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
