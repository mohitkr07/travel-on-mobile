import Welcome1 from "@/assets/svgs/Welcome1";
import Welcome2 from "@/assets/svgs/Welcome2";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { TColors } from "@/types/theme";
import { responsiveHeight, responsiveWidth } from "@/utils/responsive";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TripSurvey from "./(profile)/tripSurvey";

function WelcomeFirst() {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);

  return (
    <View style={{ width: responsiveWidth(100) }}>
      <View style={styles.topSection}>
        <Welcome1 width={250} height={200} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.heading}>
          Travel plans are{"\n"}better when shared
        </Text>
        <Text style={styles.subheading}>Like bunk beds on school trips!</Text>
      </View>
    </View>
  );
}

function WelcomeSecond() {
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);

  return (
    <View style={{ width: responsiveWidth(100) }}>
      <View style={styles.topSection}>
        <Welcome2 width={250} height={200} />
      </View>
      <View style={styles.textSection}>
        <Text style={styles.heading}>
          Remember asking,{"\n"}&apos;Who&apos;s coming with me?&apos;
        </Text>
        <Text style={styles.subheading}>Now there&apos;s an app for that</Text>
      </View>
    </View>
  );
}

const Welcome = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = getStyles(colors as TColors);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const newPage = Math.round(contentOffset.x / responsiveWidth(100));
    setPage(newPage);
  };

  const handlePlanPostPack = () => {
    router.push("/(auth)/login");
  };

  return (
    <TripSurvey />
    // <SafeAreaView style={styles.container}>
    //   <ScrollView
    //     ref={scrollRef}
    //     horizontal
    //     pagingEnabled
    //     showsHorizontalScrollIndicator={false}
    //     onScroll={handleScroll}
    //     scrollEventThrottle={16}
    //   >
    //     <WelcomeFirst />
    //     <WelcomeSecond />
    //   </ScrollView>

    //   {/* Dots Indicator */}
    //   <View style={styles.dotsContainer}>
    //     {[0, 1].map((i) => (
    //       <View key={i} style={[styles.dot, page === i && styles.dotActive]} />
    //     ))}
    //   </View>

    //   {/* Bottom Section */}
    //   <View style={styles.bottomSection}>
    //     <Text style={styles.bottomText}>Let&apos;s start exploring.</Text>
    //     <PrimaryButton label="PLAN. POST. PACK" onPress={handlePlanPostPack} />
    //   </View>
    // </SafeAreaView>
  );
};

export default Welcome;
const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    topSection: {
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    dotsContainer: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
      padding: 7,
      borderRadius: 100,
      // backgroundColor: colors.backgroundDisabled,
      top: responsiveHeight(37),
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 100,
      backgroundColor: colors.border,
      marginHorizontal: 4,
    },
    dotActive: {
      backgroundColor: colors.text,
    },
    textSection: {
      marginTop: responsiveHeight(11),
      alignItems: "center",
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    subheading: {
      fontSize: 15,
      color: colors.textLight1,
      textAlign: "center",
    },
    bottomSection: {
      width: "100%",
      alignItems: "center",
      marginBottom: 43,
      paddingTop: 15,
      paddingHorizontal: 24,
      borderTopWidth: 0.5,
      borderTopColor: colors.linebreak,
    },
    bottomText: {
      fontSize: 13,
      color: colors.textLight1,
      marginBottom: 16,
    },
  });
