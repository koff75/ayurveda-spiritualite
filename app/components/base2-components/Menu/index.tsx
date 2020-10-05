/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from "react"
import { Animated, Dimensions, Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"
import { Box, Text } from "../../base-components"
import { logout } from "../../base-components/Firebase"

import MenuItem from "../MenuItem"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"

const { height, width } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  position: "absolute",
  backgroundColor: "#FFFF",
  width: width,
  height: height,
  zIndex: 100,
  borderRadius: 10,
  overflow: "hidden",
}
/*
  Item from the user name, subtitle and the close icon
  Then, we loop on item array to pass the props into MenuItem for Accout, Billing...
*/
export const Menu = observer(function Menu() {
  const { colors } = useTheme()
  const [top, setTop] = useState(new Animated.Value(height))
  const { userStore } = useStores()

  useEffect(() => {
    console.log(`Passage Menu useEffect : ${userStore.user.action}`)
    if (userStore.user.action === "openMenu") {
      console.log("M action: openMenu")
      Animated.spring(top, {
        toValue: 54,
        useNativeDriver: false,
      }).start()
    }

    if (userStore.user.action === "closeMenu") {
      console.log("M action: closeMenu")
      Animated.spring(top, {
        toValue: height,
        useNativeDriver: false,
      }).start()
    }
  }, [userStore.user.action])

  function handleCloseMenu() {
    userStore.setAction("closeMenu")
  }

  /* Popup menu with account, billing, learn, log out */
  const handleMenu = async (index) => {
    // I need to add the other index
    if (index === 1) {
      console.log(`Button pressed : ${userStore.user.action}`)
      userStore.setAction("openMenu")
    }
    if (index === 3) {
      console.tron.log("Menu component: logging out...")
      try {
        logout()
        userStore.setAction("closeMenu")
        userStore.reset()
      } catch (e) {
        console.tron.error(e.message)
      }
    }
  }

  return (
    <Animated.View style={[{ top: top }, CONTAINER]}>
      <Box height={142} justifyContent="center" alignItems="center">
        <Image
          source={require("../../../../assets/img/background2.jpg")}
          style={{ ...StyleSheet.absoluteFillObject, width, height }}
        />
        <Text variant="title2" color="background">
          Nicolas Barthere
        </Text>
        <Text variant="title3" color="subtitle" marginTop="s">
          Apprenti Yogi 1
        </Text>
      </Box>
      <TouchableOpacity
        onPress={handleCloseMenu}
        style={{
          position: "absolute",
          top: 120,
          left: width / 2,
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <Box
          width={44}
          height={44}
          borderRadius="l"
          backgroundColor="background"
          alignItems="center"
          alignContent="center"
          alignSelf="center"
          style={{
            shadowColor: colors.primary,
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
          }}
        >
          <Ionicons name="ios-close" size={44} color={colors.primary} />
        </Box>
      </TouchableOpacity>

      <Box height={height} backgroundColor="background" padding="xl">
        {items.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleMenu(index)}>
            <MenuItem title={item.title} text={item.text} icon={item.icon} />
          </TouchableOpacity>
        ))}
      </Box>
    </Animated.View>
  )
})

const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings",
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments",
  },
  {
    icon: "ios-compass",
    title: "Learning",
    text: "start course",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
]
