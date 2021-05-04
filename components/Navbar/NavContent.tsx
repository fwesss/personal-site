import { HStack, StackProps } from "@chakra-ui/react"
import * as React from "react"
import NextLink from "next/link"
import { FC } from "react"
import { NavLink } from "./NavLink"
import ColorModeButton from "../ColorModeButton"

const links = [
	{ label: "Projects", href: "/#projects" },
	{ label: "Contact", href: "/#contact" },
]

export const NavContent: FC<StackProps> = props => {
	return (
		<HStack spacing={8} align="stretch" {...props}>
			{links.map(link => (
				<NextLink href={link.href} key={link.href} passHref>
					<NavLink>{link.label}</NavLink>
				</NextLink>
			))}
			<ColorModeButton />
		</HStack>
	)
}
