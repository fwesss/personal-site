import { IconButton, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import * as React from "react"

const ColorModeButton = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			onClick={toggleColorMode}
			aria-label="Color mode toggle"
			icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
			variant="ghost"
			isRound
			pointerEvents="all"
		/>
	)
}

export default ColorModeButton
