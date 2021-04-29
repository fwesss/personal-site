import {
	Box,
	BoxProps,
	Center,
	HStack,
	Stack,
	StackDivider,
	StackProps,
	useDisclosure,
} from "@chakra-ui/react"
import * as React from "react"
import { HiOutlineMenu, HiX } from "react-icons/hi"
import { NavLink } from "./NavLink"
import { NavItemTransition, NavListTransition } from "./Transition"
import ColorModeButton from "../ColorModeButton"

const links = [{ label: "Projects", href: "/#projects" }]

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
				bg="blue.600"
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
		<HStack spacing="4" align="stretch" {...props}>
			{links.map(link => (
				<NavLink.Desktop key={link.href} href={link.href}>
					{link.label}
				</NavLink.Desktop>
			))}
			<ColorModeButton />
		</HStack>
	)
}

export const NavContent = {
	Mobile: MobileNavContent,
	Desktop: DesktopNavContent,
}
