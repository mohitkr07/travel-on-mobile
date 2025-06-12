import CloudUpload from "@/assets/svgs/CloudUpload";
import CustomHeader from "@/components/ui/CustomHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { TColors } from "@/types/theme";
import { responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const AnimatedEmoji = () => {
  const animation = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme() as unknown as { colors: TColors };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: -1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotate = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  return (
    <Animated.Text
      style={{
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
        textAlign: "center",
        marginBottom: 8,
        letterSpacing: 0.5,
        transform: [{ rotate }],
      }}
    >
      👋
    </Animated.Text>
  );
};



const ProfilePic: React.FC = () => {
  const { colors } = useTheme() as unknown as { colors: TColors };
  const styles = getStyles(colors as TColors);
  const router = useRouter()
  const [image, setImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Image selected:", result.assets[0].uri);
    } else {
      console.log("Image selection cancelled");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.innerContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.welcomeText}>Welcome Mohit</Text>
            <AnimatedEmoji />
            </View>

            <View style={styles.uploadSection}>
              <TouchableOpacity
                style={[styles.uploadFrame, image && { borderWidth: 0 }]}
                activeOpacity={0.5}
                onPress={pickImage}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    resizeMode={"contain"}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { borderRadius: 100},
                    ]}
                  />
                ) : (
                  <CloudUpload height={40} width={40} />
                )}
              </TouchableOpacity>

              <Text style={{ color: colors.textDisabled, marginTop: 15 }}>
                {image ? 'Tap the profile picture to change it' : 'Upload a profile picture'}
              </Text>
            </View>

            <View style={styles.attention}>
              <Text style={styles.label}>
                Travelers with profile pictures get{" "}
                <Text style={{ color: colors.text, fontWeight: "bold" }}>
                  2.5x more attention
                </Text>
              </Text>
              <Text style={styles.label}>-- add yours!</Text>
            </View>

            <PrimaryButton
              label="Next"
              onPress={() => router.push("/preferredDestination")}
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
    welcomeText: {
      fontSize: 20,
      fontWeight: 600,
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    titleSection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
      gap: 8,
    },
    uploadSection: {
      flex: 1,
      alignItems: "center",
      marginBottom: 18,
    },
    uploadFrame: {
      justifyContent: "center",
      alignItems: "center",
      height: responsiveWidth(40),
      width: responsiveWidth(40),
      borderRadius: 100,
      borderColor: colors.textLight1,
      backgroundColor: "#F5F5F5",
      borderWidth: 1,
      borderStyle: "dashed",
    },
    attention: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default ProfilePic;
