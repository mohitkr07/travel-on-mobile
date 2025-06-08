import { MyDarkTheme, MyLightTheme } from "@/constants/Theme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyBottomSheet from "@/components/MyBottomSheet";
import DimmingOverlay from "@/components/DimmingOverlay";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="auto" />
            <DimmingOverlay />
            <MyBottomSheet />
          </ThemeProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
