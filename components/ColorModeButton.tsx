import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { FaMoon, FaSun } from "react-icons/fa"

const ColorModeButton = (): JSX.Element => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      icon={<SwitchIcon />}
      pointerEvents="all"
      variant="ghost"
      isRound
      onClick={toggleColorMode}
    />
  )
}

export default ColorModeButton
