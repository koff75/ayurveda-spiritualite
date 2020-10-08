/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { WelcomeScreen, DemoScreen, OnboardingScreen } from "../screens"
/* Authentification */
import Onboarding from "../screens/Authentication/Onboarding"
import Welcome from "../screens/Authentication/Welcome"
import Login from "../screens/Authentication/Login"
import SignUp from "../screens/Authentication/SignUp"
import ForgotPassword from "../screens/Authentication/ForgotPassword"
import PasswordChanged from "../screens/Authentication/PasswordChanged"
/* Home screens */
import OutfitIdeas from "../screens/Home/OutfitIdeas"
import FavoriteOutfits from "../screens/Home/FavoriteOutfits"
import TransactionHistory from "../screens/Home/TransactionHistory"
import EditProfile from "../screens/Home/EditProfile"
/* Final home screens */
import { Home } from "../screens/Home/HomeScreen/homeScreen"
import HomeStack from "./homeStack"
import Courses from "../screens/Home/Courses/coursesScreen"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  /* Authentification */
  Onboarding: undefined
  Welcome: undefined
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
  PasswordChanged: undefined
  /* Home */
  OutfitIdeas: undefined
  FavoriteOutfits: undefined
  TransactionHistory: undefined
  EditProfile: undefined
  /* New Main */
  Home: undefined
  Courses: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

const Tab = createBottomTabNavigator<PrimaryParamList>()

/* Main navigator */
export function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "ios-information-circle" : "ios-information-circle-outline"
          } else if (route.name === "FavoriteOutfits") {
            iconName = focused ? "ios-list-box" : "ios-list"
          } else if (route.name === "TransactionHistory") {
            iconName = focused ? "ios-list-box" : "ios-list"
          } else if (route.name === "EditProfile") {
            iconName = focused ? "ios-list-box" : "ios-list"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
      <Tab.Screen name="TransactionHistory" component={TransactionHistory} />
      <Tab.Screen name="EditProfile" component={EditProfile} />
    </Tab.Navigator>
  )
}

/* Authentification navigator */
export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["OnBoarding"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
