import React from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import { Button, Text } from "../../components"

// import { Button } from "../../components"
const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 44,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
  },
})

interface SubSlideProps {
  subtitle: string
  description: string
  last?: boolean
  onPress: () => void
}

/* 
  Subtitle : (bold) Find your Outils
  Description : (normal) Confused about your outfit? Don't worry!...
  Button : (color changed) Next -> Get Started
*/
export function Subslide({ subtitle, description, last, onPress }: SubSlideProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle} text={subtitle} preset="bold" />
      <Text style={styles.description} text={description} preset="default" />
      <Button
        preset="primart"
        text={last ? "Let's get started" : "Next"}
        style={
          last ? { backgroundColor: "#2CB9B0" } : { backgroundColor: "rgba(12, 13, 52, 0.05)" }
        }
        textStyle={last ? { color: "white" } : { color: "#44424a" }}
        {...{ onPress }}
      ></Button>
    </View>
  )
}
