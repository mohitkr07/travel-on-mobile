//write the boiler place code
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const Chat = () => {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text>Chat Screen</Text>
    </SafeAreaView>
  );
};