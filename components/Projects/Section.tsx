import { Box, Heading } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import Block from "../Block"

interface SectionProps {
	children: ReactNode
	section: string | Block
}

export const Section: FC<SectionProps> = ({ children, section }) => {
	return (
		<Box as="section">
			<Heading size="2xl" mb={4}>
				{section}
			</Heading>
			{children}
		</Box>
	)
}
