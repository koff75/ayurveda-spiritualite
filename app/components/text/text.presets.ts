import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.SFProReg,
  color: color.text,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontFamily: typography.SFProBold } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

  hero: {
    fontFamily: typography.SFProBold,
    fontSize: 80,
    lineHeight: 80,
    color: color.background,
    textAlign: "center",
  } as TextStyle,
  title1: {
    fontFamily: typography.SFProSemiBold,
    fontSize: 28,
    color: color.secondary,
  },
  title2: {
    fontFamily: typography.SFProSemiBold,
    fontSize: 24,
    lineHeight: 30,
    color: color.secondary,
  } as TextStyle,
  title3: {
    fontFamily: typography.SFProSemiBold,
    fontSize: 16,
    color: color.secondary,
  } as TextStyle,
  body: {
    fontFamily: typography.SFProReg,
    fontSize: 16,
    lineHeight: 24,
    color: color.body,
  } as TextStyle,
  button: {
    fontFamily: typography.SFProMedium,
    fontSize: 15,
    color: color.secondary,
  } as TextStyle,
  header: {
    fontSize: 12,
    lineHeight: 24,
    fontFamily: typography.SFProSemiBold,
    color: color.secondary,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
