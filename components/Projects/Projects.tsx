import {
	Divider,
	Flex,
	Grid,
	Heading,
	SimpleGrid,
	VStack,
	Container,
	useColorModeValue as mode,
	Box,
} from "@chakra-ui/react"
import React, { FC } from "react"
import { FeaturedProject } from "./FeaturedProject"
import { RegularProject } from "./RegularProject"
import { Project } from "../../studio/schema"

interface ProjectsProps {
	projects: Project[]
}

export const Projects: FC<ProjectsProps> = ({ projects }) => {
	return (
		<Box id="projects">
			<Flex align="center" px={{ base: "0", md: "8" }} mb={4}>
				<Divider />
				<Heading
					px={6}
					py={12}
					fontWeight="hairline"
					fontFamily="mono"
					fontSize="5xl"
				>
					Projects
				</Heading>
				<Divider />
			</Flex>

			<Grid>
				<Container maxW="7xl" shadow="xl" rounded="lg">
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
				<Container maxW="7xl" bg={mode("gray.50", "gray.900")} px={8}>
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
