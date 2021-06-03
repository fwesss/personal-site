import {
	Box,
	Center,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue as mode,
	VStack,
	Wrap,
	WrapItem,
	HStack,
	Icon,
	Link,
} from "@chakra-ui/react"
import Image from "next/image"
import * as React from "react"
import { FC } from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

import { Project } from "../../studio/schema"
import styles from "../../styles/Global.module.css"
import { urlFor } from "../../utils/sanity-client"
import { LinkButton } from "../LinkButton"
import { TechTag } from "../TechTag"

interface ContentProps {
	summary: Project["summary"]
	keyFeatures: Project["keyFeatures"]
	slug: Project["slug"]
}

const Content: FC<ContentProps> = ({ summary, keyFeatures, slug }) => (
	<Stack mx="auto" spacing={4}>
		<Text
			fontSize={{
				base: "1rem",
				md: "1.125rem",
			}}
			mb={1}
			textStyle="feature"
		>
			{summary}
		</Text>
		{keyFeatures.map(({ _key, headline, body }) => (
			<VStack key={_key}>
				<Stack>
					<Text as="h4" fontSize="xl" fontWeight="extrabold">
						{headline}
					</Text>
					<Text
						color={mode("gray.600", "gray.300")}
						fontSize={{
							base: "1rem",
							md: "1.125rem",
						}}
						m="0 auto"
						textStyle="feature"
					>
						{body}
					</Text>
				</Stack>
			</VStack>
		))}
		<LinkButton href={`/projects/${slug.current}`} />
	</Stack>
)

interface ImageContentProps {
	title: Project["title"]
	mainImage: Project["mainImage"]
	techStack: Project["techStack"]
	deployedUrl: Project["deployedUrl"]
	repoUrl: Project["repoUrl"]
	reversed?: boolean
}

const ImageContent: FC<ImageContentProps> = ({
	title,
	mainImage,
	techStack,
	repoUrl,
	deployedUrl,
	reversed,
}) => (
	<VStack
		align={reversed ? "flex-end" : "flex-start"}
		mx="auto"
		spacing={4}
		w={{ base: "clamp(30ch, 100%, 40ch)", md: "clamp(45ch, 100%, 75ch)" }}
	>
		<Center
			className={styles.group}
			h={{ base: "14rem", sm: "16rem", md: "20rem", xl: "100%" }}
			maxW="56rem"
			overflow="hidden"
			pos="relative"
			rounded="xl"
			shadow="dark-lg"
			w={{ base: "100%", xl: "45vw" }}
		>
			<Image
				alt={mainImage.alt}
				className={styles.zoom}
				layout="fill"
				objectFit="cover"
				src={urlFor(mainImage).url()}
			/>
		</Center>
		<HStack
			align="baseline"
			justify={reversed ? "flex-end" : "flex-start"}
			pt={2}
			spacing={6}
			w="100%"
		>
			{!reversed ? (
				<>
					<HStack spacing={2}>
						<Link
							href={repoUrl}
							title={`Github for ${title}`}
							variant="nonButton"
							isExternal
						>
							<Icon as={FaGithub} boxSize="1.375rem" />
						</Link>
						<Link
							href={deployedUrl}
							title={`Demo for ${title}`}
							variant="nonButton"
							isExternal
						>
							<Icon as={FaExternalLinkAlt} boxSize="1.375rem" />
						</Link>
					</HStack>
					<Wrap>
						{techStack.map((tag, index) => (
							<WrapItem key={index}>
								<TechTag tech={tag} variant="subtle" />
							</WrapItem>
						))}
					</Wrap>
				</>
			) : (
				<>
					<Wrap>
						{techStack.map((tag, index) => (
							<WrapItem key={index}>
								<TechTag tech={tag} variant="subtle" />
							</WrapItem>
						))}
					</Wrap>
					<HStack spacing={2}>
						<Link
							href={repoUrl}
							title={`Github for ${title}`}
							variant="nonButton"
							isExternal
						>
							<Icon as={FaGithub} boxSize="1.375rem" />
						</Link>
						<Link
							href={deployedUrl}
							title={`Demo for ${title}`}
							variant="nonButton"
							isExternal
						>
							<Icon as={FaExternalLinkAlt} boxSize="1.375rem" />
						</Link>
					</HStack>
				</>
			)}
		</HStack>
	</VStack>
)

interface FeaturedProjectProps {
	title: Project["title"]
	summary: Project["summary"]
	mainImage: Project["mainImage"]
	keyFeatures: Project["keyFeatures"]
	techStack: Project["techStack"]
	slug: Project["slug"]
	deployedUrl: Project["deployedUrl"]
	repoUrl: Project["repoUrl"]
	reversed?: boolean
}
export const FeaturedProject: FC<FeaturedProjectProps> = ({
	title,
	summary,
	mainImage,
	keyFeatures,
	techStack,
	slug,
	deployedUrl,
	repoUrl,
	reversed = false,
}) => (
	<Box
		as="article"
		py="8"
		w={{
			base: "clamp(30ch, 100%, 40ch)",
			md: "clamp(45ch, 100%, 75ch)",
			xl: "100%",
		}}
	>
		<HStack spacing={{ base: "0", xl: "10" }}>
			{reversed && <Box h="1px" w={{ base: "0", xl: "50%" }} />}
			<Heading
				as="h3"
				fontSize="7xl"
				fontWeight="extrabold"
				letterSpacing="tight"
				w={{ base: "100%", xl: "50%" }}
			>
				{title}
			</Heading>
		</HStack>
		<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: "8", xl: "12" }}>
			{reversed ? (
				<>
					<ImageContent
						deployedUrl={deployedUrl}
						mainImage={mainImage}
						repoUrl={repoUrl}
						reversed={reversed}
						techStack={techStack}
						title={title}
					/>
					<Content keyFeatures={keyFeatures} slug={slug} summary={summary} />
				</>
			) : (
				<>
					<Content keyFeatures={keyFeatures} slug={slug} summary={summary} />
					<ImageContent
						deployedUrl={deployedUrl}
						mainImage={mainImage}
						repoUrl={repoUrl}
						techStack={techStack}
						title={title}
					/>
				</>
			)}
		</SimpleGrid>
	</Box>
)
