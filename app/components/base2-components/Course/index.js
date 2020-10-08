import React, { useState, useEffect } from "react"
import { Box, Text } from "../../base-components"
import { Dimensions, Image } from "react-native"

const { width, height } = Dimensions.get("window")

function getCourseWidth() {
  var cardWidth = width - 40
  if (width >= 768) {
    cardWidth = (width - 60) / 2
  }
  if (width >= 900) {
    cardWidth = (width - 80) / 3
  }
  return cardWidth
}

export default function Course(props) {
  const [cardWith, setCardWidth] = useState(getCourseWidth(width))

  function adaptlayout(dimension) {
    setCardWidth(getCourseWidth(dimension.window.width))
  }

  useEffect(() => {
    Dimensions.addEventListener("change", adaptlayout)

    return Dimensions.removeEventListener("change", adaptlayout)
  }, [adaptlayout])

  return (
    // Container
    <Box
      width={335}
      height={335}
      backgroundColor="background"
      style={{
        width: cardWith,
        margin: 10,
        borderRadius: 14,

        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
      }}
    >
      {/* Cover */}
      <Box
        height={260}
        style={{
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          overflow: "hidden",
          justifyContent: "flex-end",
        }}
      >
        <Image
          source={props.image}
          style={{ width: width, height: height, position: "absolute" }}
        />
        <Image
          source={props.logo}
          resizeMode="contain"
          style={{
            width: 48,
            height: 48,
            position: "absolute",
            top: 90,
            left: width / 2,
            marginLeft: -24,
          }}
        />
        <Text
          variant="body"
          style={{ color: "rgba(255, 255, 255, 0.8)", textTransform: "uppercase", marginLeft: 20 }}
        >
          {props.subtitle}
        </Text>
        <Text
          variant="title2"
          style={{ color: "#FFFF", marginTop: 4, marginLeft: 20, marginBottom: 20, width: 170 }}
        >
          {props.title}
        </Text>
      </Box>
      <Box justifyContent="center" style={{ paddingLeft: 62, height: 75 }}>
        <Image
          source={props.avatar}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            left: 20,
            top: 20,
            borderRadius: 16,
          }}
        />
        <Text>{props.caption}</Text>
        <Text variant="header" style={{ fontSize: 13, marginTop: 4, color: "#b8bece" }}>
          Taught by {props.author}
        </Text>
      </Box>
    </Box>
  )
}
