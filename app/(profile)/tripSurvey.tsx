import BigCheck from "@/assets/svgs/bigCheck";
import Companion from "@/assets/svgs/Companion";
import TrollyBag from "@/assets/svgs/TrollyBag";
import VibeWith from "@/assets/svgs/VibeWith";
import CustomHeader from "@/components/ui/CustomHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppDispatch } from "@/hooks/hooks";
import { setBottomSheetContentType, setBottomSheetIndex } from "@/redux/slices/appSlice";
import { TColors } from "@/types/theme";
import { responsiveHeight, responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tripTypes = [
  {
    key: "tripType",
    label: "Trip Type",
    icon: <TrollyBag />, // Replace with your icon/image path
  },
  {
    key: "companion",
    label: "Companion",
    icon: <Companion />,
  },
  {
    key: "vibe",
    label: "Vibe",
    icon: <VibeWith />,
  },
  {
    key: "vibe2",
    label: "Vibe",
    icon: <VibeWith />,
  },
];

const TripSurvey: React.FC = () => {
  const [selected, setSelected] = useState("companion");
  const { colors } = useTheme() as unknown as { colors: TColors };
  const styles = getStyles(colors as TColors);
  const dispatch = useAppDispatch();

  const handleCardPress = (key: string) => {
    setSelected(key);
    dispatch(setBottomSheetContentType('tripSurvey'));
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Trips you vibe with?" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.innerContainer}>
            {/* write the code here for the trip type cards */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 16,
                flexWrap: 'wrap',
                flex: 1
              }}
            >
              {tripTypes.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => handleCardPress(item.key)}
                  style={[
                    {
                      width: responsiveWidth(35),
                      height: responsiveHeight(14),
                      backgroundColor: colors.card,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: selected === item.key ? 2 : 0,
                      borderColor:
                        selected === item.key ? colors.primary : "transparent",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 0.5,
                      gap: 5,
                      aspectRatio: 1/1
                    },
                  ]}
                >
                  {item.icon}
                  <Text
                    style={{
                      color: colors.textLight0,
                      fontWeight: "500",
                      fontSize: 15,
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <PrimaryButton
              label="Next"
              onPress={() => console.log("next")}
              style={{ marginBottom: 15, marginTop: 10 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    innerContainer: { flex: 1, alignItems: "center", gap: 20 },
    label: {
      fontSize: 14,
      color: colors.textLight0,
      marginBottom: 6,
    },
  });

export default TripSurvey;
