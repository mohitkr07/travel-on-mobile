import BigCheck from "@/assets/svgs/bigCheck";
import CustomHeader from "@/components/ui/CustomHeader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { TColors } from "@/types/theme";
import { responsiveHeight, responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
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

const destinations = [
  {
    label: "Mountains",
    image: require("@/assets/images/mountains.jpg"),
  },
  {
    label: "Cities",
    image: require("@/assets/images/cities.jpg"),
  },
  {
    label: "Beaches",
    image: require("@/assets/images/beaches.jpg"),
  },
  {
    label: "Historical Pladces",
    image: require("@/assets/images/historical.jpg"),
  },
];

const PrefferedDestination: React.FC = () => {
  const { colors } = useTheme() as unknown as { colors: TColors };
  const styles = getStyles(colors as TColors);
  const router = useRouter();
  const [selectedDestinationType, setSelectedDestinationTeype] = React.useState<string[]>([]);

  const isChecked = (destination: string) => {
    return selectedDestinationType.includes(destination);
  }

  const handleCheckDestination = (destination: string) => {
    if (isChecked(destination)) {
      setSelectedDestinationTeype(selectedDestinationType.filter((dest) => dest !== destination));
    }
    else {
      setSelectedDestinationTeype([...selectedDestinationType, destination]);
    } 
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Preferred Destination" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.innerContainer}>
            <ScrollView style={{ flex: 1, width: "100%", gap: 12 }} showsVerticalScrollIndicator={false}>
              {destinations.map((dest) => (
                <Pressable
                  key={dest.label}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    marginBottom: 8,
                    elevation: 2,
                    backgroundColor: colors.card,
                  }}
                  onPress={() => handleCheckDestination(dest.label)}
                >
                  <Image
                    source={dest.image}
                    style={{ width: "100%", height: responsiveHeight(15) }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      backgroundColor: isChecked(dest.label) ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.25)",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                    }}
                  >
                    {isChecked(dest.label) && <BigCheck width={responsiveWidth(15)} height={responsiveHeight(7.5)} />}
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: "bold",
                        // textShadowColor: "rgba(0,0,0,0.7)",
                        // textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 4,
                      }}
                    >
                      {dest.label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <PrimaryButton
              label="Next"
              onPress={() => router.push("/tripSurvey")}
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

export default PrefferedDestination;
