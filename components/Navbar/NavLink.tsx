import { Link, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

type Ref = HTMLAnchorElement
type Props = HTMLChakraProps<"a">

export const NavLink = React.forwardRef<Ref, Props>((props, ref) => {
	return (
		<Link
			fontWeight="medium"
			display="flex"
			alignItems="center"
			justifyContent="center"
			borderBottom="2px"
			borderColor="transparent"
			transition="all 0.2s"
			_hover={{
				borderColor: "currentcolor",
				color: useColorModeValue("teal.600", "teal.200"),
			}}
			pointerEvents="all"
			{...props}
			ref={ref}
		/>
	)
})
