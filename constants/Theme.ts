import { TCustomTheme } from "@/types/theme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const MyLightTheme: TCustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(30, 136, 229)",
        background: "rgb(255, 255, 255)",
        card: "#f5f5f5",
        text: "#000000",
        border: "#cccccc",
        notification: "#f50057",
        textLight1: "rgb(138, 138, 138)",
        backgroundDisabled: "rgba(227, 232, 231, 0.8)",
        textDisabled: "rgba(114, 116, 116, 0.8)",
        linebreak: "#EAE8E8",
    },
}

const MyDarkTheme: TCustomTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: "rgb(30, 136, 229)",
        background: "rgb(255, 255, 255)",
        card: "#f5f5f5",
        text: "#000000",
        border: "#cccccc",
        notification: "#f50057",
        textLight1: "rgb(138, 138, 138)",
        backgroundDisabled: "rgba(227, 232, 231, 0.8)",
        textDisabled: "rgba(114, 116, 116, 0.8)",
        linebreak: "#EAE8E8",
    },
}

export { MyDarkTheme, MyLightTheme };

