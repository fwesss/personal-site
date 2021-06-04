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
      as="section"
      w={{
        base: "clamp(30ch, 100%, 40ch)",
        sm: "clamp(45ch, 100%, 75ch)",
      }}
    >
      <Heading mb={4} size="2xl">
        {section}
      </Heading>
      {children}
    </Box>
  )
}
