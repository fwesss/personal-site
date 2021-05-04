import { Center, Heading } from "@chakra-ui/react"
import { FC } from "react"

interface SectionDividerProps {
	sectionName: string
}

export const SectionDivider: FC<SectionDividerProps> = ({ sectionName }) => (
	<Center mb={4}>
		<Heading
			px={6}
			py={12}
			fontWeight="hairline"
			fontFamily="mono"
			fontSize="5xl"
		>
			{sectionName}
		</Heading>
	</Center>
)
