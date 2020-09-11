import React from "react"
import { StyleSheet, View, Text } from "react-native"
// import { Text } from "../../components"
import { Button } from "../../components"

// import { Button } from "../../components"

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 44,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#0C0D34",
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 30,
    marginBottom: 12,
    color: "#0C0D34",
    textAlign: "center",
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
        preset={last ? "slider" : "slider"}
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
