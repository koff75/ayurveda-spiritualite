import React, { ReactNode } from "react"
import { Dimensions, Image, StyleSheet, Platform } from "react-native"
import { SafeAreaInsetsContext, useSafeAreaInsets } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Constants from "expo-constants"

import { Box } from "./Theme"
export const assets = [
  require("./../../../assets/img/1.png"),
  require("./../../../assets/img/2.png"),
  require("./../../../assets/img/3.png"),
] as const
const { width, height: wHeight } = Dimensions.get("window")
const aspectRatio = 1023 / 1535
const height = width * aspectRatio

interface ContainerProps {
  children: ReactNode
  footer: ReactNode
  pattern: 0 | 1 | 2
}

/*
  FIX ME :
  Problème avec le safeArea bottom qui laisse un rectangle blanc en bas de l'écran
  J'ai multiplié par 2.6 la hauteur mais pour l'adapter à mon tél Android mais à tester...bof.
*/
// Before manifest android android:windowSoftInputMode="stateAlwaysHidden|adjustPan|adjustResize"
// after android:windowSoftInputMode="stateAlwaysHidden|adjustPan"

const Container = ({ children, footer, pattern }: ContainerProps) => {
  const insets = useSafeAreaInsets()
  const asset = assets[pattern]

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll
      extraScrollHeight={Platform.select({ android: 150 })} // Permet de scroller en fction du clavier
      enableOnAndroid={true}
      // extraHeight={Platform.select({ android: 200 })}
      // style={{ flexGrow: 1 }}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#ccc",
        minHeight: wHeight,
      }}
      automaticallyAdjustContentInsets={false}
    >
      <Box
        height={wHeight + (Platform.OS === "android" ? Constants.statusBarHeight * 2.6 : 0)}
        backgroundColor="secondary"
      >
        <Box backgroundColor="background">
          <Box overflow="hidden" height={height * 0.61}>
            <Image source={asset} style={{ width, height }} />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image
            source={asset}
            style={{ ...StyleSheet.absoluteFillObject, width, height, top: -height * 0.61 }}
          />
          <Box
            flex={1}
            borderRadius="xl"
            backgroundColor="background"
            justifyContent="center"
            padding="xl"
          >
            {children}
          </Box>
        </Box>
        <Box backgroundColor="secondary" paddingTop="m">
          {footer}
          <Box height={Math.max(insets.bottom, 16)} />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  )
}

export default Container
