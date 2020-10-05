/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image } from "react-native"
import { Box, Text } from "../../base-components"

export default function Logo(props) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      backgroundColor="background"
      height={60}
      paddingTop="null"
      // eslint-disable-next-line react-native/no-color-literals
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

        paddingVertical: 12,
      }}
    >
      <Image source={props.image} resizeMode="contain" width={36} height={36} />
      <Text variant="body" marginLeft="s">
        {props.text}
      </Text>
    </Box>
  )
}
