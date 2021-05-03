import { Divider, Flex, Heading } from "@chakra-ui/react"
import { FC } from "react"

interface SectionDividerProps {
	sectionName: string
}

export const SectionDivider: FC<SectionDividerProps> = ({ sectionName }) => (
	<Flex align="center" px={{ base: "0", md: "8" }} mb={4}>
		<Divider />
		<Heading
			px={6}
			py={12}
			fontWeight="hairline"
			fontFamily="mono"
			fontSize="5xl"
		>
			{sectionName}
		</Heading>
		<Divider />
	</Flex>
)
