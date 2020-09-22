import React, { forwardRef } from "react"
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from "react-native"
import { Feather as Icon } from "@expo/vector-icons"
import { Box, useTheme } from "../Theme"
import RoundIcon from "../RoundIcon"
import { color, spacing, typography, borderRadius } from "../../../theme"

/* === CSS === */
const CONTAINER: ViewStyle = {}

interface TextInputProps extends RNTextInputProps {
  icon: string
  error?: string
  touched?: boolean
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ icon, error, touched, ...props }, ref) => {
    // const theme = useTheme()
    const SIZE = borderRadius.m * 2
    const colorDetec = !touched ? "body" : error ? "danger" : "primary"
    const themeColor = color[colorDetec]

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 48,
          borderRadius: borderRadius.s,
          borderColor: colorDetec,
          borderWidth: StyleSheet.hairlineWidth,
          padding: spacing.s,
        }}
      >
        <View style={{ padding: spacing.s }}>
          <Icon name={icon} size={16} color={themeColor} />
        </View>
        <View style={{ flex: 1 }}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={themeColor}
            {...{ ref }}
            {...props}
          />
        </View>
        {touched && (
          <RoundIcon
            name={!error ? "check" : "x"}
            size={SIZE}
            backgroundColor={!error ? "primary" : "danger"}
            color="background"
          />
        )}
      </View>
    )
  },
)

export default TextInput
