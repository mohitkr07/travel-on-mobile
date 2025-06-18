import { Stack } from "expo-router";
import React from "react";

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="profileForm" />
      <Stack.Screen name="profilePic" />
      <Stack.Screen name="preferredDestination" />
      <Stack.Screen name="tripSurvey" />
    </Stack>
  );
};

export default ProfileLayout;
