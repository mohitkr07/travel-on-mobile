import DimmingOverlay from "@/components/DimmingOverlay";
import ErrorChip from "@/components/general/ErrorChip";
import GlobalLoader from "@/components/GlobalLoader";
import MyBottomSheet from "@/components/MyBottomSheet";
import { MyDarkTheme, MyLightTheme } from "@/constants/Theme";
import { useAppSelector } from "@/hooks/hooks";
import { persistor, store } from "@/redux/store";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

enableScreens();

const RootStack = () => {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isOnboardingComplete } = useAppSelector(
    (state) => state.auth
  );

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          gestureEnabled: true,
        }}
      >
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="index" />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated && isOnboardingComplete}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated && !isOnboardingComplete}>
          <Stack.Screen name="(onboard)" />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" />
      <DimmingOverlay />
      <MyBottomSheet />
      <ErrorChip />
      <GlobalLoader />
    </ThemeProvider>
  );
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootStack />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
