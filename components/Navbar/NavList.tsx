import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import { HTMLMotionProps, motion, Variants } from "framer-motion"
import React from "react"

export type MotionListProps = HTMLChakraProps<"ul"> & HTMLMotionProps<"ul">
export const MotionList = motion<MotionListProps>(chakra.ul)

const variants: Variants = {
  init: {
    opacity: 0,
    y: -4,
    display: "none",
    transition: { duration: 0 },
  },
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: {
      duration: 0.15,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.1 },
    transitionEnd: {
      display: "none",
    },
  },
}

export const NavList = (props: MotionListProps): JSX.Element => (
  <MotionList initial="init" opacity="0" variants={variants} {...props} />
)
