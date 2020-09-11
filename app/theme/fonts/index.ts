import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    "SFProText-Regular": require("./SFProText-Regular.ttf"),
    "SFProText-Semibold": require("./SFProText-Semibold.ttf"),
    "SFProText-Bold": require("./SFProText-Bold.ttf"),
  })
}
