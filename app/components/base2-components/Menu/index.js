import React, { useState, useEffect, useCallback } from "react"
import { Animated, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@shopify/restyle"
import { Box, Header, Text } from "../../base-components"
import { logout } from "../../base-components/Firebase"

import {
  Cover,
  Image,
  Title,
  Subtitle,
  Content,
  CloseView,
  Touchable,
  styles,
  ButtonMenu,
} from "./styles"
import MenuItem from "../MenuItem"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
// import { useSelector, useDispatch } from "react-redux"
// import { store } from "../../store"

const { height, width } = Dimensions.get("window")

export const Menu = observer(function Menu() {
  const [top, setTop] = useState(new Animated.Value(height))

  // const action = useSelector((state) => state.app.action)
  const { userStore } = useStores()

  useEffect(() => {
    if (userStore.user.action === "openMenu") {
      Animated.spring(top, {
        toValue: 54,
        useNativeDriver: false,
      }).start()
    }

    if (userStore.user.action === "closeMenu") {
      Animated.spring(top, {
        toValue: height,
        useNativeDriver: false,
      }).start()
    }
  }, [userStore.user.action])

  function handleCloseMenu() {
    userStore.setAction("closeMenu")
  }

  // Disconnecting from Firebase !
  const handleMenu = async (index) => {
    if (index === 3) {
      console.tron.log("Menu component: logging out...")
      try {
        firebase.logout()
        userStore.setAction("closeMenu")
        userStore.reset()
      } catch (e) {
        console.tron.error(e.message)
      }
    }
  }

  return (
    <Animated.View style={[{ top: top }, styles.container]}>
      <Cover>
        <Image source={require("../../../assets/background2.jpg")} />
        <Title>Daniel Sousa</Title>
        <Subtitle>Designer at LearnCode</Subtitle>
      </Cover>
      <Touchable onPress={handleCloseMenu}>
        <CloseView>
          <Ionicons name="ios-close" size={44} color="#546bfb" />
        </CloseView>
      </Touchable>

      <Content>
        {items.map((item, index) => (
          <ButtonMenu key={index} onPress={() => handleMenu(index)}>
            <MenuItem title={item.title} text={item.text} icon={item.icon} />
          </ButtonMenu>
        ))}
      </Content>
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
    title: "Learn React",
    text: "start course",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
]
