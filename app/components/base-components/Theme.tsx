import React, { ReactNode } from "react"
import { ViewStyle, TextStyle, ImageStyle } from "react-native"
import {
  createTheme,
  createText,
  createBox,
  useTheme as useReTheme,
  ThemeProvider as ReStyleThemeProvider,
} from "@shopify/restyle"
import { typography } from "../../theme"

export const palette = {
  white: "#FFFFFF",
  darkWhite: "#F0F3F5",
  cyan: "#2CB9B0",
  lightCyan: "#E7F9F7",
  darkBlue: "#3c4560", // "#0C0D34",
  orange: "#FE5E33",
  yellow: "#FFC641",
  pink: "#FF87A2",
  darkPink: "#FF0058",
  violet: "#442CB9",
  lightBlue: "#BFEAF5",
  grey: "#F4F0EF",
  darkGrey: "#808080",
}

const theme = createTheme({
  colors: {
    background: palette.white,
    background2: palette.grey,
    primary: palette.violet,
    primaryLight: palette.lightCyan,
    secondary: palette.darkBlue,
    info: palette.darkGrey,
    danger: palette.darkPink,
    body: "rgba(12, 13, 52, 0.7)",
    graph1: palette.orange,
    graph2: palette.yellow,
    drawer1: palette.orange,
    drawer2: palette.yellow,
    drawer3: palette.pink,
    drawer4: palette.violet,
    // Pour test
    black: "#000000",
    darkWhite: palette.darkWhite,
    darkGrey: palette.darkGrey,
    subtitle: "rgba(255, 255, 255, 0.7)",
    darkBlue: "#3c4560", // a supprimer car doublon
    iconColor: "#546bfb",
  },
  spacing: {
    null: 0,
    s: 8,
    m: 16,
    ml: 20,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontFamily: typography.SFProBold,
      fontSize: 80,
      lineHeight: 80,
      color: "background",
      textAlign: "center",
    },
    title1: {
      fontFamily: typography.SFProSemiBold,
      fontSize: 28,
      color: "secondary",
    },
    title2: {
      fontFamily: typography.SFProSemiBold,
      fontSize: 24,
      lineHeight: 30,
      color: "secondary",
    },
    title23: {
      fontFamily: typography.SFProSemiBold,
      fontSize: 20,
      color: "secondary",
    },
    title3: {
      fontFamily: typography.SFProSemiBold,
      fontSize: 16,
      color: "secondary",
    },
    body: {
      fontFamily: typography.SFProReg,
      fontSize: 16,
      lineHeight: 24,
      color: "body",
    },
    button: {
      fontFamily: typography.SFProMedium,
      fontSize: 15,
      color: "secondary",
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: typography.SFProSemiBold,
      color: "secondary",
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: "s",
        tablet: "m",
      },
    },
    elevated: {
      padding: {
        phone: "s",
        tablet: "m",
      },
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ReStyleThemeProvider {...{ theme }}>{children}</ReStyleThemeProvider>
)
export type Theme = typeof theme
export const Box = createBox<Theme>()
export const Text = createText<Theme>()
export const useTheme = () => useReTheme<Theme>()

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export const makeStyles = <T extends NamedStyles<T>>(styles: (theme: Theme) => T) => () => {
  const currentTheme = useTheme()
  return styles(currentTheme)
}
