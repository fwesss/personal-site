import { Grid, SimpleGrid, VStack, Container, Box } from "@chakra-ui/react"
import React, { FC } from "react"

import { Project } from "../../studio/schema"
import { SectionDivider } from "../SectionDivider"

import { FeaturedProject } from "./FeaturedProject"
import { RegularProject } from "./RegularProject"

interface ProjectsProps {
  projects: Project[]
  sectionName: string
}

export const Projects: FC<ProjectsProps> = ({ projects, sectionName }) => {
  return (
    <Box id={sectionName.toLowerCase()}>
      <SectionDivider sectionName={sectionName} />

      <Grid>
        <Container maxW="7xl" rounded={{ base: "0", xl: "xl" }}>
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
                    deployedUrl={deployedUrl}
                    keyFeatures={keyFeatures}
                    mainImage={mainImage}
                    repoUrl={repoUrl}
                    reversed={index % 2 === 1}
                    slug={slug}
                    summary={summary}
                    techStack={techStack}
                    title={title}
                  />
                )
              )}
          </VStack>
        </Container>
        <Container maxW="7xl" px={8} variant="secondary">
          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} mt="14" spacing="4">
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
                    deployedUrl={deployedUrl}
                    mainImage={mainImage}
                    repoUrl={repoUrl}
                    slug={slug}
                    summary={summary}
                    techStack={techStack}
                    title={title}
                  />
                )
              )}
          </SimpleGrid>
        </Container>
      </Grid>
    </Box>
  )
}
