import React from "react"
import { Box } from "../../../components/base-components"
import { Dimensions, TouchableOpacity } from "react-native"
import { Video } from "expo-av"
import { Ionicons } from "@expo/vector-icons"

import { Container, CloseView } from "./stylesSection"

let { width } = Dimensions.get("window")

export default function VideoScreen({ navigation }) {
  return (
    <Box flex={1} backgroundColor="black" alignItems="center" justifyContent="center">
      <Video
        source={{
          uri:
            "https://player.vimeo.com/external/281472837.hd.mp4?s=c78b611b5055e373c69b6dd7674e2051128bc7b8&profile_id=175",
        }}
        shouldPlay
        useNativeControls={true}
        resizeMode="cover"
        style={{ width: width, height: 210 }}
      />
      <Box position="absolute" style={{ top: 0, right: 12 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={{ padding: 20 }}
        >
          <Ionicons name="ios-close" size={44} color="white" />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
