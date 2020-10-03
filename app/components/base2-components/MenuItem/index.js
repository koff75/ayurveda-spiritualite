import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Box, Text } from "../../base-components"
import { useTheme } from "@shopify/restyle"

/*
  List items inside the menu 'Account, billing, etc...'
  Manage below the CSS (icon color, text size...)
*/
export default function MenuItem(props) {
  const { colors } = useTheme()
  return (
    <Box flexDirection="row" marginHorizontal={0} marginVertical="m">
      <Box width={32} height={32} justifyContent="center" alignItems="center">
        <Ionicons name={props.icon} size={24} color={colors.iconColor} />
      </Box>
      <Box paddingLeft="ml">
        <Text variant="title2">{props.title}</Text>
        <Text variant="body" opacity={0.6} marginTop="s">
          {props.text}
        </Text>
      </Box>
    </Box>
  )
}
