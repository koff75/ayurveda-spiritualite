/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react"
import { Dimensions, Image, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Box, Text } from "../../../components/base-components"

import CourseSection from "../../../components/base2-components/CourseSection"
import CoursesList from "../../../components/base2-components/CoursesList"

let { width } = Dimensions.get("window")

export default function Courses() {
  return (
    <Box backgroundColor="darkWhite">
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <Box backgroundColor="darkBlue" height={460}>
          <Image
            source={require("../../../../assets/img/background12.jpg")}
            style={{ position: "absolute", top: 0, left: 0, width: width, height: 460 }}
          />
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.5)"]}
            style={{ position: "absolute", width: width, height: 460 }}
          />
          <Image
            source={require("../../../../assets/img/logo-react.png")}
            style={{ width: 48, height: 48, marginTop: 50, marginLeft: 20, alignSelf: "center" }}
          />
          <Text
            variant="body"
            style={{ color: "#b8bece", textTransform: "uppercase", marginTop: 20, marginLeft: 20 }}
          >
            12 Sections
          </Text>
          <Text
            variant="title1"
            style={{ color: "#FFFF", marginTop: 4, marginLeft: 20, width: 220 }}
          >
            React Native for Designers
          </Text>
          <Box marginTop="ml" flexDirection="row">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ paddingVertical: 10, paddingHorizontal: 0 }}
            >
              {sections.map((section, index) => (
                <CourseSection
                  key={index}
                  title={section.title}
                  image={section.image}
                  progress={section.progress}
                />
              ))}
            </ScrollView>
          </Box>
          <Box
            style={{ flexDirection: "row", marginTop: 10, alignItems: "center", marginLeft: 20 }}
          >
            <Image
              source={require("../../../../assets/img/avatar.jpg")}
              style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: "#FFFF" }}
            />
            <Text variant="body" style={{ marginLeft: 8, color: "#b8bece" }}>
              Taught by Meng To
            </Text>
          </Box>
        </Box>
        <Text
          variant="title3"
          style={{
            color: "#b8bece",
            textTransform: "uppercase",
            marginTop: 20,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 20,
          }}
        >
          Latest Courses
        </Text>
        <CoursesList />
      </ScrollView>
    </Box>
  )
}

const sections = [
  {
    title: "React Native for Designers",
    progress: 0.2,
    image: require("../../../../assets/img/background1.jpg"),
  },
  {
    title: "Styled Components",
    progress: 0.3,
    image: require("../../../../assets/img/background2.jpg"),
  },
  {
    title: "Assets, Icons and SVG",
    progress: 0.9,
    image: require("../../../../assets/img/background3.jpg"),
  },
  {
    title: "Props and Data",
    progress: 0.5,
    image: require("../../../../assets/img/background4.jpg"),
  },
  {
    title: "States and Layout Animation",
    progress: 0.1,
    image: require("../../../../assets/img/background6.jpg"),
  },
]
