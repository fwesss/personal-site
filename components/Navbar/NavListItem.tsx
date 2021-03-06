import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import { HTMLMotionProps, motion, Variants } from "framer-motion"
import * as React from "react"

export type MotionListItemProps = HTMLChakraProps<"li"> & HTMLMotionProps<"li">
export const MotionListItem = motion<MotionListItemProps>(chakra.li)

const variants: Variants = {
  exit: {
    opacity: 0,
    y: 4,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export const NavListItem = (props: MotionListItemProps): JSX.Element => (
  <MotionListItem variants={variants} {...props} />
)
