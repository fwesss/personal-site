import {
	Link,
	HTMLChakraProps,
	useColorModeValue,
	useColorModeValue as mode,
} from "@chakra-ui/react"
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
				color: useColorModeValue("teal.600", "teal.200"),
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
			color={mode("gray.900", "gray.50")}
			display="block"
			textAlign="center"
			fontWeight="bold"
			py="5"
			fontSize="lg"
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
