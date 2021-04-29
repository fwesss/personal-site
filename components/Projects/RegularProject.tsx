import {
	Box,
	Heading,
	HStack,
	Stack,
	StackDivider,
	Tag,
	Text,
	useColorModeValue as mode,
	Wrap,
	WrapItem,
} from "@chakra-ui/react"
import Image from "next/image"
import { FC } from "react"
import { urlFor } from "../../utils/sanity-client"
import { Project } from "../../studio/schema"
import styles from "../../styles/Global.module.css"

interface RegularProjectProps {
	title: Project["title"]
	summary: Project["summary"]
	mainImage: Project["mainImage"]
	techStack: Project["techStack"]
	slug: Project["slug"]
}

export const RegularProject: FC<RegularProjectProps> = ({
	mainImage,
	title,
	summary,
	techStack,
	slug,
}) => {
	return (
		<Box>
			<Box
				pos="relative"
				className={styles.group}
				h={{ base: "20rem", lg: "12rem" }}
				overflow="hidden"
			>
				<Image
					objectFit="cover"
					layout="fill"
					src={urlFor(mainImage).url()}
					alt={mainImage.alt}
					className={styles.zoom}
				/>
			</Box>
			<Box mt="6">
				<Stack
					spacing={{ base: "4", md: "6" }}
					direction={{ base: "column", md: "row" }}
					textTransform="uppercase"
					fontSize="xs"
					letterSpacing="wider"
					fontWeight="semibold"
				>
					<HStack
						divider={<StackDivider h="3" alignSelf="center" />}
						spacing="3"
						color={mode("gray.600", "gray.400")}
					>
						<Wrap>
							{techStack.map((tech, index) => (
								<WrapItem key={index}>
									<Tag variant="subtle" colorScheme="blue" size="sm">
										{tech}
									</Tag>
								</WrapItem>
							))}
						</Wrap>
					</HStack>
				</Stack>
				<Box mb="6">
					<Box as="a" href={`/projects/${slug.current}`}>
						<Heading size="md" mt="6" mb="4">
							{title}
						</Heading>
					</Box>
					<Text color={mode("gray.600", "gray.400")} lineHeight="tall">
						{summary}
					</Text>
				</Box>
			</Box>
		</Box>
	)
}
