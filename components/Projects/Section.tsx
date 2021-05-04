import { Box, Heading } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import Block from "../Block"

interface SectionProps {
	children: ReactNode
	section: string | Block
}

export const Section: FC<SectionProps> = ({ children, section }) => {
	return (
		<Box
			w={{
				base: "clamp(30ch, 100%, 40ch)",
				sm: "clamp(45ch, 100%, 75ch)",
			}}
			as="section"
		>
			<Heading size="2xl" mb={4}>
				{section}
			</Heading>
			{children}
		</Box>
	)
}
