import React from "react"
import { StyleSheet, View, Text, Dimensions } from "react-native"
// import { Text } from "../../components"
import { Button } from "../../components"

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
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 12,
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

export function Subslide({ subtitle, description, last, onPress }: SubSlideProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        preset="slider"
        text={last ? "Let's get started" : "Next"}
        style={
          last ? { backgroundColor: "#2CB9B0" } : { backgroundColor: "rgba(12, 13, 52, 0.05)" }
        }
        textStyle={last ? { color: "white" } : { color: "#0C0D34" }}
        {...{ onPress }}
      ></Button>
    </View>
  )
}
