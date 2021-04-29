import {
	Box,
	Center,
	Heading,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue as mode,
	Tag,
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
import NextLink from "next/link"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import { urlFor } from "../../utils/sanity-client"
import { Project } from "../../studio/schema"

interface FeaturedProjectProps {
	title: Project["title"]
	summary: Project["summary"]
	mainImage: Project["mainImage"]
	keyFeatures: Project["keyFeatures"]
	techStack: Project["techStack"]
	slug: Project["slug"]
	deployedUrl: Project["deployedUrl"]
	repoUrl: Project["repoUrl"]
}

export const FeaturedProject: FC<FeaturedProjectProps> = ({
	title,
	mainImage,
	keyFeatures,
	techStack,
	slug,
	deployedUrl,
	repoUrl,
}) => {
	return (
		<Box as="article" bg={mode("gray.50", "gray.800")} py="8" w="100%">
			<Box
				maxW={{ base: "xl", md: "7xl" }}
				mx="auto"
				px={{ base: "6", md: "8" }}
			>
				<Heading
					textAlign="center"
					letterSpacing="tight"
					fontWeight="extrabold"
				>
					<NextLink href={`/projects/${slug.current}`} passHref>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<Link variant="heading">{title}</Link>
					</NextLink>
				</Heading>
				<Box mt="10">
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: "16", md: "8" }}
					>
						<Stack spacing="12" maxW="lg">
							{keyFeatures.map(({ _key, headline, body }) => (
								<Stack key={_key} direction="row" spacing="6">
									<Stack>
										<Text as="h3" fontSize="xl" fontWeight="extrabold">
											{headline}
										</Text>
										<Text
											pr="6"
											color={mode("gray.600", "gray.400")}
											lineHeight="tall"
											textStyle="paragraph"
										>
											{body}
										</Text>
									</Stack>
								</Stack>
							))}
						</Stack>
						<VStack w="100%" spacing={4}>
							<LinkBox w="100%">
								<NextLink href={`/projects/${slug.current}`} passHref>
									<LinkOverlay>
										<Center
											shadow="lg"
											minH="26rem"
											// minW="35rem"
											pos="relative"
											overflow="hidden"
										>
											<Image
												objectFit="cover"
												layout="fill"
												src={urlFor(mainImage).url()}
												alt={mainImage.alt}
											/>
										</Center>
									</LinkOverlay>
								</NextLink>
							</LinkBox>
							<HStack align="flex-start" justify="space-between" w="100%">
								<Wrap>
									{techStack.map((tag, index) => (
										<WrapItem key={index}>
											<Tag variant="solid" colorScheme="blue">
												{tag}
											</Tag>
										</WrapItem>
									))}
								</Wrap>
								<HStack spacing={2}>
									<Link href={repoUrl} isExternal>
										<Icon boxSize="1.25em" as={FaGithub} />
									</Link>
									<Link href={deployedUrl} isExternal>
										<Icon boxSize="1.25em" as={FaExternalLinkAlt} />
									</Link>
								</HStack>
							</HStack>
						</VStack>
					</SimpleGrid>
				</Box>
			</Box>
		</Box>
	)
}
