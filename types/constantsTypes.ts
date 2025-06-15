type ChipOption = {
  key: string;
  label: string;
  icon: string;
};

type ChipsOptions = {
  TRIP_TYPE_CHIP_OPTIONS: ChipOption[];
  COMPANION_CHIP_OPTIONS: ChipOption[];
  VIBE_CHIP_OPTIONS: ChipOption[];
};

export type { ChipOption, ChipsOptions };