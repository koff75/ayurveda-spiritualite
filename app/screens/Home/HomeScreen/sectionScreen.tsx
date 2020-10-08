/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React, { useEffect } from "react"
import { Box, Text } from "../../../components/base-components"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar, Linking, Image } from "react-native"
import Markdown from "react-native-showdown"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { PlayIcon } from "../../../components/base2-components/Icons"

function Section() {
  const navigation = useNavigation()
  const route = useRoute()
  // Le param inséré dans la nav Home pour indiquer quelle Card est sélectionnée
  const section = route.params.section

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true)

    return StatusBar.setBarStyle("dark-content", true)
  }, [])

  return (
    <>
      <ScrollView style={{ backgroundColor: "#FFFF", flex: 1 }}>
        <Box backgroundColor="background" flex={1}>
          <Box height={375}>
            <Image
              source={section.image}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
            <Box
              position="absolute"
              style={{ top: "50%", left: "50%", marginTop: -40, marginLeft: -40 }}
            >
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  navigation.navigate("Video")
                }}
              >
                <Box
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PlayIcon style={{ marginLeft: -10 }} />
                </Box>
              </TouchableOpacity>
            </Box>
            <Box
              style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: 20,
              }}
            >
              <Image source={section.logo} style={{ width: 24, height: 24 }} />
              <Text
                variant="button"
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginLeft: 5,
                  textTransform: "uppercase",
                }}
              >
                {section.subtitle}
              </Text>
            </Box>
            <Text
              variant="title2"
              style={{ color: "#FFFF", width: 170, position: "absolute", top: 88, left: 20 }}
            >
              {section.title}
            </Text>
            <Text
              variant="body"
              style={{ color: "#FFFF", position: "absolute", bottom: 20, left: 20, width: 300 }}
            >
              {section.caption}
            </Text>
          </Box>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#FFFF",
              borderRadius: 16,
              shadowColor: "rgba(0, 0, 0, 0.15)",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 10,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 20,
              right: 20,
            }}
          >
            <Ionicons name="ios-close" size={36} color="#4775f2" style={{ marginTop: -2 }} />
          </TouchableOpacity>
          <Box style={{ height: 1100, padding: 20 }}>
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
              onNavigationStateChange={(event) => {
                if (event.url != "about:blank") {
                  Linking.openURL(event.url)
                }
              }}
            />
          </Box>
        </Box>
      </ScrollView>
      <StatusBar hidden />
    </>
  )
}

export default Section

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 20px;
    }
  
    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    code {
      color: white;
    }
`
