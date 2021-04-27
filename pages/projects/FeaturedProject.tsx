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
} from "@chakra-ui/react"
import Image from "next/image"
import * as React from "react"
import { FC } from "react"
import NextLink from "next/link"
import { urlFor } from "../../utils/sanity-client"
import { Project } from "../../studio/schema"

interface FeaturedProjectProps {
	title: Project["title"]
	summary: Project["summary"]
	mainImage: Project["mainImage"]
	keyFeatures: Project["keyFeatures"]
	techStack: Project["techStack"]
	slug: Project["slug"]
}

export const FeaturedProject: FC<FeaturedProjectProps> = ({
	title,
	mainImage,
	keyFeatures,
	techStack,
	slug,
}) => {
	return (
		<Box as="article" bg={mode("gray.50", "gray.800")} py="8">
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
					<NextLink href={`/projects/${slug.current}`}>{title}</NextLink>
				</Heading>
				<Box mt="10">
					<SimpleGrid
						columns={{ base: 1, md: 2 }}
						spacing={{ base: "16", md: "8" }}
					>
						<Stack spacing="12" maxW="lg">
							{keyFeatures.map(({ _key, headline, body }) => (
								<Stack key={_key} direction="row" w="100%" spacing="6">
									<Stack>
										<Text as="h3" fontSize="xl" fontWeight="extrabold">
											{headline}
										</Text>
										<Text
											pr="6"
											color={mode("gray.600", "gray.400")}
											lineHeight="tall"
										>
											{body}
										</Text>
									</Stack>
								</Stack>
							))}
						</Stack>
						<VStack spacing={4}>
							<LinkBox>
								<NextLink href={`/projects/${slug.current}`} passHref>
									<LinkOverlay>
										<Center
											shadow="lg"
											minH="26rem"
											w="32rem"
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
							<Wrap alignSelf="flex-start">
								{techStack.map((tag, index) => (
									<WrapItem key={index}>
										<Tag variant="solid" colorScheme="blue">
											{tag}
										</Tag>
									</WrapItem>
								))}
							</Wrap>
						</VStack>
					</SimpleGrid>
				</Box>
			</Box>
		</Box>
	)
}
