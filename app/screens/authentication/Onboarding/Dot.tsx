import React from "react"
import Animated, { Extrapolate, interpolate } from "react-native-reanimated"

interface DotProps {
  index: number
  currentIndex: Animated.Node<number>
}

const Dot = ({ index, currentIndex }: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 4, 0.9],
    extrapolate: Extrapolate.CLAMP,
  })
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.7, 1.25, 0.7],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: "#242275",
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
        transform: [{ scale }],
      }}
    />
  )
}

export default Dot
