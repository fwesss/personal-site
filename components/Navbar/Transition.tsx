import type { HTMLChakraProps } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import { HTMLMotionProps, motion } from "framer-motion"
import * as React from "react"

type ListProps = HTMLChakraProps<"ul"> & HTMLMotionProps<"ul">

export const MotionList = motion(chakra.ul as React.ElementType<ListProps>)
