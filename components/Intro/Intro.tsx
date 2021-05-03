import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"

export const Intro: FC = () => (
	<Flex
		h="calc(100vh - 4rem)"
		align="center"
		bottom="4rem"
		position="relative"
		ps={{ base: "2", md: "24", lg: "32", xl: "48" }}
		pe={{ base: "7", md: "6", lg: "12", xl: "24" }}
	>
		<Box>
			<Text
				mb={0}
				fontSize={{
					base: "lg",
					sm: "xl",
					md: "2xl",
					lg: "3xl",
					xl: "4xl",
				}}
			>
				Hi, I&apos;m
			</Text>
			<Heading
				as="h1"
				fontSize={{ base: "12vw", md: "10vw", lg: "9vw", xl: "8vw" }}
			>
				Wes Feller
			</Heading>
			<Text
				width={{
					base: "clamp(30ch, 100%, 40ch)",
					sm: "clamp(45ch, 100%, 75ch)",
				}}
				lineHeight="1.35"
				fontSize={{
					base: "md",
					sm: "lg",
					md: "xl",
					lg: "2xl",
					xl: "3xl",
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo
				quis imperdiet massa.
			</Text>
		</Box>
	</Flex>
)
