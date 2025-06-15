import { TCustomTheme } from "@/types/theme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const MyLightTheme: TCustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(36, 186, 236)",
        background: "rbg(255, 255, 255)",
        themeBackground: "rgb(188, 236, 252)",
        card: "#f5f5f5",
        text: "#000000",
        border: "#cccccc",
        notification: "#f50057",
        textLight0: "#404040",
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
        primary: "rgb(36, 186, 236)",
        background: "rgb(18, 18, 18)",
        card: "#1e1e1e",
        themeBackground: "rgb(18, 18, 18)",
        text: "rgb(255, 255, 255)",
        border: "#272727",
        notification: "#cf6679",
        textLight0: "#404040",
        textLight1: "rgb(255, 255, 255)",
        backgroundDisabled: "rgba(202, 202, 202, 0.44)",
        textDisabled: "rgba(114, 116, 116, 0.88)",
        linebreak: "#EAE8E8",
    },
}

export { MyDarkTheme, MyLightTheme };