import { Link, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

type Ref = HTMLAnchorElement
type Props = HTMLChakraProps<"a">

export const NavLink = React.forwardRef<Ref, Props>((props, ref) => {
	return (
		<Link
			_hover={{
				borderColor: "currentcolor",
				color: useColorModeValue("teal.600", "teal.200"),
			}}
			alignItems="center"
			borderBottom="2px"
			borderColor="transparent"
			display="flex"
			fontWeight="medium"
			justifyContent="center"
			pointerEvents="all"
			transition="all 0.2s"
			{...props}
			ref={ref}
		/>
	)
})
