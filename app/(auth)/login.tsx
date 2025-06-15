import EmailIcon from "@/assets/svgs/EmailIcon";
import GoogleIcon from "@/assets/svgs/GoogleIcon";
import LadyWithEmail from "@/assets/svgs/LadyWithEmail";
import LadyWithPhone from "@/assets/svgs/LadyWithPhone";
import PhoneIcon from "@/assets/svgs/PhoneIcon";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { requestOtpViaEmail, requestOtpViaPhone } from "@/networking/auth";
import { setBottomSheetContentType, setBottomSheetIndex, setLoginMethod } from "@/redux/slices/appSlice";
import { setEmail, setMobile } from "@/redux/slices/authSlice";
import { TColors } from "@/types/theme";
import { isValidEmail } from "@/utils/validation";
// import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  // const [mobile, setMobile] = useState("");
  // const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  // const [isLoginViaPhone, setLoginMethod] = useState(true);
  const { loginMethod } = useAppSelector((state) => state.app);
  const { requestOtpLoading, email, mobile } = useAppSelector((state) => state.auth);
  const [isFocused, setIsFocused] = useState(false);

  const toggleLoginMethod = () => {
    dispatch(setLoginMethod(loginMethod === "phone" ? "email" : "phone"));
    dispatch(setEmail(""))
    dispatch(setMobile(""))
  };
  
  const handleOtpSent = (method: "phone" | "email") => {
    if (method === "phone" && mobile.length === 10) {
      dispatch(requestOtpViaPhone(mobile))
      dispatch(setBottomSheetContentType('otpVerify'));
      Keyboard.dismiss();
    } else if (method === "email" && isValidEmail(email)) {
      dispatch(requestOtpViaEmail(email))
      .unwrap()
      .then((res) => {
        dispatch(setBottomSheetContentType('otpVerify'));
      })
      .catch((error) => {
        console.error("Error requesting OTP:", error);
      });
      Keyboard.dismiss();
    } else {
      console.error("Invalid input for OTP sending");
    }
  };

  const handleChangeText = (text: string) => {
    if (loginMethod === "phone") {
      dispatch(setMobile(text));
    }
    if (loginMethod === "email") {
      dispatch(setEmail(text));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ marginTop: 40 }}>
              {loginMethod === "phone" ? (
                <LadyWithPhone width={250} height={200} />
              ) : (
                <LadyWithEmail width={250} height={200} />
              )}
            </View>
            <Text style={styles.header}>
              {loginMethod === "phone" ? "Enter Mobile Number" : "Enter Email"}
            </Text>
            <View
              style={[
                styles.inputContainer,
                isFocused && { borderColor: colors.border },
              ]}
            >
              {loginMethod === "phone" && (
                <Text style={styles.countryCode}>+91 🇮🇳</Text>
              )}
              {loginMethod === "phone" ? (
                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number"
                  keyboardType="phone-pad"
                  value={mobile}
                  onChangeText={handleChangeText}
                  maxLength={10}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoFocus={!email && !mobile}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  editable={loginMethod === "email"}
                  value={email}
                  onChangeText={handleChangeText}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoFocus={!email && !mobile}
                />
              )}
            </View>

            <View style={styles.otpButton}>
              {loginMethod === "phone" ? (
                <PrimaryButton
                  label="SEND OTP"
                  onPress={() => handleOtpSent("phone")}
                  disabled={mobile.length === 10 ? false : true}
                />
              ) : (
                <PrimaryButton
                  label="SEND OTP"
                  onPress={() => handleOtpSent("email")}
                  disabled={!email || !isValidEmail(email)}
                  loading={requestOtpLoading}
                />
              )}
            </View>

            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setWhatsapp(!whatsapp)}
            >
              <Checkbox
                value={whatsapp}
                onValueChange={setWhatsapp}
                color={whatsapp ? colors.primary : undefined}
                style={{
                  borderWidth: 1,
                  width: 20,
                  height: 20,
                  borderColor: colors.border,
                }}
              />
              <Text style={styles.checkboxLabel}>
                I agree to receive updates over whatsapp
              </Text>
            </Pressable>

            <Text style={styles.terms}>
              By signing up, you agree to the{" "}
              <Text style={styles.link}>Terms Of Service</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.or}>Or</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <View style={styles.socialButtonContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={toggleLoginMethod}
                >
                  {loginMethod === "phone" ? (
                    <EmailIcon width={24} height={24} />
                  ) : (
                    <PhoneIcon width={24} height={24} />
                  )}
                </TouchableOpacity>
                <Text style={styles.socialText}>
                  {loginMethod === "phone" ? "Email" : "OTP"}
                </Text>
              </View>

              <View style={styles.socialButtonContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <GoogleIcon width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.socialText}>Google</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
      // justifyContent: "center",
      paddingHorizontal: 24,
    },
    header: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 16,
      marginTop: 8,
      marginBottom: 12,
      paddingHorizontal: 12,
      width: "100%",
      height: 54,
      borderColor: colors.border,
      borderWidth: 1,
    },
    countryCode: {
      fontSize: 16,
      color: colors.text,
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    otpButton: {
      width: "100%",
      height: 48,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
      marginBottom: 15,
    },
    otpButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    checkboxLabel: {
      marginLeft: 8,
      color: colors.text,
      fontSize: 14,
    },
    terms: {
      color: colors.text,
      fontSize: 12,
      textAlign: "center",
      marginBottom: 16,
      paddingHorizontal: 10,
    },
    link: {
      color: colors.primary,
      textDecorationLine: "underline",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginVertical: 8,
    },
    divider: {
      // flex: 1,
      width: 100,
      height: 0.5,
      backgroundColor: colors.border,
    },
    or: {
      marginHorizontal: 8,
      color: colors.textDisabled,
      fontSize: 14,
    },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 60,
      marginTop: 8,
    },
    socialButtonContainer: {
      alignItems: "center",
      gap: 4,
    },
    socialButton: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.backgroundDisabled,
      borderRadius: 100,
      height: 50,
      width: 50,
    },
    socialIcon: {
      width: 24,
      height: 24,
    },
    socialText: {
      color: colors.text,
      fontSize: 12,
    },
  });
