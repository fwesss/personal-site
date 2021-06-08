import { Link, useColorModeValue } from "@chakra-ui/react"
import type { HTMLChakraProps } from "@chakra-ui/react"
import * as React from "react"

type Ref = HTMLAnchorElement
type Props = HTMLChakraProps<"a">

const MobileNavLink = React.forwardRef<Ref, Props>((props, ref) => {
  return (
    <Link
      _hover={{
        bg: "blackAlpha.200",
      }}
      color="white"
      display="block"
      fontSize="lg"
      fontWeight="bold"
      pointerEvents="all"
      py="5"
      textAlign="center"
      w="full"
      {...props}
      ref={ref}
    />
  )
})

const DesktopNavLink = React.forwardRef<Ref, Props>((props, ref) => {
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

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
}
