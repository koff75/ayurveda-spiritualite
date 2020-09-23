import { observer } from "mobx-react-lite"
import React from "react"
import { Image, Dimensions, View, ViewStyle, StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
// import { View, Text, Button, useTheme } from "../components"
import { color, spacing, typography, borderRadius } from "../../theme"
import { Text, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"

// import { AuthNavigationProps } from "../components/Navigation"

const { width } = Dimensions.get("window")
const picture = {
  src: require("./../../../assets/img/yoga6.png"),
  width: 1140,
  height: 570,
}

export const assets = [picture.src]

/* === CSS === */
const CONTAINER: ViewStyle = { flex: 1, backgroundColor: color.background }
const IMAGE_LAYER: ViewStyle = {
  flex: 1,
  borderBottomRightRadius: borderRadius.xl,
  backgroundColor: color.background2,
  alignItems: "center",
  justifyContent: "flex-end",
}

/* === FIN CSS === */

export const WelcomeScreen = observer(function WelcomeScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <View style={CONTAINER}>
      <View style={IMAGE_LAYER}>
        <Image
          source={picture.src}
          style={{
            width: width - borderRadius.xl,
            height: ((width - borderRadius.xl) * picture.height) / picture.width,
          }}
        />
      </View>
      <View style={{ flex: 1, borderTopLeftRadius: borderRadius.xl }}>
        <View
          style={{
            backgroundColor: color.background2,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: color.background,
            borderTopLeftRadius: borderRadius.xl,
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: spacing.xl,
          }}
        >
          <Text preset="title2">Let's get started</Text>
          <Text preset="body" style={{ textAlign: "center" }}>
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            preset="primary"
            text="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button text="Join us, it's Free" onPress={() => navigation.navigate("SignUp")} />
          <BorderlessButton onPress={() => navigation.navigate("onBoarding")}>
            <Text preset="button" style={{ color: color.secondary }}>
              Forgot password?
            </Text>
          </BorderlessButton>
        </View>
      </View>
    </View>
  )
})
