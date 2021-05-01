import { extendTheme } from "@chakra-ui/react"
import Link from "./components/link"
import Container from "./components/container"
// Global style overrides
import styles from "./styles"

const overrides = {
	...styles,
	components: {
		Link,
		Container,
	},
}
export default extendTheme(overrides)
