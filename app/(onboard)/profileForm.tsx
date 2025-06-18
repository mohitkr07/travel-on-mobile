import CustomHeader from "@/components/ui/CustomHeader";
import { FormField } from "@/components/ui/FormField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { RadioButton } from "@/components/ui/RadioButton";
import { useAppDispatch } from "@/hooks/hooks";
import { setOnboardingDetails } from "@/redux/slices/profileSlice";
import { TColors } from "@/types/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import Feather from "@react-native-vector-icons/feather";
import { useTheme } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const typedColors = colors as TColors;
  const styles = getStyles(typedColors);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
  }>({
    firstName: "",
    lastName: "",
    dob: new Date(2000, 0, 1).toISOString(),
    gender: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOnboardingDetailsChange = (value: any, field: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const showLeaveOnboardingAlert = (onLeave: () => void) => {
    Alert.alert(
        "Leave Onboarding?",
        "If you leave now, your setup won't be completed. Do you still want to exit?",
        [
          { text: "Stay", style: "cancel", onPress: () => {} },
          {
            text: "Leave",
            style: "destructive",
            onPress: onLeave,
          },
        ]
      );
    }

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      showLeaveOnboardingAlert(() => navigation.dispatch(e.data.action));
    });

    return unsubscribe;
  }, [navigation]);

  const formatDate = (dateString: string) => {
  if (!dateString) return "Select Date";
  return new Date(dateString).toLocaleDateString();
};

  const handleClickNext = () => {
    if (!profile.firstName || !profile.lastName || !profile.dob || !profile.gender) {
      Alert.alert("Incomplete Profile", "Please fill all the fields.");
      return;
    }
    console.log("Profile Details:", profile);
    dispatch(setOnboardingDetails(profile));
    router.push("/profilePic");
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Complete your profile"
        subtitle="what would you like your buddies to call you?"
        onBackPress={() => {
          showLeaveOnboardingAlert(() => router.push("/(auth)/login"));
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.section}>
              <FormField
                label="First Name"
                placeholder="Your First Name"
                value={profile.firstName}
                onChangeText={(text) =>
                  handleOnboardingDetailsChange(text, "firstName")
                }
              />
              <FormField
                label="Last Name"
                placeholder="Your Last Name"
                value={profile.lastName}
                onChangeText={(text) =>
                  handleOnboardingDetailsChange(text, "lastName")
                }
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
                <View style={styles.dobField}>
                  <Text
                    style={profile.dob ? styles.dobText : styles.dobPlaceholder}
                  >
                    {formatDate(profile.dob)}
                  </Text>
                  <Feather
                    name="calendar"
                    size={20}
                    color={typedColors.textDisabled}
                    style={styles.calendarIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(profile.dob)}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(Platform.OS === "ios");
                    if (selectedDate)
                      handleOnboardingDetailsChange(selectedDate.toISOString(), "dob");
                  }}
                  accentColor={typedColors.primary} // Use primary color for accent
                />
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderRow}>
                <RadioButton
                  label="Male"
                  isActive={profile.gender === "male"}
                  onPress={() =>
                    handleOnboardingDetailsChange("male", "gender")
                  }
                />
                <RadioButton
                  label="Female"
                  isActive={profile.gender === "female"}
                  onPress={() =>
                    handleOnboardingDetailsChange("female", "gender")
                  }
                />
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <PrimaryButton
              label="Next"
              onPress={handleClickNext}
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
    label: {
      fontSize: 14,
      color: colors.textDisabled,
      marginBottom: 6,
    },
    section: {
      marginBottom: 18,
    },
    genderRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 22,
      marginTop: 2,
    },
    dobField: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      justifyContent: "space-between",
      marginBottom: 4,
      height: 54,
      // backgroundColor: colors.card,
    },
    calendarIcon: {
      marginLeft: 8,
    },
    dobText: {
      color: colors.text,
      fontSize: 16,
    },
    dobPlaceholder: {
      color: colors.textDisabled,
      fontSize: 16,
    },
  });

export default ProfileForm;
