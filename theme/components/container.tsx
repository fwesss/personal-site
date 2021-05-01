import { mode } from "@chakra-ui/theme-tools"

export default {
	baseStyle: props => ({
		py: { base: 6, md: 8, lg: 12 },
		px: { base: 8, md: 24 },
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		background: mode("white", "gray.800")(props),
	}),
}
