import { extendTheme } from "@chakra-ui/react"
import Link from "./components/link"
// Global style overrides
import styles from "./styles"

const overrides = {
	...styles,
	components: {
		Link,
	},
}
export default extendTheme(overrides)
