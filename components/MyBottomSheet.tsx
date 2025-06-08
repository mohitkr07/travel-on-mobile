import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setBottomSheetIndex,
} from "@/redux/slices/appSlice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { StyleSheet, BackHandler, Keyboard } from "react-native";
import OTPVerify from "./auth/OTPVerify";

const MyBottomSheet = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottomSheetIndex } = useAppSelector((state) => state.app);

  useEffect(() => {
    const backAction = () => {
      if (bottomSheetIndex !== -1) {
        bottomSheetRef.current?.close();
        return true; // Prevent default back behavior
      }
      return false; // Allow default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [bottomSheetIndex]);

  const handleSheetChanges = (index: number) => {
    console.log("handleSheetChanges", index);
    // this index is the updated index of the bottom sheet
    if (index === -1) {
      Keyboard.dismiss();
      dispatch(setBottomSheetIndex(-1));
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={bottomSheetIndex}
      snapPoints={["65%"]}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ display: "none" }}
      enableDynamicSizing={true}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      maxDynamicContentSize={500}
    >
      <BottomSheetView
        style={{
          flex: 1,
          // padding: 36,
          alignItems: "center",
        }}
      >
        {/* <Text>Awesome 🎉</Text> */}
        <OTPVerify closeBottomSheet={() => bottomSheetRef?.current?.close()} />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default MyBottomSheet;
