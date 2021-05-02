import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import * as React from "react"

const ColorModeButton = (): JSX.Element => {
	const { toggleColorMode } = useColorMode()
	const text = useColorModeValue("dark", "light")
	const SwitchIcon = useColorModeValue(FaMoon, FaSun)

	return (
		<IconButton
			onClick={toggleColorMode}
			aria-label={`Switch to ${text} mode`}
			icon={<SwitchIcon />}
			variant="ghost"
			isRound
			pointerEvents="all"
		/>
	)
}

export default ColorModeButton
