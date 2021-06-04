import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue as mode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import Image from "next/image"
import NextLink from "next/link"
import { FC } from "react"
import * as React from "react"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

import { Project } from "../../studio/schema"
import styles from "../../styles/Global.module.css"
import { urlFor } from "../../utils/sanity-client"
import { TechTag } from "../TechTag"

interface RegularProjectProps {
  title: Project["title"]
  summary: Project["summary"]
  mainImage: Project["mainImage"]
  techStack: Project["techStack"]
  slug: Project["slug"]
  repoUrl: Project["repoUrl"]
  deployedUrl: Project["deployedUrl"]
}

export const RegularProject: FC<RegularProjectProps> = ({
  mainImage,
  title,
  summary,
  techStack,
  slug,
  repoUrl,
  deployedUrl,
}) => {
  return (
    <LinkBox
      _hover={{ shadow: { sm: "lg" } }}
      as="article"
      bg={mode("white", "gray.800")}
      overflow="hidden"
      rounded={{ sm: "md" }}
      shadow={{ sm: "base" }}
      transition="all 0.2s"
    >
      <AspectRatio ratio={5 / 3}>
        <Box
          className={styles.group}
          h={{ base: "20rem", lg: "12rem" }}
          mx="auto"
          overflow="hidden"
          pos="relative"
        >
          <Image
            alt={mainImage.alt}
            className={styles.zoom}
            layout="fill"
            objectFit="cover"
            src={urlFor(mainImage).url()}
          />
        </Box>
      </AspectRatio>
      <Box px={{ base: "4", sm: "6" }} py="5">
        <Stack
          direction={{ base: "column", md: "row" }}
          fontSize="xs"
          fontWeight="semibold"
          letterSpacing="wider"
          spacing={{ base: "4", md: "6" }}
          textTransform="uppercase"
        >
          <HStack
            align="baseline"
            color={mode("gray.600", "gray.400")}
            justify="space-between"
            w="100%"
          >
            <Wrap>
              {techStack.map((tech, index) => (
                <WrapItem key={index}>
                  <TechTag size="sm" tech={tech} variant="subtle" />
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
                <Icon as={FaGithub} boxSize="1.25rem" />
              </Link>
              <Link
                href={deployedUrl}
                title={`Demo for ${title}`}
                variant="nonButton"
                isExternal
              >
                <Icon as={FaExternalLinkAlt} boxSize="1.25rem" />
              </Link>
            </HStack>
          </HStack>
        </Stack>
        <Box mb="6">
          <Heading as="h3" mb="4" mt="6" size="md">
            <NextLink href={`/projects/${slug.current}`} passHref>
              <LinkOverlay>{title}</LinkOverlay>
            </NextLink>
          </Heading>
          <Text color={mode("gray.600", "gray.300")} lineHeight="tall">
            {summary}
          </Text>
        </Box>
      </Box>
    </LinkBox>
  )
}
