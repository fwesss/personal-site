import { HStack, StackProps } from "@chakra-ui/react"
import NextLink from "next/link"
import * as React from "react"
import { FC } from "react"

import ColorModeButton from "../ColorModeButton"

import { NavLink } from "./NavLink"

const links = [
	{ label: "Projects", href: "/#projects" },
	{ label: "Adventures", href: "/adventures" },
	{ label: "Contact", href: "/#contact" },
]

export const NavContent: FC<StackProps> = props => {
	return (
		<HStack align="stretch" spacing={8} {...props}>
			{links.map(link => (
				<NextLink key={link.href} href={link.href} passHref>
					<NavLink>{link.label}</NavLink>
				</NextLink>
			))}
			<ColorModeButton />
		</HStack>
	)
}
