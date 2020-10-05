import React from "react"
import { observer } from "mobx-react-lite"
import { Box, Text } from "../../base-components"
import { NotificationIcon } from "../Icons"

export const NotificationButton = observer(function NotificationButton() {
  return (
    <Box width={44} height={44} justifyContent="center" alignItems="center">
      <NotificationIcon color="#4775f2" />
      <Box
        width={18}
        height={18}
        justifyContent="center"
        alignItems="center"
        backgroundColor="darkBlue"
        position="absolute"
        top={0}
        right={5}
        borderRadius="m"
        borderColor="background"
        borderWidth={1.5}
      >
        <Text variant="button" color="background" fontSize={12}>
          3
        </Text>
      </Box>
    </Box>
  )
})
