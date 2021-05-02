import { extendTheme } from "@chakra-ui/react"
import Link from "./components/link"
import Container from "./components/container"
import Heading from "./components/heading"
// Global style overrides
import styles from "./styles"

const overrides = {
	...styles,
	components: {
		Link,
		Container,
		Heading,
	},
}
export default extendTheme(overrides)
