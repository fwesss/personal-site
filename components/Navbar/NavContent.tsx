import {
	Box,
	BoxProps,
	Center,
	HStack,
	Stack,
	StackDivider,
	StackProps,
	useDisclosure,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import * as React from "react"
import { HiOutlineMenu, HiX } from "react-icons/hi"
import NextLink from "next/link"
import { NavLink } from "./NavLink"
import { NavItemTransition, NavListTransition } from "./Transition"
import ColorModeButton from "../ColorModeButton"

const links = [
	{ label: "Projects", href: "/#projects" },
	{ label: "Contact", href: "/#contact" },
]

const MobileNavContent = (props: BoxProps) => {
	const { isOpen, onToggle } = useDisclosure()
	return (
		<Box {...props}>
			<Center
				as="button"
				p="2"
				fontSize="2xl"
				onClick={onToggle}
				pointerEvents="all"
			>
				{isOpen ? <HiX /> : <HiOutlineMenu />}
			</Center>
			<NavListTransition
				pos="absolute"
				insetX="0"
				bg={mode("teal.300", "teal.600")}
				zIndex="1"
				top="64px"
				animate={isOpen ? "enter" : "exit"}
			>
				<Stack spacing="0" divider={<StackDivider />}>
					{links.map(link => (
						<NavItemTransition key={link.href}>
							<NavLink.Mobile href={link.href}>{link.label}</NavLink.Mobile>
						</NavItemTransition>
					))}
					<NavItemTransition
						style={{
							flex: "1",
							display: "flex",
							justifyContent: "center",
							margin: "0.5rem auto",
						}}
					>
						<ColorModeButton />
					</NavItemTransition>
				</Stack>
			</NavListTransition>
		</Box>
	)
}

const DesktopNavContent = (props: StackProps) => {
	return (
		<HStack spacing={8} align="stretch" {...props}>
			{links.map(link => (
				<NextLink href={link.href} key={link.href} passHref>
					<NavLink.Desktop>{link.label}</NavLink.Desktop>
				</NextLink>
			))}
			<ColorModeButton />
		</HStack>
	)
}

export const NavContent = {
	Mobile: MobileNavContent,
	Desktop: DesktopNavContent,
}
