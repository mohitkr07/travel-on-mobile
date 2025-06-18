import DimmingOverlay from "@/components/DimmingOverlay";
import ErrorChip from "@/components/general/ErrorChip";
import GlobalLoader from "@/components/GlobalLoader";
import MyBottomSheet from "@/components/MyBottomSheet";
import { MyDarkTheme, MyLightTheme } from "@/constants/Theme";
import { useAppDispatch } from "@/hooks/hooks";
import { loginSuccess } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";

enableScreens();

function AuthBootstrapper({ onFinish }: { onFinish: () => void }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const bootstrapAsync = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const onboarding = await AsyncStorage.getItem("onboarding");

      if (accessToken && refreshToken) {
        if (onboarding && onboarding === "started") {
          router.replace("/(profile)/profileForm");
        }
        dispatch(loginSuccess({ accessToken, refreshToken }));
      }

      onFinish();
    };

    bootstrapAsync();
  }, [dispatch]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [bootstrapped, setBootstrapped] = useState(false);

  const handleSetBootstrapped = () => {
    console.log("Bootstrapping finished");
    setBootstrapped(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  if (!bootstrapped) {
    console.log("Bootstrapping not finished yet");
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <ThemeProvider
            value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}
          >
            <AuthBootstrapper onFinish={handleSetBootstrapped} />
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
            <ErrorChip />
            <GlobalLoader />
          </ThemeProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
