export default {
	baseStyle: ({ colorMode }) => ({
		transition: "all 0.2s",
		_hover: {
			color: colorMode === "dark" ? "blue.200" : "blue.600",
		},
	}),
	variants: {
		heading: {
			display: "inline-flex",
			borderBottom: "2px",
			borderBottomColor: "transparent !important",
			_hover: {
				textDecoration: "none",
				borderBottomColor: "currentcolor !important",
			},
		},
	},
}
