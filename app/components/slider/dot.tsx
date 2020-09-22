import React from "react"
import Animated, { Extrapolate, interpolate } from "react-native-reanimated"

interface DotProps {
  index: number
  currentIndex: Animated.Node<number>
}

export const Dot = ({ index, currentIndex }: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 30, 0.5],
    extrapolate: Extrapolate.CLAMP,
  })
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.8, 1],
    extrapolate: Extrapolate.CLAMP,
  })

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: "#2CB9B0",
        width: 5,
        height: 5,
        borderRadius: 4,
        margin: 4,
        transform: [{ scale }],
      }}
    />
  )
}
