import { TColors } from "@/types/theme";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileForm = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);

  return (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} placeholder="Your First Name" />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} placeholder="Your Last Name" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

};

export default ProfileForm;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    label: {
      fontSize: 16,
      color: colors.textLight1,
      // marginBottom: 8,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: 16,
      marginTop: 8,
      marginBottom: 12,
      paddingHorizontal: 12,
      height: 54,
      borderColor: colors.border,
      borderWidth: 1,
    },
  });
