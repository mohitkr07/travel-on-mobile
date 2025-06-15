import { Stack } from 'expo-router'
import React from 'react'

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
  )
}

export default ProfileLayout