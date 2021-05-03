import { Grid, SimpleGrid, VStack, Container, Box } from "@chakra-ui/react"
import React, { FC } from "react"
import { FeaturedProject } from "./FeaturedProject"
import { RegularProject } from "./RegularProject"
import { Project } from "../../studio/schema"
import { SectionDivider } from "../SectionDivider"

interface ProjectsProps {
	projects: Project[]
	sectionName: string
}

export const Projects: FC<ProjectsProps> = ({ projects, sectionName }) => {
	return (
		<Box id={sectionName.toLowerCase()}>
			<SectionDivider sectionName={sectionName} />

			<Grid>
				<Container maxW="7xl">
					<VStack spacing={8}>
						{projects
							.filter(project => project.featured)
							.map(
								(
									{
										title,
										summary,
										mainImage,
										_id,
										slug,
										keyFeatures,
										techStack,
										deployedUrl,
										repoUrl,
									},
									index
								) => (
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
										reversed={index % 2 === 1}
									/>
								)
							)}
					</VStack>
				</Container>
				<Container maxW="7xl" variant="secondary" px={8}>
					<SimpleGrid mt="14" columns={{ base: 1, lg: 2, xl: 3 }} spacing="4">
						{projects
							.filter(project => !project.featured)
							.map(
								({
									_id,
									title,
									slug,
									mainImage,
									summary,
									techStack,
									deployedUrl,
									repoUrl,
								}) => (
									<RegularProject
										key={_id}
										title={title}
										mainImage={mainImage}
										summary={summary}
										techStack={techStack}
										slug={slug}
										repoUrl={repoUrl}
										deployedUrl={deployedUrl}
									/>
								)
							)}
					</SimpleGrid>
				</Container>
			</Grid>
		</Box>
	)
}
