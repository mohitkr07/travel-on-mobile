import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  setBottomSheetIndex,
} from "@/redux/slices/appSlice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { StyleSheet, Text } from "react-native";

const MyBottomSheet = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottomSheetIndex } = useAppSelector((state) => state.app);

  const handleSheetChanges = (index: number) => {
    console.log("handleSheetChanges", index);
    // this index is the updated index of the bottom sheet
    if (index === -1) {
      dispatch(setBottomSheetIndex(-1));
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={bottomSheetIndex}
      snapPoints={["60%"]}
      enablePanDownToClose={true}
    >
      <BottomSheetView
        style={{
          flex: 1,
          padding: 36,
          alignItems: "center",
        }}
      >
        <Text>Awesome 🎉</Text>
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
