import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { verifyOtpViaEmail, verifyOtpViaPhone } from "@/networking/auth";
import { setChipMsg } from "@/redux/slices/appSlice";
import { loginSuccess } from "@/redux/slices/authSlice";
import { OTPPayload } from "@/types/constantsTypes";
import { TColors } from "@/types/theme";
import { saveTokens } from "@/utils/tokenStorage";
import {
  BottomSheetTextInput,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PrimaryButton from "../ui/PrimaryButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP_LENGTH = 5;

type OTPVerifyProps = {
  closeBottomSheet: () => void;
};



const OTPVerify = ({ closeBottomSheet }: OTPVerifyProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { bottomSheetIndex, loginMethod } = useAppSelector(
    (state) => state.app
  );
  const { mobile, email, verifyOtpLoading } = useAppSelector((state) => state.auth);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const setFocusedIndex = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    const currentValue = otp[index];
    if (!currentValue && e.nativeEvent.key === "Backspace" && index > 0) {
      console.log("currentValue", currentValue);

      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleEditContact = () => {
    closeBottomSheet();
  };

  useEffect(() => {
    if (bottomSheetIndex !== -1) {
      const timeout = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setOtp(Array(OTP_LENGTH).fill(""));
    }
  }, [bottomSheetIndex]);

  const handleOTPVerify = (): void => {
    const enteredOTP = otp.join("");
    console.log("OTP Verified:", enteredOTP);

    let action: any;
    let payload: OTPPayload;

    if (loginMethod === "phone") {
      payload = { phone: mobile, otp: enteredOTP };
      action = verifyOtpViaPhone(payload);
    } else {
      payload = { email, otp: enteredOTP };
      action = verifyOtpViaEmail(payload);
    }

    dispatch(action)
      .unwrap()
      .then(async (res: any) => {
        console.log("OTP verification successful");
        const { accessToken, refreshToken } = res.token;
        closeBottomSheet();
        await saveTokens(
          accessToken,
          refreshToken
        );
        await AsyncStorage.setItem("onboarding", "started");
        dispatch(loginSuccess({accessToken, refreshToken}));
        dispatch(setChipMsg("Verified"));
        router.push("/(profile)/profileForm");
      })
      .catch((error: unknown) => {
        dispatch(setChipMsg("Invalid OTP"));
        console.error("OTP verification failed:", error);
      });
  };

  return (
    <TouchableWithoutFeedback accessible={false}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Text style={styles.title}>You&apos;re Almost There!</Text>

          <View style={styles.phoneContainer}>
            <Text style={styles.otpText}>Enter OTP</Text>
            <TouchableOpacity activeOpacity={0.5} onPress={handleEditContact}>
              <Text style={styles.phone}>
                {loginMethod === "phone" ? `+91 ${mobile}` : email}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.otpBoxContainer}>
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <BottomSheetTextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpBox}
                keyboardType="numeric"
                maxLength={1}
                value={otp[index]}
                onChangeText={(text) => handleChange(text, index)}
                onFocus={() => setFocusedIndex(index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                returnKeyType={index === OTP_LENGTH - 1 ? "done" : "next"}
                blurOnSubmit={index === OTP_LENGTH - 1}
                autoFocus={index === 0 && bottomSheetIndex !== -1}
                selectTextOnFocus={true}
              />
            ))}
          </View>

          <PrimaryButton
            label="Verify OTP"
            onPress={handleOTPVerify}
            style={{ marginTop: 20 }}
            // disabled={false}
            loading={verifyOtpLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default OTPVerify;

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 25,
      paddingBottom: 40,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 16,
    },
    phoneContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 14,
    },
    otpText: {
      fontSize: 14,
      color: colors.textLight1,
    },
    phone: {
      fontSize: 14,
      color: colors.text,
      fontWeight: 500,
      textDecorationLine: "underline",
    },
    otpBoxContainer: {
      flexDirection: "row",
      marginTop: 10,
      gap: 8,
      justifyContent: "space-between",
      marginBottom: 15,
    },
    otpBox: {
      // width: 50,
      flex: 1,
      maxWidth: 60,
      height: 50,
      borderWidth: 1,
      borderColor: colors.textLight1,
      borderRadius: 14,
      textAlign: "center",
      fontSize: 24,
      color: colors.text,
    },
  });
