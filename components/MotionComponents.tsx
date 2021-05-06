import React, { FC } from "react"
import { HTMLChakraProps, Container, Box } from "@chakra-ui/react"
import { motion, HTMLMotionProps } from "framer-motion"

type Merge<P, T> = Omit<P, keyof T> & T
type MotionContainerProps = Merge<
	HTMLChakraProps<"div">,
	HTMLMotionProps<"div">
>

const MotionContainer: FC<MotionContainerProps> = motion(Container)

export const FadeContainer: FC<MotionContainerProps> = ({
	children,
	...rest
}) => (
	<MotionContainer
		exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.3 }}
		{...rest}
	>
		{children}
	</MotionContainer>
)

type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>
const MotionBox: FC<MotionBoxProps> = motion(Box)

export const FadeBox: FC<MotionBoxProps> = ({ children, ...rest }) => (
	<MotionBox
		exit={{ opacity: 0 }}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.3 }}
		{...rest}
	>
		{children}
	</MotionBox>
)
