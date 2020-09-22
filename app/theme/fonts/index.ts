import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    "SFPro-Regular": require("./SF-Pro-Display-Regular.otf"),
    "SFPro-Semibold": require("./SF-Pro-Display-Semibold.otf"),
    "SFPro-Bold": require("./SF-Pro-Display-Bold.otf"),
    "SFPro-Medium": require("./SF-Pro-Display-Medium.otf"),
  })
}
