import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions, StyleSheet } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Slider, SLIDER_HEIGHT } from "../../components/slider/slider"
import { Subslide } from "../../components/slider/subslide"
import Animated, { multiply } from "react-native-reanimated"
import { useScrollHandler, interpolateColor } from "react-native-redash/lib/module/v1"
import { HeaderTitle } from "@react-navigation/stack"

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
  flexDirection: "row",
  backgroundColor: "white",
  borderTopLeftRadius: BORDER_RADIUS,
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
  const { scrollHandler, x, y } = useScrollHandler()
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
        <Animated.View style={[{ ...StyleSheet.absoluteFillObject }, { backgroundColor }]} />
        <Animated.View
          style={[
            FOOTER_CONTENT,
            { width: width * slides.length, flex: 1, transform: [{ translateX: multiply(x, -1) }] },
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              key={index}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
              onPress={() => {
                if (scroll.current) {
                  scroll.current?.getNode().scrollTo({ x: width * (index + 1), animated: true })
                }
              }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  )
})
