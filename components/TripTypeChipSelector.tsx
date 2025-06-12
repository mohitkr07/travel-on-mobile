import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Define the type for each chip option
type ChipOption = {
  key: string;
  label: string;
  icon: string;
};

// Static chip options array
const CHIP_OPTIONS: ChipOption[] = [
  { key: 'road_trips', label: 'Road Trips', icon: '🚗' },
  { key: 'trekking', label: 'Trekking', icon: '🥾' },
  { key: 'bike_trips', label: 'Bike Trips', icon: '🏍️' },
  { key: 'cultural_trips', label: 'Cultural Trips', icon: '🏛️' },
  { key: 'backpacking', label: 'Backpacking', icon: '🎒' },
  { key: 'adventure', label: 'Adventure', icon: '⛰️' },
];

// Props for the Chip component
type ChipProps = {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

// Chip component
const Chip: React.FC<ChipProps> = ({ label, icon, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.chipIcon, selected && styles.chipTextSelected]}>{icon}</Text>
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
  </TouchableOpacity>
);

// Main content component
const TripTypeChipSelector: React.FC = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const toggleChip = (key: string) => {
    setSelectedChips((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Type</Text>
      <Text style={styles.subtitle}>Pick your favorites</Text>
      <FlatList
        data={CHIP_OPTIONS}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Chip
            label={item.label}
            icon={item.icon}
            selected={selectedChips.includes(item.key)}
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
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  chipList: {
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: '#E6F0FF',
    borderColor: '#3976F6',
  },
  chipIcon: {
    marginRight: 8,
    fontSize: 18,
  },
  chipText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#3976F6',
    fontWeight: '700',
  },
});

export default TripTypeChipSelector;
