import * as React from "react"
import { View, ViewStyle, ImageStyle, TextStyle, Dimensions } from "react-native"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing, typography } from "../../theme"

const { width, height } = Dimensions.get("window")
export const SLIDER_HEIGHT = 0.61 * height

const CONTAINER: ViewStyle = { width }
const TITLE_CONTAINER: ViewStyle = {
  height: 100,
  justifyContent: "center",
}
const TITLE: TextStyle = {
  fontSize: 80,
  lineHeight: 80,
  fontFamily: typography.SFProBold,
  color: "white",
  textAlign: "center",
}

export interface SliderProps {
  title: string
  right?: boolean
}

export function Slider({ title, right }: SliderProps) {
  const transform = [
    { translateY: (SLIDER_HEIGHT - 100) / 2 },
    { translateX: right ? width / 2 - 50 : -width / 2 + 50 },
    { rotate: right ? "-90deg" : "90deg" },
  ]

  return (
    <View style={CONTAINER}>
      <View style={[TITLE_CONTAINER, { transform }]}>
        <Text style={TITLE}>{title}</Text>
      </View>
    </View>
  )
}
