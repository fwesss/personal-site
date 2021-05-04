import { FC } from "react"
import { Box, Button, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react"
import {
	AiOutlineLinkedin,
	AiOutlineMail,
	AiOutlinePhone,
	AiOutlineGithub,
} from "react-icons/ai"
import * as React from "react"
import { IoLocationOutline } from "react-icons/io5"
import { SectionDivider } from "../SectionDivider"

interface ContactProps {
	sectionName: string
}

export const Contact: FC<ContactProps> = ({ sectionName }) => (
	<Box id={sectionName.toLowerCase()}>
		<SectionDivider sectionName={sectionName} />

		<VStack spacing={6} mb={8}>
			<VStack align="flex-start" spacing={4}>
				<Button
					as={Link}
					colorScheme="teal"
					size="lg"
					leftIcon={<AiOutlineMail />}
					href="mailto:wes@wesfeller.dev"
					aria-label="Email Wes Feller"
					isExternal
					variant="link"
				>
					wes@wesfeller.dev
				</Button>
				<Button
					as={Link}
					colorScheme="teal"
					size="lg"
					leftIcon={<AiOutlinePhone />}
					href="tel:19095537529"
					aria-label="Call Wes Feller"
					isExternal
					variant="link"
				>
					(909) 553-7529
				</Button>
			</VStack>

			<HStack justifyContent="center" w="60vw">
				<Link
					href="https://github.com/fwesss/"
					isExternal
					variant="nonButton"
					title="Github"
				>
					<Icon boxSize="2rem" as={AiOutlineGithub} />
				</Link>

				<Link
					href="https://www.linkedin.com/in/westley-feller/"
					isExternal
					variant="nonButton"
					title="Linkedin"
				>
					<Icon boxSize="2rem" as={AiOutlineLinkedin} />
				</Link>
			</HStack>

			<HStack>
				<IoLocationOutline size="2rem" />
				<Text>California</Text>
			</HStack>
		</VStack>
	</Box>
)
