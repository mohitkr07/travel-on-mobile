import DimmingOverlay from "@/components/DimmingOverlay";
import ErrorChip from "@/components/general/ErrorChip";
import MyBottomSheet from "@/components/MyBottomSheet";
import { MyDarkTheme, MyLightTheme } from "@/constants/Theme";
import { store } from "@/redux/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    enableScreens();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <ThemeProvider
            value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}
            // value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "fade",
                gestureEnabled: true,
              }}
            />
            <StatusBar style="auto" />
            <DimmingOverlay />
            <MyBottomSheet />
            <ErrorChip/>
          </ThemeProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
