import { extendTheme } from "@chakra-ui/react"

import Container from "./components/container"
import Heading from "./components/heading"
import Link from "./components/link"
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
