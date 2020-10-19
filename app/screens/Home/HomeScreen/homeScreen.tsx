/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import {
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Easing,
  Animated,
  Alert,
} from "react-native"
// import Animated, { Easing } from "react-native-reanimated"
// import { useDispatch, useSelector } from "react-redux"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"

import { useNavigation } from "@react-navigation/native"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

import { Box, Header, Text } from "../../../components/base-components"

import Card from "../../../components/base2-components/Card"
import Course from "../../../components/base2-components/Course"
import { Menu } from "../../../components/base2-components/Menu"
import { Notifications } from "../../../components/base2-components/Notifications"
import Logo from "../../../components/base2-components/Logo"
import Avatar from "../../../components/base2-components/Avatar"
import logos from "../../../../data/logos"
import courses from "../../../../data/courses"

import ModalLogin from "../../../components/base2-components/ModalLogin"
import { NotificationButton } from "../../../components/base2-components/NotificationButton"
import { storiesOf } from "@storybook/react-native"
import { position } from "@shopify/restyle"

import ContentLoader, { Rect, Circle } from "react-content-loader/native"

const CardsQuery = gql`
  {
    meditateCourseCollection {
      items {
        title
        description
        subtitle
        cover {
          url
          size
          width
          height
          contentType
        }
        author {
          name
          photo {
            url
            size
            width
            height
          }
        }
        lessonsCollection {
          items {
            title
            duration
            permission
            videoLink
          }
        }
      }
    }
  }
`

const { width, height } = Dimensions.get("window")

export const Home = observer(function Home() {
  const [scale, setScale] = useState(new Animated.Value(1))
  const [opacity, setOpacity] = useState(new Animated.Value(1))

  const navigation = useNavigation()
  const { userStore } = useStores()

  //   const dispatch = useDispatch()
  //   const action = useSelector((state) => state.app.action)
  //   const name = store.getState().app.name

  // Fetch Contentful API
  const { loading, error, data } = useQuery(CardsQuery)
  const MyLoader = () => {
    return (
      <Box padding="m">
        <ContentLoader
          speed={2}
          width={300}
          height={280}
          viewBox="0 0 335 280"
          backgroundColor="#ded9d9"
          foregroundColor="#aaa7a7"
        >
          <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
          <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <Rect x="0" y="62" rx="3" ry="3" width="410" height="6" />
          <Rect x="0" y="85" rx="3" ry="3" width="380" height="6" />
          <Rect x="0" y="110" rx="3" ry="3" width="335" height="280" />
          <Circle cx="20" cy="20" r="20" />
        </ContentLoader>
      </Box>
    )
  }
  if (error) return Alert.alert("Check your network...")
  //if (!data) return Alert.alert("Content not found!")

  function handleOpenMenu() {
    userStore.setAction("openMenu")
  }

  function handleOpenLogin() {
    userStore.setAction("openLogin")
  }

  useEffect(() => {
    if (Platform.OS === "android") StatusBar.setHidden(false)
  }, [])

  useEffect(() => {
    console.log(`Passage Home useEffect : ${userStore.user.action}`)
    if (userStore.user.action === "openMenu") {
      console.log("H action: openMenu")

      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }).start()

      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start()

      StatusBar.setBarStyle("light-content", true)
    }

    if (userStore.user.action === "closeMenu") {
      console.log("H action: CloseMenu")

      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }).start()
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start()

      StatusBar.setBarStyle("dark-content", true)
    }
  }, [userStore.user.action])

  function handleAvatar() {
    if (userStore.user) {
      userStore.setAction("openMenu")
    } else {
      userStore.setAction("openLogin")
    }
  }

  function openNotif() {
    userStore.setAction("openNotif")
  }

  return (
    <Box flex={1} backgroundColor="black">
      <Menu />
      <Notifications />
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: scale }],
            opacity: opacity,
          },
        ]}
      >
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: 30 }}>
            {/* TITRE + CLOCHE NOTIF */}
            <Box width={width} style={{ marginTop: 40, paddingLeft: 80 }}>
              <TouchableOpacity
                onPress={handleAvatar}
                style={{ marginLeft: 20, position: "absolute", top: 0, left: 0 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Text variant="body" style={{ color: "#b8bece" }}>
                Welcome back,
              </Text>
              <Text variant="title23" color="darkBlue">
                Nicolas Barthere
              </Text>
              <TouchableOpacity
                onPress={openNotif}
                style={{ position: "absolute", right: 20, top: 0 }}
              >
                <NotificationButton />
              </TouchableOpacity>
            </Box>
            {/* SLIDER HORIZ 'Framer X, Figma...' */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", padding: 20, paddingLeft: 12, paddingTop: 30 }}
            >
              {logos.map((item, index) => (
                <Logo key={index} image={item.image} text={item.text} />
              ))}
            </ScrollView>
            {/* SLIDER HORIZ '1st Card Continue learning' */}
            <Text
              variant="button"
              marginLeft="ml"
              marginTop="ml"
              textTransform="uppercase"
              style={{ color: "#b8b3ce" }}
            >
              Continue Learning
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingBottom: 0 }}
            >
              <Box flexDirection="row" style={{ paddingLeft: 5 }}>
                {loading && MyLoader()}
                {loading && MyLoader()}

                {data &&
                  data.meditateCourseCollection.items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate("Section", {
                          section: item,
                        })
                      }
                    >
                      <Card
                        title={item.title}
                        caption={item.subtitle}
                        subtitle={item.author.name}
                        image={item.cover}
                        logo={item.author.photo}
                        author={item.author.name}
                      />
                    </TouchableOpacity>
                  ))}
              </Box>
            </ScrollView>
            {/* SLIDER VERT '2nd Cards popular' */}
            <Text
              variant="body"
              textTransform="uppercase"
              marginLeft="ml"
              marginTop="ml"
              marginBottom="s"
              style={{ color: "#b8b3ce" }}
            >
              Popular Courses
            </Text>
            <Box flexDirection="row" flexWrap="wrap" style={{ paddingLeft: 10 }}>
              {courses.map((item, index) => (
                <Course
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                  logo={item.logo}
                  caption={item.caption}
                  avatar={item.avatar}
                  author={item.author}
                />
              ))}
            </Box>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      <StatusBar />
    </Box>
  )
})

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
    backgroundColor: "#f0f3f5",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
})
