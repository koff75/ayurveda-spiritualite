import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions, StyleSheet } from "react-native"
import Animated, { multiply, divide } from "react-native-reanimated"
import { useScrollHandler, interpolateColor } from "react-native-redash/lib/module/v1"
import { HeaderTitle } from "@react-navigation/stack"

import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Slider, SLIDER_HEIGHT } from "../../components/slider/slider"
import { Subslide } from "../../components/slider/subslide"
import { Dot } from "../../components/slider/dot"

const BORDER_RADIUS = 75
const { width } = Dimensions.get("window")

/* === CSS === */
const CONTAINER: ViewStyle = { flex: 1, backgroundColor: "white" }
const SLIDER: ViewStyle = {
  height: SLIDER_HEIGHT,
  borderBottomRightRadius: BORDER_RADIUS,
}
const FOOTER: ViewStyle = { flex: 1 }
const FOOTER_CONTENT: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
  borderTopLeftRadius: BORDER_RADIUS,
}
const PAGINATION: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  height: BORDER_RADIUS,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}
/* === END CSS === */

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description: "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description: "Hating the clothes in your wardrobe? Explore hundreds of outfits ideas",
    color: "#BEECC4",
  },
  {
    title: "Excentric",
    subtitle: "Your Style, Your Way",
    description: "Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description: "Discover the latest trends in fashion and explore your personality",
    color: "#FFDDDD",
  },
]
export const OnboardingScreen = observer(function OnboardingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const scroll = useRef<Animated.ScrollView>(null)
  const { scrollHandler, x } = useScrollHandler()
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  })
  return (
    <View style={CONTAINER}>
      <Animated.View style={[SLIDER, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, color }, index) => (
            <Slider key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={FOOTER}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
        <View style={FOOTER_CONTENT}>
          <View style={PAGINATION}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index }} />
            ))}
          </View>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1

              return (
                <Subslide
                  key={index}
                  {...{ subtitle, description, last }}
                  onPress={() => {
                    if (last) {
                      //navigation.navigate("Welcome")
                    } else {
                      scroll.current?.getNode().scrollTo({ x: width * (index + 1), animated: true })
                    }
                  }}
                />
              )
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  )
})
