import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { CHIPS_OPTIONS } from "@/constants/helper";
import { CHIPS_SELECTORS, setSurveyChips } from "@/redux/slices/tripSurveySlice";

type ChipProps = {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, icon, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.chipIcon, selected && styles.chipTextSelected]}>
      {icon}
    </Text>
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const TripTypeChipSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    activeChipSelector,
    selectedTripTypesKeys,
    selectedCompanionsKeys,
    selectedVibesKeys,
  } = useAppSelector((state) => state.tripSurvey);

  const toggleChip = (key: string) => {
    dispatch(setSurveyChips(key));
  };

  const assignChipOptions = () => {
    return CHIPS_OPTIONS[activeChipSelector as keyof typeof CHIPS_OPTIONS] || [];
  };

  const getSelectedChips = () => {
    switch (activeChipSelector) {
      case CHIPS_SELECTORS[0]:
        return selectedTripTypesKeys;
      case CHIPS_SELECTORS[1]:
        return selectedCompanionsKeys;
      case CHIPS_SELECTORS[2]:
        return selectedVibesKeys;
      default:
        return [];
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Type</Text>
      <Text style={styles.subtitle}>Pick your favorites</Text>
      <FlatList
        data={assignChipOptions()}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Chip
            label={item.label}
            icon={item.icon}
            selected={getSelectedChips().includes(item.key)}
            onPress={() => toggleChip(item.key)}
          />
        )}
        contentContainerStyle={styles.chipList}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  chipList: {
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#E6F0FF",
    borderColor: "#3976F6",
  },
  chipIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  chipText: {
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#3976F6",
    fontWeight: "700",
  },
});

export default TripTypeChipSelector;
