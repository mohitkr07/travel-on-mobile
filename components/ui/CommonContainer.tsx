import LeftAngle from "@/assets/svgs/LeftAngle";
import { TColors } from "@/types/theme";
import { responsiveHeight, responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the type for children prop
type CommonContainerProps = {
  children: React.ReactNode;
};

const CommonContainer = ({ children }: CommonContainerProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  const navigate= useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => console.log("hi")}
          >
            <LeftAngle width={16} height={16} />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.contentContainer} 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          // onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          //   // Handle scroll event if needed
          // }}
        >{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommonContainer;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    topSection: {
      height: responsiveHeight(9),
      alignItems: "flex-end",
      paddingHorizontal: 30,
      flexDirection: "row",
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      paddingRight: responsiveWidth(4.5),
      paddingVertical: responsiveHeight(0.3),
      gap: 6,
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: "semibold",
      color: colors.background,
    },
    contentContainer: {
      flex: 1,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      backgroundColor: colors.background,
      paddingHorizontal: 30,
      paddingTop: responsiveHeight(3),
    },
  });
