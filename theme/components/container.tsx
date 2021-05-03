import { mode } from "@chakra-ui/theme-tools"

export default {
	baseStyle: props => ({
		py: { base: 6, md: 8, lg: 12 },
		px: { base: 8, md: 24 },
		borderRadius: "xl",
		boxShadow: "xl",
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		background: mode("white", "gray.800")(props),
	}),
	variants: {
		secondary: {
			background: "transparent",
			borderRadius: "0",
			boxShadow: "0",
			my: 10,
			py: { base: 2, md: 3, lg: 4 },
			transition: "background-color 0.2s ease",
		},
	},
}
