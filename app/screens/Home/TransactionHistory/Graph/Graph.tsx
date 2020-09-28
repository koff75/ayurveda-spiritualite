import React from "react"
import { Dimensions, View } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import Animated, { divide, multiply, sub } from "react-native-reanimated"
import { useTransition } from "react-native-redash/lib/module/v1"
import moment from "moment"

import { Box, useTheme } from "../../../../components/base-components"
import { Theme } from "../../../../components/base-components/Theme"
import Underlay, { MARGIN } from "./Underlay"
import { lerp } from "./Scale"

export interface DataPoint {
  id: number
  date: number
  value: number
  color: keyof Theme["colors"]
}

interface GraphProps {
  data: DataPoint[]
  startDate: number
  numberOfMonths: number
}

const { width: wWidth } = Dimensions.get("window")
const aspectRatio = 195 / 305
const AnimatedBox = Animated.createAnimatedComponent(Box)

const Graph = ({ data, startDate, numberOfMonths }: GraphProps) => {
  const theme = useTheme()
  const isFocused = useIsFocused()
  const transition = useTransition(isFocused, { duration: 650 })

  const canvasWidth = wWidth - theme.spacing.m * 2
  const canvasHeight = canvasWidth * aspectRatio
  const width = canvasWidth - theme.spacing[MARGIN]
  const height = canvasHeight - theme.spacing[MARGIN]

  const step = width / numberOfMonths
  const values = data.map((p) => p.value)
  const minY = Math.min(...values)
  const maxY = Math.max(...values)

  return (
    <Box marginTop="l" paddingBottom={MARGIN} paddingLeft={MARGIN}>
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <View style={{ width, height, overflow: "hidden" }}>
        {data.map((point) => {
          const i = Math.round(moment.duration(moment(point.date).diff(startDate)).asMonths())
          const totalHeight = lerp(0, height, point.value / maxY)
          const currentHeight = multiply(totalHeight, transition)
          const translateY = divide(sub(totalHeight, currentHeight), 2)

          return (
            <AnimatedBox
              key={point.id}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={totalHeight}
              style={{ transform: [{ translateY }, { scaleY: transition }] }}
            >
              <Box
                backgroundColor={point.color}
                opacity={0.1}
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderTopLeftRadius="m"
                borderTopRightRadius="m"
              />
              <Box
                backgroundColor={point.color}
                position="absolute"
                top={0}
                height={32}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius="m"
              />
            </AnimatedBox>
          )
        })}
      </View>
    </Box>
  )
}

export default Graph
