/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Box, Text } from "../../base-components"
import { Dimensions, Image } from "react-native"

const { width, height } = Dimensions.get("window")
var cardWidth = width - 60
if (width > 500) {
  cardWidth = 335
}
export default function Card(props) {
  return (
    /* Container */
    <Box
      backgroundColor="background"
      style={{
        width: cardWidth,
        height: 280,
        borderRadius: 14,
        margin: 20,

        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
      }}
    >
      {/* Cover */}
      <Box
        width={cardWidth}
        height={200}
        style={{ borderTopLeftRadius: 14, borderTopRightRadius: 14, overflow: "hidden" }}
      >
        <Image
          source={props.image}
          style={{ width: width, height: height, position: "absolute", top: 0, left: 0 }}
        />
        <Text variant="title2" color="background" marginTop="ml" marginLeft="ml" width={170}>
          {props.title}
        </Text>
      </Box>
      {/* Wrapper */}
      <Box height={80} flexDirection="row" alignItems="center" paddingLeft="ml">
        <Image source={props.logo} style={{ width: 44, height: 44 }} />
        <Box style={{ marginLeft: 10 }}>
          <Text variant="body" color="darkBlue" fontSize={20}>
            {props.caption}
          </Text>
          <Text
            variant="body"
            fontSize={15}
            textTransform="uppercase"
            style={{ color: "#b8bece", marginTop: 4 }}
          >
            {props.subtitle}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
