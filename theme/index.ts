// theme.js
import { extendTheme } from "@chakra-ui/react"
// Global style overrides
import styles from "./styles"

const overrides = {
	...styles,
}
export default extendTheme(overrides)
