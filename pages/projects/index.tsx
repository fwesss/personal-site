import { Grid, SimpleGrid, StackDivider, VStack } from "@chakra-ui/react"
import React from "react"
import { Project as ProjectT } from "../../studio/schema"
import sanity from "../../utils/sanity-client"
import { FadeContainer } from "../../components/MotionContainer"
import { FeaturedProject } from "./FeaturedProject"
import { RegularProject } from "./RegularProject"

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ProjectProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

type Projects = (props: { projects: ProjectProps }) => JSX.Element
const Projects: Projects = ({ projects }) => {
	return (
		<FadeContainer as="main" maxW="6xl">
			<Grid>
				<VStack divider={<StackDivider />} spacing={6}>
					{projects
						.filter(project => project.featured)
						.map(
							({
								title,
								summary,
								mainImage,
								_id,
								slug,
								keyFeatures,
								techStack,
							}) => (
								<FeaturedProject
									key={_id}
									title={title}
									summary={summary}
									mainImage={mainImage}
									keyFeatures={keyFeatures}
									slug={slug}
									techStack={techStack}
								/>
							)
						)}
				</VStack>
				<SimpleGrid mt="14" columns={{ base: 1, lg: 3 }} spacing="14">
					{projects
						.filter(project => !project.featured)
						.map(({ _id, title, slug, mainImage, summary, techStack }) => (
							<RegularProject
								key={_id}
								title={title}
								mainImage={mainImage}
								summary={summary}
								techStack={techStack}
								slug={slug}
							/>
						))}
				</SimpleGrid>
			</Grid>
		</FadeContainer>
	)
}

type GetStaticProps = () => Promise<{ props: ProjectT[] }>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async () => {
	const projects = await sanity.getAll("project")

	type SortProjects = (projectsToSort: ProjectT[]) => ProjectT[]
	const sortProjects: SortProjects = projectsToSort =>
		projectsToSort.sort((a, b) => a.order - b.order)

	return { props: { projects: sortProjects(projects) } }
}

export default Projects
