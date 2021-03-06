import {
  Container,
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
import Head from "next/head"
import React from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

import Block from "../../components/Block"
import { ImageWithCaption } from "../../components/ImageWithCaption"
import { FadeBox } from "../../components/MotionComponents"
import { Section } from "../../components/Projects/Section"
import { TechTag } from "../../components/TechTag"
import { Project as ProjectT } from "../../studio/schema"
import sanity from "../../utils/sanity-client"

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
    <>
      <Head>
        <title>Wes Feller | {title}</title>
      </Head>

      <FadeBox>
        <Container as="header" maxW="7xl" variant="secondary">
          <Heading as="h1" fontSize="7xl" fontWeight="bold" lineHeight="1">
            {title}
          </Heading>
          <Text textStyle="paragraph">{summary}</Text>
          <HStack align="baseline" my={4} spacing={4}>
            <Wrap>
              {techStack.map((tech, index) => (
                <WrapItem key={index}>
                  <TechTag tech={tech} variant="subtle" />
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
          </HStack>
        </Container>

        <Container
          as="main"
          maxW="7xl"
          py={20}
          rounded={{ base: "0", xl: "xl" }}
        >
          <VStack maxW="clamp(45ch, 100%, 75ch)" mx="auto" spacing={6}>
            <ImageWithCaption image={mainImage} size="lg" priority />

            <Section section="Purpose">
              <Block blocks={purpose} />
            </Section>

            <Section section="Features">
              {keyFeatures.map(({ _key, body }) => (
                <VStack key={_key}>
                  <Text textStyle="paragraph">{body}</Text>
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
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {screenshots.map((screenshot, index) => (
                  <ImageWithCaption key={index} image={screenshot} size="sm" />
                ))}
              </SimpleGrid>
            </Section>
          </VStack>
        </Container>
      </FadeBox>
    </>
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
