import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
  );
};

export default AuthLayout;
