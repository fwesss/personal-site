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
import { urlFor } from "../../utils/sanity-client"
import { Project } from "../../studio/schema"
import { TechTag } from "../TechTag"
import styles from "../../styles/Global.module.css"
import { LinkButton } from "../LinkButton"

interface ContentProps {
	summary: Project["summary"]
	keyFeatures: Project["keyFeatures"]
	slug: Project["slug"]
}

const Content: FC<ContentProps> = ({ summary, keyFeatures, slug }) => (
	<Stack spacing={4} mx="auto">
		<Text
			textStyle="feature"
			fontSize={{
				base: "1rem",
				md: "1.125rem",
			}}
			mb={1}
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
						textStyle="feature"
						fontSize={{
							base: "1rem",
							md: "1.125rem",
						}}
						m="0 auto"
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
		w={{ base: "clamp(30ch, 100%, 40ch)", md: "clamp(45ch, 100%, 75ch)" }}
		mx="auto"
		spacing={4}
		align={reversed ? "flex-end" : "flex-start"}
	>
		<Center
			maxW="56rem"
			w={{ base: "100%", xl: "45vw" }}
			h={{ base: "14rem", sm: "16rem", md: "20rem", xl: "100%" }}
			shadow="dark-lg"
			pos="relative"
			overflow="hidden"
			className={styles.group}
			rounded="xl"
		>
			<Image
				objectFit="cover"
				layout="fill"
				src={urlFor(mainImage).url()}
				alt={mainImage.alt}
				className={styles.zoom}
			/>
		</Center>
		<HStack
			pt={2}
			align="baseline"
			justify={reversed ? "flex-end" : "flex-start"}
			w="100%"
			spacing={6}
		>
			{!reversed ? (
				<>
					<HStack spacing={2}>
						<Link
							href={repoUrl}
							isExternal
							variant="nonButton"
							title={`Github for ${title}`}
						>
							<Icon boxSize="1.375rem" as={FaGithub} />
						</Link>
						<Link
							href={deployedUrl}
							isExternal
							variant="nonButton"
							title={`Demo for ${title}`}
						>
							<Icon boxSize="1.375rem" as={FaExternalLinkAlt} />
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
							isExternal
							variant="nonButton"
							title={`Github for ${title}`}
						>
							<Icon boxSize="1.375rem" as={FaGithub} />
						</Link>
						<Link
							href={deployedUrl}
							isExternal
							variant="nonButton"
							title={`Demo for ${title}`}
						>
							<Icon boxSize="1.375rem" as={FaExternalLinkAlt} />
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
			{reversed && <Box w={{ base: "0", xl: "50%" }} h="1px" />}
			<Heading
				w={{ base: "100%", xl: "50%" }}
				letterSpacing="tight"
				fontWeight="extrabold"
				as="h3"
				fontSize="7xl"
			>
				{title}
			</Heading>
		</HStack>
		<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: "8", xl: "12" }}>
			{reversed ? (
				<>
					<ImageContent
						title={title}
						mainImage={mainImage}
						techStack={techStack}
						deployedUrl={deployedUrl}
						repoUrl={repoUrl}
						reversed={reversed}
					/>
					<Content summary={summary} keyFeatures={keyFeatures} slug={slug} />
				</>
			) : (
				<>
					<Content summary={summary} keyFeatures={keyFeatures} slug={slug} />
					<ImageContent
						title={title}
						mainImage={mainImage}
						techStack={techStack}
						deployedUrl={deployedUrl}
						repoUrl={repoUrl}
					/>
				</>
			)}
		</SimpleGrid>
	</Box>
)
