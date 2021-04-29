import { Grid, SimpleGrid, StackDivider, VStack } from "@chakra-ui/react"
import React, { FC } from "react"
import { FadeContainer } from "../MotionContainer"
import { FeaturedProject } from "./FeaturedProject"
import { RegularProject } from "./RegularProject"
import { Project } from "../../studio/schema"

interface ProjectsProps {
	projects: Project[]
}

export const Projects: FC<ProjectsProps> = ({ projects }) => {
	return (
		<FadeContainer id="projects" maxW="8xl">
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
								deployedUrl,
								repoUrl,
							}) => (
								<FeaturedProject
									key={_id}
									title={title}
									summary={summary}
									mainImage={mainImage}
									keyFeatures={keyFeatures}
									slug={slug}
									techStack={techStack}
									deployedUrl={deployedUrl}
									repoUrl={repoUrl}
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
