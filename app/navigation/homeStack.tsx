import React, { useEffect } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { useRoute, useNavigation } from "@react-navigation/native"

import { Home } from "../screens/Home/HomeScreen/homeScreen"
import Section from "../screens/Home/HomeScreen/sectionScreen"
import VideoScreen from "../screens/Home/HomeScreen/videoScreen"

import { getActiveRouteName } from "./navigation-utilities"

const Stack = createStackNavigator()

export default function HomeStack() {
  const route = useRoute()
  const navigation = useNavigation()

  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({ tabBarVisible: false })
  // } else {
  //   navigation.setOptions({ tabBarVisible: true })
  // }

  // const test = getActiveRouteName(route.state)
  // console.log(`TTTTTTTTTT ----> ${test}`)

  function CardFullScreenStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Section" component={Section} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Section" component={Section} />
      <Stack.Screen name="Video" component={VideoScreen} />
    </Stack.Navigator>
  )
}
