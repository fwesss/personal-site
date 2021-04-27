import React, { FC } from "react"
import { HTMLChakraProps, Container } from "@chakra-ui/react"
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
		as="main"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ delay: 0.2 }}
		{...rest}
	>
		{children}
	</MotionContainer>
)