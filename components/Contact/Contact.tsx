import { Box, Button, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react"
import { FC } from "react"
import * as React from "react"
import {
	AiOutlineLinkedin,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineGithub,
} from "react-icons/ai"
import { IoLocationOutline } from "react-icons/io5"

import { SectionDivider } from "../SectionDivider"

interface ContactProps {
	sectionName: string
}

export const Contact: FC<ContactProps> = ({ sectionName }) => (
	<Box id={sectionName.toLowerCase()}>
		<SectionDivider sectionName={sectionName} />

		<VStack mb={8} spacing={6}>
			<VStack align="flex-start" spacing={4}>
				<Button
					aria-label="Email Wes Feller"
					as={Link}
					colorScheme="teal"
					href="mailto:wes@wesfeller.dev"
					leftIcon={<AiOutlineMail />}
					size="lg"
					variant="link"
					isExternal
				>
					wes@wesfeller.dev
				</Button>
				<Button
					aria-label="Call Wes Feller"
					as={Link}
					colorScheme="teal"
					href="tel:19095537529"
					leftIcon={<AiOutlinePhone />}
					size="lg"
					variant="link"
					isExternal
				>
					(909) 553-7529
				</Button>
			</VStack>

			<HStack justifyContent="center" w="60vw">
				<Link
					href="https://github.com/fwesss/"
					title="Github"
					variant="nonButton"
					isExternal
				>
					<Icon as={AiOutlineGithub} boxSize="2rem" />
				</Link>

				<Link
					href="https://www.linkedin.com/in/westley-feller/"
					title="Linkedin"
					variant="nonButton"
					isExternal
				>
					<Icon as={AiOutlineLinkedin} boxSize="2rem" />
				</Link>
			</HStack>

			<HStack>
				<IoLocationOutline size="2rem" />
				<Text>California</Text>
			</HStack>
		</VStack>
	</Box>
)
