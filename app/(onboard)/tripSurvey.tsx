import Companion from "@/assets/svgs/Companion";
import TrollyBag from "@/assets/svgs/TrollyBag";
import VibeWith from "@/assets/svgs/VibeWith";
import CustomHeader from "@/components/ui/CustomHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { onboardProfileAsync } from "@/networking/profile";
import { setBottomSheetContentType } from "@/redux/slices/appSlice";
import { setIsOnboardingComplete } from "@/redux/slices/authSlice";
import {
  CHIPS_SELECTORS,
  setActiveChipSelector,
} from "@/redux/slices/tripSurveySlice";
import { TColors } from "@/types/theme";
import { responsiveHeight, responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tripTypes = [
  {
    key: CHIPS_SELECTORS[0],
    label: "Trip Type",
    icon: <TrollyBag />,
  },
  {
    key: CHIPS_SELECTORS[1],
    label: "Companion",
    icon: <Companion />,
  },
  {
    key: CHIPS_SELECTORS[2],
    label: "Vibe",
    icon: <VibeWith />,
  },
];

const TripSurvey: React.FC = () => {
  const [selected, setSelected] = useState("companion");
  const { colors } = useTheme() as unknown as { colors: TColors };
  const styles = getStyles(colors as TColors);
  const dispatch = useAppDispatch();
  const { selectedCompanionsKeys, selectedTripTypesKeys, selectedVibesKeys } =
    useAppSelector((state) => state.tripSurvey);
  const { onboardingDetails } = useAppSelector((state) => state.profile);

  const handleCardPress = (key: string) => {
    setSelected(key);
    dispatch(setActiveChipSelector(key));
    dispatch(setBottomSheetContentType("tripSurvey"));
  };

  const getBackgroundColor = (cardKey: string) => {
    switch (cardKey) {
      case CHIPS_SELECTORS[0]:
        return selectedTripTypesKeys.length > 0
          ? colors.themeBackground
          : colors.card;
      case CHIPS_SELECTORS[1]:
        return selectedCompanionsKeys.length > 0
          ? colors.themeBackground
          : colors.card;
      case CHIPS_SELECTORS[2]:
        return selectedVibesKeys.length > 0
          ? colors.themeBackground
          : colors.card;
      default:
        return colors.card;
    }
  };

  const handleCompleteOnboarding = () => {
    dispatch(setIsOnboardingComplete(true));
    console.log(onboardingDetails);
    dispatch(onboardProfileAsync(onboardingDetails))
      .unwrap()
      .then(() => {
        console.log("Onboarding completed successfully");
        router.replace("/(tabs)/home");
      })
      .catch((error) => {
        console.error("Onboarding failed:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Trips you vibe with?" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
                flex: 1,
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
                      backgroundColor: getBackgroundColor(item.key),
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
                      aspectRatio: 1 / 1,
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
              onPress={handleCompleteOnboarding}
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
