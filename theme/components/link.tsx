export default {
	baseStyle: {
		transition: "all 0.2s",
	},
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
		nonButton({ colorMode }) {
			return {
				_hover: {
					color: colorMode === "dark" ? "teal.200" : "teal.600",
					textDecoration: "none",
				},
			}
		},
	},
}
