import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions, StyleSheet, Image } from "react-native"
import Animated, { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated"
import { useScrollHandler, interpolateColor } from "react-native-redash/lib/module/v1"
import { HeaderTitle } from "@react-navigation/stack"

import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Slider, SLIDER_HEIGHT, BORDER_RADIUS } from "../../components/slider/slider"
import { Subslide } from "../../components/slider/subslide"
import { Dot } from "../../components/slider/dot"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

/* === CSS === */
const CONTAINER: ViewStyle = { flex: 1, backgroundColor: "white" }
const UDERLAY: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: "flex-end",
  alignItems: "center",
  borderBottomRightRadius: BORDER_RADIUS,
  overflow: "hidden",
}
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
    title: "Meditation",
    subtitle: "Programme de respiration",
    description: "Méditer n'a jamais été aussi facile! Plonge toi un nouvel univers.",
    color: "#19002B",
    picture: { src: require("./../../../assets/img/etoiles.png"), width: 3167, height: 7168 },
  },
  {
    title: "Yogiser",
    subtitle: "En route vers l'aventure...",
    description: "En toute simplicité où que vous soyez.",
    color: "#242275",
    picture: { src: require("./../../../assets/img/flammes.png"), width: 5506, height: 9587 },
  },
  {
    title: "Suivez",
    subtitle: "Par la pratique au jour",
    description: "Progression et bienfaits au quotidien en douceur pour vous et que pour vous.",
    color: "#242275",
    picture: { src: require("./../../../assets/img/fille.png"), width: 900, height: 2052 },
  },
  {
    title: "Profiter",
    subtitle: "Ouvre les yeux...",
    description: "D'un programme de découverte gratuit et illimité.",
    color: "#FFDDDD",
    picture: { src: require("./../../../assets/img/yoga4.png"), width: 1757, height: 2551 },
  },
]
export const OnboardingScreen = observer(function OnboardingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const scroll = useRef<Animated.ScrollView>(null)
  const { scrollHandler, x } = useScrollHandler()
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  })
  return (
    <View style={CONTAINER}>
      <Animated.View style={[SLIDER, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          })
          return (
            <Animated.View style={[UDERLAY, { opacity }]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: width - BORDER_RADIUS,
                  height: ((width - BORDER_RADIUS) * picture.height) / picture.width,
                }}
              />
            </Animated.View>
          )
        })}

        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, color, picture }, index) => (
            <Slider key={index} right={!!(index % 2)} {...{ title, picture }} />
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
                      navigation.navigate("welcome")
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
