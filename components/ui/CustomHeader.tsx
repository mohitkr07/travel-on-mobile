import BackArrow from "@/assets/svgs/BackArrow";
import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  const router = useRouter()

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => router.back()}>
        <BackArrow height={20} width={26} />
      </Pressable>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    headerContainer: {
      justifyContent: "center",
        paddingBottom: 25,
        gap: 20
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.textLight0,
    },
    subtitle: {
      color: colors.textDisabled,
        marginTop: 4,
        marginLeft: 2
    },
  });

export default CustomHeader;
