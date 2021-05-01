import { Link, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"

type Ref = HTMLAnchorElement
type Props = HTMLChakraProps<"a">

const DesktopNavLink = React.forwardRef<Ref, Props>((props, ref) => {
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
				color: useColorModeValue("blue.600", "blue.200"),
			}}
			pointerEvents="all"
			{...props}
			ref={ref}
		/>
	)
})

const MobileNavLink = React.forwardRef<Ref, Props>((props, ref) => {
	return (
		<Link
			display="block"
			textAlign="center"
			fontWeight="bold"
			py="5"
			fontSize="lg"
			color="white"
			w="full"
			_hover={{
				bg: "blackAlpha.200",
			}}
			pointerEvents="all"
			{...props}
			ref={ref}
		/>
	)
})

export const NavLink = {
	Mobile: MobileNavLink,
	Desktop: DesktopNavLink,
}
