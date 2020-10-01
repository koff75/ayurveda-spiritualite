import React, { useEffect, useState } from "react"
import { StatusBar, StyleSheet, Platform, TouchableOpacity } from "react-native"
import Animated, { Easing } from "react-native-reanimated"
import { useDispatch, useSelector } from "react-redux"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"

import { useNavigation } from "@react-navigation/native"
// import gql from "graphql-tag"
// import { useQuery } from "@apollo/react-hooks"

import { Box, Header } from "../../../components/base-components"

import Card from "../../../components/base2-components/Card"
import Course from "../../../components/base2-components/Course"
import Menu from "../../../components/base2-components/Menu"
import Notifications from "../../../components/base2-components/Notifications"
import Logo from "../../../components/base2-components/Logo"
import Avatar from "../../../components/base2-components/Avatar"
import logos from "../../../../data/logos"
import courses from "../../../../data/courses"
// import {
//   TitleBar,
//   Title,
//   Name,
//   Subtitle,
//   ScrollContainer,
//   SaveAreaContainer,
//   ScrollLogo,
//   ScrollCards,
//   ButtonAvatar,
//   RootView,
//   ButtonCard,
//   CardsContainer,
//   CoursesContainer,
// } from "./styles"
// import { store } from "../../store"
import ModalLogin from "../../../components/base2-components/ModalLogin"
import NotificationButton from "../../../components/base2-components/NotificationButton"
import { storiesOf } from "@storybook/react-native"

// const CardsQuery = gql`
//   {
//     cardsCollection {
//       items {
//         title
//         subtitle
//         image {
//           title
//           description
//           contentType
//           fileName
//           size
//           url
//           width
//           height
//         }
//         subtitle
//         caption
//         logo {
//           title
//           description
//           contentType
//           fileName
//           size
//           url
//           width
//           height
//         }
//         content
//       }
//     }
//   }
// `

export const Home = observer(function Home() {
  const [scale, setScale] = useState(new Animated.Value(1))
  const [opacity, setOpacity] = useState(new Animated.Value(1))

  const navigation = useNavigation()
  const { userStore } = useStores()

  //   const dispatch = useDispatch()
  //   const action = useSelector((state) => state.app.action)
  //   const name = store.getState().app.name

  const { loading, error, data } = useQuery(CardsQuery)

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
    if (userStore.user.action === "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start()

      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start()

      StatusBar.setBarStyle("light-content", true)
    }

    if (userStore.user.action == "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
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
    if (userStore.user.name) {
      userStore.setAction("openMenu")
    } else {
      userStore.setAction("openLogin")
    }
  }

  function openNotif() {
    userStore.setAction("openNotif")
  }

  return (
    <Box flex={1} backgroundColor="background">
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
        <SaveAreaContainer>
          <ScrollContainer showsVerticalScrollIndicator={false}>
            {/* TITRE + CLOCHE NOTIF */}
            <TitleBar>
              <ButtonAvatar onPress={handleAvatar}>
                <Avatar />
              </ButtonAvatar>
              <Title>Welcome back,</Title>
              <Name>{name}</Name>
              <TouchableOpacity
                onPress={openNotif}
                style={{ position: "absolute", right: 20, top: 0 }}
              >
                <NotificationButton />
              </TouchableOpacity>
            </TitleBar>
            {/* SLIDER HORIZ 'Framer X, Figma...' */}
            <ScrollLogo horizontal showsHorizontalScrollIndicator={false}>
              {logos.map((item, index) => (
                <Logo key={index} image={item.image} text={item.text} />
              ))}
            </ScrollLogo>
            {/* SLIDER HORIZ '1st Card Continue learning' */}
            <Subtitle>Continue Learning</Subtitle>
            <ScrollCards horizontal showsHorizontalScrollIndicator={false}>
              <CardsContainer>
                {data &&
                  data.cardsCollection.items.map((item, index) => (
                    <ButtonCard
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
                        caption={item.caption}
                        subtitle={item.subtitle}
                        image={item.image}
                        logo={item.logo}
                        author={item.author}
                      />
                    </ButtonCard>
                  ))}
              </CardsContainer>
            </ScrollCards>
            {/* SLIDER VERT '2nd Cards popular' */}
            <Subtitle>Popular Courses</Subtitle>
            <CoursesContainer>
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
            </CoursesContainer>
          </ScrollContainer>
        </SaveAreaContainer>
      </Animated.View>
      <StatusBar />
      <ModalLogin />
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
