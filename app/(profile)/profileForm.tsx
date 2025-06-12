import CustomHeader from "@/components/ui/CustomHeader";
import { FormField } from "@/components/ui/FormField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { RadioButton } from "@/components/ui/RadioButton";
import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  const [gender, setGender] = useState<"male" | "female" | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Complete your profile"
        subtitle="what would you like your buddies to call you?"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={styles.section}>
              <FormField label="First Name" placeholder="Your First Name" />
              <FormField label="Last Name" placeholder="Your Last Name" />
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderRow}>
                <RadioButton
                  label="Male"
                  isActive={gender === "male"}
                  onPress={() => setGender("male")}
                />
                <RadioButton
                  label="Female"
                  isActive={gender === "female"}
                  onPress={() => setGender("female")}
                />
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <PrimaryButton
              label="Next"
              onPress={() => router.push("/profilePic")}
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
  });

export default ProfileForm;
