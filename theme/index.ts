// theme.js
import { extendTheme } from "@chakra-ui/react"
// Global style overrides
import styles from "./styles"

const overrides = {
	...styles,
	config: {
		useSystemColorMode: true,
	},
}
export default extendTheme(overrides)
