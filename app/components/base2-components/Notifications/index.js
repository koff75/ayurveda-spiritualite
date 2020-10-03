import React, { useState, useEffect } from "react"
import {
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native"
import { Box, Text } from "../../base-components"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"

import { Ionicons } from "@expo/vector-icons"

import items from "../../../../data/notifications"

const { width, height } = Dimensions.get("window")
var cardWith = width - 40
if (width > 500) {
  cardWith = 460
}

export const Notifications = observer(function Notifications() {
  const { userStore } = useStores()

  const [translateY, setTranslateY] = useState(new Animated.Value(30))
  const [opacity, setOpacity] = useState(new Animated.Value(0))
  const [top, setTop] = useState(new Animated.Value(3000))

  useEffect(() => {
    if (userStore.user.action === "openNotif") {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(top, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ]).start()
    }

    if (userStore.user.action === "closeNotif") {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 30,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(top, {
          toValue: 3000,
          duration: 0,
          useNativeDriver: false,
        }),
      ]).start()
    }
  }, [userStore.user.action])

  function closeNotif() {
    userStore.setAction("closeNotif")
  }

  return (
    <AnimatedContainer style={{ top: top }}>
      <TouchableOpacity
        onPress={closeNotif}
        style={{
          position: "absolute",
          top: 40,
          left: "50%",
          marginLeft: -22,
          zIndex: 100,
        }}
      >
        <Box
          width={44}
          height={44}
          borderRadius="l"
          backgroundColor="background"
          justifyContent="center"
          alignItems="center"
          margin="s"
          shadowOffset={{ width: 0, height: 5 }}
          shadowColor="background2"
          shadowOpacity={0.5}
          shadowRadius={10}
          elevation="ml"
        >
          <Ionicons name="ios-close" size={44} color="#546bfb" />
        </Box>
      </TouchableOpacity>
      <SafeAreaView>
        <ScrollView style={{ padding: 20 }}>
          <Box alignSelf="center" width={cardWith} paddingTop={50}>
            <Text variant="title3" textTransform="uppercase" color="darkGrey">
              New
            </Text>
            {items.map((item, index) => (
              <AnimatedItem
                key={index}
                style={{
                  opacity: opacity,
                  transform: [{ translateY: translateY }],
                }}
              >
                <Box flexDirection="row" alignItems="center">
                  <Image
                    source={{ uri: item.logo }}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                  />
                  <Text variant="title23" marginLeft={8}>
                    {item.title}
                  </Text>
                  <Box
                    backgroundColor="iconColor"
                    borderRadius={10}
                    flexDirection="row"
                    alignItems="center"
                    paddingVertical={0}
                    paddingHorizontal="s"
                    position="absolute"
                    top={0}
                    right={0}
                  >
                    <Text variant="header" textTransform="uppercase" fontWeight="600">
                      {item.date}
                    </Text>
                  </Box>
                </Box>
                <Text variant="body" marginTop={20}>
                  {item.text}
                </Text>
              </AnimatedItem>
            ))}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </AnimatedContainer>
  )
})

// Class needed for the createAnimatedComponent
class ItemBox extends React.Component {
  render() {
    return (
      <Box
        width={width}
        padding={20}
        backgroundColor="background"
        borderRadius={10}
        marginTop={20}
        shadowOffset={{ width: 0, height: 5 }}
        shadowColor="background2"
        shadowOpacity={0.5}
        shadowRadius={10}
      />
    )
  }
}

class ContainerBox extends React.Component {
  render() {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        width={width}
        height={height}
        zIndex={100}
        backgroundColor="darkWhite"
      />
    )
  }
}

const AnimatedItem = Animated.createAnimatedComponent(ItemBox)
const AnimatedContainer = Animated.createAnimatedComponent(ContainerBox)
