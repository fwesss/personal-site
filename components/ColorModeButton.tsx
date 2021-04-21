import { IconButton, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

const ColorModeButton = (): JSX.Element => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			onClick={toggleColorMode}
			aria-label="Color mode toggle"
			icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
			variant="ghost"
			isRound
		/>
	)
}

export default ColorModeButton
