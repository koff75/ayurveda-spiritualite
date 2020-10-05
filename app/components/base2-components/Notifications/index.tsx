/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react"
import {
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native"
import { Box, Text } from "../../base-components"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"

import { Ionicons } from "@expo/vector-icons"

import items from "../../../../data/notifications"
import { withBouncing } from "react-native-redash"

const { width, height } = Dimensions.get("window")
let cardWith = width - 40
if (width > 500) {
  cardWith = 460
}

export const Notifications = observer(function Notifications() {
  const { userStore } = useStores()

  const [translateY, setTranslateY] = useState(new Animated.Value(30))
  const [opacity, setOpacity] = useState(new Animated.Value(0))
  const [top, setTop] = useState(new Animated.Value(3000))

  useEffect(() => {
    console.log(`Passage Notif useEffect : ${userStore.user.action}`)
    if (userStore.user.action === "openNotif") {
      console.log("Notification file Open")
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
      console.log("Notification file Close")
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
    <Animated.View style={[styles.container, { top: top }]}>
      <TouchableOpacity
        onPress={closeNotif}
        style={{
          position: "absolute",
          top: 40,
          left: width / 2,
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
          shadowColor="darkGrey"
          shadowOpacity={0.3}
          shadowRadius={6}
          elevation={10}
        >
          <Ionicons name="ios-close" size={44} color="#546bfb" />
        </Box>
      </TouchableOpacity>
      <SafeAreaView>
        <ScrollView style={{ padding: 20 }}>
          <Box width={cardWith} style={{ paddingTop: 50, paddingBottom: 40 }}>
            <Text variant="title3" textTransform="uppercase" color="darkGrey">
              New
            </Text>
            {items.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.item,
                  {
                    opacity: opacity,
                    transform: [{ translateY: translateY }],
                  },
                ]}
              >
                <Box flexDirection="row" alignItems="center">
                  <Image
                    source={{ uri: item.logo }}
                    resizeMode="contain"
                    style={{ width: 24, height: 24 }}
                  />
                  <Text variant="title23" marginLeft="s">
                    {item.title}
                  </Text>
                  <Box
                    backgroundColor="iconColor"
                    borderRadius="m"
                    flexDirection="row"
                    alignItems="center"
                    paddingVertical="null"
                    paddingHorizontal="s"
                    position="absolute"
                    top={0}
                    right={0}
                  >
                    <Text
                      variant="header"
                      textTransform="uppercase"
                      fontWeight="600"
                      color="background"
                    >
                      {item.date}
                    </Text>
                  </Box>
                </Box>
                <Text variant="body" marginTop="ml">
                  {item.text}
                </Text>
              </Animated.View>
            ))}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    backgroundColor: "#f0f3f5",
    bottom: 0,
    height: height,
    left: 0,
    position: "absolute",
    top: 0,
    width: width,
    zIndex: 100,
  },
  // eslint-disable-next-line react-native/no-color-literals
  item: {
    backgroundColor: "#FFFF",
    borderRadius: 10,
    elevation: 10,
    marginTop: 20,
    padding: 20,

    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    width: cardWith,
  },
})

/* DELETE !!!! */
// Class needed for the createAnimatedComponent
class ItemBox extends React.Component {
  render() {
    return (
      <Box
        width={width}
        padding="ml"
        backgroundColor="background"
        borderRadius="m"
        marginTop="ml"
        shadowOffset={{ width: 0, height: 5 }}
        shadowColor="background2"
        shadowOpacity={0.5}
        shadowRadius={10}
      />
    )
  }
}
/* DELETE !!!! */
class ContainerBox extends React.Component {
  render() {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        width={width}
        height={height}
        zIndex={100}
        backgroundColor="darkWhite"
      />
    )
  }
}
/* DELETE !!!! */
const AnimatedItem = Animated.createAnimatedComponent(ItemBox)
const AnimatedContainer = Animated.createAnimatedComponent(ContainerBox)
