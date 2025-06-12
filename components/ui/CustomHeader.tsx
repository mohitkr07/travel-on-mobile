//write a CustomHeader component that takes a title and a subtitle as props and displays them in a header format
import BackArrow from "@/assets/svgs/BackArrow";
import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CustomHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);

  return (
    <View style={styles.headerContainer}>
      <BackArrow height={20} width={26} />
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
    //   backgroundColor: colors.primary,
      //   alignItems: 'center',
      justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 25,
        gap: 20
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
    //   fontSize: 16,
      color: colors.textLight1,
        marginTop: 4,
        marginLeft: 2
    },
  });

export default CustomHeader;
