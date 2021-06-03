import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"

export const Intro: FC = () => (
	<>
		<Flex
			align="center"
			bottom="4rem"
			h="calc(100vh - 4rem)"
			pe={{ base: "7", md: "6", lg: "12", xl: "24" }}
			position="relative"
			ps={{ base: "8", md: "24", lg: "32", xl: "48" }}
		>
			<Box>
				<Text
					fontSize={{
						base: "lg",
						sm: "xl",
						md: "2xl",
						lg: "3xl",
						xl: "4xl",
					}}
					mb={0}
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
					fontSize={{
						base: "md",
						sm: "lg",
						md: "xl",
						lg: "2xl",
						xl: "3xl",
					}}
					lineHeight="1.35"
					width={{
						base: "clamp(30ch, 100%, 40ch)",
						sm: "clamp(45ch, 100%, 75ch)",
					}}
				>
					I&apos;m a web developer who loves creative problem solving, using
					data visualization to tell stories, and building stable, performant,
					and accessible web apps.
				</Text>
				<Text
					fontSize={{
						base: "md",
						sm: "lg",
						md: "xl",
						lg: "2xl",
						xl: "3xl",
					}}
					lineHeight="1.35"
					width={{
						base: "clamp(30ch, 100%, 40ch)",
						sm: "clamp(45ch, 100%, 75ch)",
					}}
				>
					When I&apos;m not at my desk, I&apos;m rock climbing, backpacking in
					the Sierra Nevada, playing bass and guitar, and spending a bit too
					much time brewing the perfect cup of coffee.
				</Text>
			</Box>
		</Flex>
	</>
)
