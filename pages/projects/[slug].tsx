import { Heading } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import sanity, { urlFor } from "../../utils/sanity-client"
import ExternalLink from "../../components/ExternalLink"
import { Project as ProjectT } from "../../studio/schema"
import Block from "../../components/Block"
import { FadeContainer } from "../../components/MotionContainer"

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ProjectProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

type Project = (props: ProjectProps) => JSX.Element
const Project: Project = ({ title, deployedUrl, mainImage, purpose }) => {
	return (
		<FadeContainer as="main">
			<Heading>{title}</Heading>
			<ExternalLink text="Demo" href={deployedUrl} />
			<Image
				src={urlFor(mainImage).url()}
				alt={mainImage.alt}
				width={960}
				height={600}
			/>
			<Block blocks={purpose} />
		</FadeContainer>
	)
}

type GetStaticPaths = () => Promise<{
	paths: { params: { slug: string } }[]
	fallback: boolean
}>
export const getStaticPaths: GetStaticPaths = async () => {
	const projects = await sanity.getAll("project")

	const paths = projects.map(project => ({
		params: { slug: project.slug.current },
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
