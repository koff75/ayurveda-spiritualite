/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Box, Text } from "../../base-components"

export default function CourseSection(props) {
  return (
    <Box
      style={{
        width: 150,
        height: 150,
        borderRadius: 10,

        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      }}
    >
      <Box
        backgroundColor="darkBlue"
        style={{
          height: "100%",
          borderRadius: 10,
          overflow: "hidden",
          justifyContent: "center",
          marginLeft: 20,
        }}
      >
        <Image
          source={props.image}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <LinearGradient
          colors={["#3399ff", "#33e1ff"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{
            position: "absolute",
            bottom: 0,
            height: 4,
            borderRadius: 2,
            width: props.progress * 100 + "%",
          }}
        />
        <Box
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 10,
          }}
        />
        <Text variant="body" style={{ color: "#FFFF", margin: 16 }}>
          {props.title}
        </Text>
      </Box>
    </Box>
  )
}
