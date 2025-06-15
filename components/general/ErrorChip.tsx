import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setErrorMsgChipVisible } from '@/redux/slices/appSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Dimensions, Keyboard, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const AUTO_HIDE_DURATION = 2500; // ms

const ErrorChip = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const dispatch = useAppDispatch();
  const { errorMsg, chipVisible } = useAppSelector((state) => state.app);

  // Keyboard listeners
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Handle fade in/out and auto-hide
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (chipVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-hide after duration
      timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          dispatch(setErrorMsgChipVisible(false));
          // Optionally reset errorMsg here if you want
          // dispatch(resetErrorMsg());
        });
      }, AUTO_HIDE_DURATION);
    } else {
      // If hidden, ensure opacity is 0
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [chipVisible]);

  if (!chipVisible) return null;

  return (
    <Animated.View
      style={[
        styles.chipContainer,
        { opacity: fadeAnim, bottom: keyboardHeight + 40 }
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.chip}>
        <Text style={styles.chipText}>{errorMsg}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    position: 'absolute',
    left: width * 0.1,
    width: width * 0.8,
    alignItems: 'center',
    zIndex: 1000,
  },
  chip: {
    backgroundColor: '#ff5252',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ErrorChip;
