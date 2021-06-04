import { Center, Heading } from "@chakra-ui/react"
import { FC } from "react"

interface SectionDividerProps {
  sectionName: string
}

export const SectionDivider: FC<SectionDividerProps> = ({ sectionName }) => (
  <Center mb={4}>
    <Heading
      fontFamily="mono"
      fontSize="5xl"
      fontWeight="hairline"
      px={6}
      py={12}
    >
      {sectionName}
    </Heading>
  </Center>
)
