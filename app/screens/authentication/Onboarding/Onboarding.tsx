import React, { useRef } from "react"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

import { View, StyleSheet, Dimensions, Image } from "react-native"
import Animated, { multiply, divide, interpolate, Extrapolate } from "react-native-reanimated"
import { useScrollHandler, interpolateColor } from "react-native-redash/lib/module/v1"

import Slide, { SLIDE_HEIGHT } from "./Slide"
import SubSlide from "./SubSlide"
import Dot from "./Dot"
import { useTheme, Theme, makeStyles } from "../../../components/base-components/Theme"

const { width } = Dimensions.get("window")
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomEndRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}))

const slides = [
  {
    title: "Meditation",
    subtitle: "Programme de respiration",
    description: "Méditer n'a jamais été aussi facile! Plonge toi un nouvel univers.",
    color: "#19002B",
    picture: { src: require("./../../../../assets/img/etoiles.png"), width: 3167, height: 7168 },
  },
  {
    title: "Yogiser",
    subtitle: "En route vers l'aventure...",
    description: "En toute simplicité où que vous soyez.",
    color: "#242275",
    picture: { src: require("./../../../../assets/img/flammes.png"), width: 5506, height: 9587 },
  },
  {
    title: "Suivez",
    subtitle: "Par la pratique au jour",
    description: "Progression et bienfaits au quotidien en douceur pour vous et que pour vous.",
    color: "#242275",
    picture: { src: require("./../../../../assets/img/fille.png"), width: 900, height: 2052 },
  },
  {
    title: "Profiter",
    subtitle: "Ouvre les yeux...",
    description: "D'un programme de découverte gratuit et illimité.",
    color: "#FFDDDD",
    picture: { src: require("./../../../../assets/img/yoga4.png"), width: 1757, height: 2551 },
  },
]

const Onboarding = observer(function Onboarding() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const styles = useStyles()
  const theme = useTheme()
  const scroll = useRef<Animated.ScrollView>(null)
  const { scrollHandler, x } = useScrollHandler()
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          })
          return (
            <Animated.View style={[styles.underlay, { opacity }]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height: ((width - theme.borderRadii.xl) * picture.height) / picture.width,
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
          {slides.map(({ title }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
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
                <SubSlide
                  key={index}
                  {...{ subtitle, description, last }}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome")
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

export default Onboarding
