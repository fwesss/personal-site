import {
	AspectRatio,
	Box,
	Heading,
	HStack,
	Icon,
	Link,
	LinkBox,
	LinkOverlay,
	Stack,
	Text,
	useColorModeValue as mode,
	Wrap,
	WrapItem,
} from "@chakra-ui/react"
import Image from "next/image"
import { FC } from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import * as React from "react"
import NextLink from "next/link"
import { urlFor } from "../../utils/sanity-client"
import { Project } from "../../studio/schema"
import styles from "../../styles/Global.module.css"
import { TechTag } from "../TechTag"

interface RegularProjectProps {
	title: Project["title"]
	summary: Project["summary"]
	mainImage: Project["mainImage"]
	techStack: Project["techStack"]
	slug: Project["slug"]
	repoUrl: Project["repoUrl"]
	deployedUrl: Project["deployedUrl"]
}

export const RegularProject: FC<RegularProjectProps> = ({
	mainImage,
	title,
	summary,
	techStack,
	slug,
	repoUrl,
	deployedUrl,
}) => {
	return (
		<LinkBox
			as="article"
			shadow={{ sm: "base" }}
			rounded={{ sm: "md" }}
			overflow="hidden"
			transition="all 0.2s"
			_hover={{ shadow: { sm: "lg" } }}
			bg={mode("white", "gray.800")}
		>
			<AspectRatio ratio={5 / 3}>
				<Box
					pos="relative"
					className={styles.group}
					h={{ base: "20rem", lg: "12rem" }}
					overflow="hidden"
					mx="auto"
				>
					<Image
						objectFit="cover"
						layout="fill"
						src={urlFor(mainImage).url()}
						alt={mainImage.alt}
						className={styles.zoom}
					/>
				</Box>
			</AspectRatio>
			<Box py="5" px={{ base: "4", sm: "6" }}>
				<Stack
					spacing={{ base: "4", md: "6" }}
					direction={{ base: "column", md: "row" }}
					textTransform="uppercase"
					fontSize="xs"
					letterSpacing="wider"
					fontWeight="semibold"
				>
					<HStack
						align="baseline"
						justify="space-between"
						w="100%"
						color={mode("gray.600", "gray.400")}
					>
						<Wrap>
							{techStack.map((tech, index) => (
								<WrapItem key={index}>
									<TechTag tech={tech} variant="subtle" size="sm" />
								</WrapItem>
							))}
						</Wrap>
						<HStack spacing={2}>
							<Link href={repoUrl} isExternal variant="nonButton">
								<Icon boxSize="1.25rem" as={FaGithub} />
							</Link>
							<Link href={deployedUrl} isExternal variant="nonButton">
								<Icon boxSize="1.25rem" as={FaExternalLinkAlt} />
							</Link>
						</HStack>
					</HStack>
				</Stack>
				<Box mb="6">
					<Heading as="h3" size="md" mt="6" mb="4">
						<NextLink href={`/projects/${slug.current}`} passHref>
							<LinkOverlay>{title}</LinkOverlay>
						</NextLink>
					</Heading>
					<Text color={mode("gray.600", "gray.400")} lineHeight="tall">
						{summary}
					</Text>
				</Box>
			</Box>
		</LinkBox>
	)
}
