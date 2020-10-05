/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image } from "react-native"
import { DRAWER_WIDTH } from "../../../screens/Home/Drawer"
import { Box, Text } from "../../base-components"

export default function Logo(props) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor="background"
      height={60}
      marginVertical="null"
      marginHorizontal="s"
      // eslint-disable-next-line react-native/no-color-literals
      style={{
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Image source={props.image} resizeMode="contain" style={{ width: 36, height: 36 }} />
      <Text variant="body" marginLeft="s" color="black">
        {props.text}
      </Text>
    </Box>
  )
}
