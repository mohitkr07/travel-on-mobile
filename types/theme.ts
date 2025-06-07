type TFontStyle = {
  fontFamily: string;
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
};

type TCustomTheme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    textLight1: string;
    backgroundDisabled: string;
    linebreak: string;
    textDisabled: string;
  };
  fonts: {
    regular: TFontStyle;
    medium: TFontStyle;
    bold: TFontStyle;
    heavy: TFontStyle;
  };
};

type TColors = TCustomTheme["colors"];

export type { TCustomTheme, TFontStyle, TColors };
