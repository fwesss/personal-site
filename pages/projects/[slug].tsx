import {
	Box,
	Center,
	Heading,
	HStack,
	Icon,
	Link,
	SimpleGrid,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import sanity, { urlFor } from "../../utils/sanity-client"
import { Project as ProjectT } from "../../studio/schema"
import Block from "../../components/Block"
import { FadeContainer } from "../../components/MotionContainer"
import { Section } from "../../components/Projects/Section"
import { TechTag } from "../../components/TechTag"

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ProjectProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

type Project = (props: ProjectProps) => JSX.Element
const Project: Project = ({
	title,
	summary,
	deployedUrl,
	repoUrl,
	mainImage,
	purpose,
	keyFeatures,
	techStack,
	knowledgeGained,
	challenges,
	different,
	screenshots,
}) => {
	return (
		<FadeContainer as="main" maxW="container.md">
			<Heading>{title}</Heading>

			<Center minH="20vh" pos="relative">
				<Image
					objectFit="cover"
					layout="fill"
					src={urlFor(mainImage).url()}
					alt={mainImage.alt}
				/>
			</Center>

			<HStack align="flex-start" justify="space-between" spacing={2} my={4}>
				<HStack spacing={2}>
					<Link href={repoUrl} isExternal>
						<Icon boxSize="1.25em" as={FaGithub} />
					</Link>
					<Link href={deployedUrl} isExternal>
						<Icon boxSize="1.25em" as={FaExternalLinkAlt} />
					</Link>
				</HStack>
				<Wrap>
					{techStack.map((tech, index) => (
						<WrapItem key={index}>
							<TechTag tech={tech} />
						</WrapItem>
					))}
				</Wrap>
			</HStack>

			<Section section="Summary">
				<Text textStyle="paragraph">{summary}</Text>
			</Section>

			<Section section="Purpose">
				<Block blocks={purpose} />
			</Section>

			<Section section="Features">
				{keyFeatures.map(({ _key, headline, body }) => (
					<VStack key={_key}>
						<Box>
							<Heading as="h3" size="md">
								{headline}
							</Heading>
							<Text>{body}</Text>
						</Box>
					</VStack>
				))}
			</Section>

			<Section section="Knowledge Gained">
				<Block blocks={knowledgeGained} />
			</Section>

			<Section section="Challenges">
				<Block blocks={challenges} />
			</Section>

			<Section section="What Could Have Been Different?">
				<Block blocks={different} />
			</Section>

			<Section section="Screenshots">
				<SimpleGrid minChildWidth="350px" spacing={4}>
					{screenshots.map((screenshot, index) => (
						<Image
							key={index}
							src={urlFor(screenshot).url()}
							alt={screenshot.alt}
							// layout="fill"
							objectFit="cover"
							width={960}
							height={600}
						/>
					))}
				</SimpleGrid>
			</Section>
		</FadeContainer>
	)
}

type GetStaticPaths = () => Promise<{
	paths: { params: { slug: string } }[]
	fallback: boolean
}>
export const getStaticPaths: GetStaticPaths = async () => {
	const projects = await sanity.getAll("project")

	const paths = projects.map(({ slug }) => ({
		params: { slug: slug.current },
	}))

	return { paths, fallback: false }
}

type GetStaticProps = (props: {
	params: { slug: string }
}) => Promise<{ props: ProjectT }>
export const getStaticProps: GetStaticProps = async ({ params }) => {
	const slug = params?.slug
	const [project] = await sanity.getAll("project", `slug.current == "${slug}"`)

	return { props: project }
}

export default Project
