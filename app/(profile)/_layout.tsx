import { getAccessToken } from '@/utils/tokenStorage'
import { Stack, useRouter } from 'expo-router'
import React, { useEffect } from 'react'

const ProfileLayout = () => {
  
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
  )
}

export default ProfileLayout