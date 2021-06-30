import {
  HStack,
  Center,
  IconButton,
  Stack,
  useColorModeValue,
  StackDivider,
  ResponsiveValue,
} from "@chakra-ui/react"
import type { StackProps } from "@chakra-ui/react"
import NextLink from "next/link"
import * as React from "react"
import { FC } from "react"
import { HiOutlineMenu, HiX } from "react-icons/hi"

import ColorModeButton from "../ColorModeButton"
import ToggleMotionButton from "../ToggleMotionButton"

import { NavLink } from "./NavLink"
import { NavList } from "./NavList"
import { NavListItem } from "./NavListItem"

const links = [
  { label: "Projects", href: "/#projects" },
  { label: "Adventures", href: "/adventures" },
  { label: "Contact", href: "/#contact" },
]

const MobileNavContent = ({
  display,
  isOpen,
  onToggle,
}: {
  display: ResponsiveValue<string>
  isOpen: boolean
  onToggle: () => void
}): JSX.Element => {
  return (
    <HStack display={display}>
      <Center
        aria-label="Expand navigation"
        as={IconButton}
        color={useColorModeValue("gray.600", "gray.400")}
        fontSize="2xl"
        icon={isOpen ? <HiX /> : <HiOutlineMenu />}
        p="2"
        pointerEvents="all"
        variant="ghost"
        isRound
        onClick={onToggle}
      />
      <NavList
        animate={isOpen ? "enter" : "exit"}
        bg={useColorModeValue("teal.600", "teal.400")}
        insetX="0"
        marginInlineStart="0 !important"
        pos="absolute"
        top="64px"
      >
        <Stack
          divider={<StackDivider borderColor="whiteAlpha.200" />}
          spacing={0}
        >
          {links.map(link => (
            <NavListItem key={link.href}>
              <NextLink href={link.href} passHref>
                <NavLink.Mobile>{link.label}</NavLink.Mobile>
              </NextLink>
            </NavListItem>
          ))}
        </Stack>
      </NavList>
      <ToggleMotionButton />
      <ColorModeButton />
    </HStack>
  )
}

const DesktopNavContent: FC<StackProps> = props => {
  return (
    <HStack align="stretch" spacing={8} {...props}>
      {links.map(link => (
        <NextLink key={link.href} href={link.href} passHref>
          <NavLink.Desktop>{link.label}</NavLink.Desktop>
        </NextLink>
      ))}
      <ToggleMotionButton />
      <ColorModeButton />
    </HStack>
  )
}

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
}
