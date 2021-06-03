import { SearchIcon } from "@chakra-ui/icons"
import {
	Box,
	Center,
	IconButton,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Text,
	useDisclosure,
	useColorModeValue as mode,
} from "@chakra-ui/react"
import Image from "next/image"
import React, { FC } from "react"

import { Project } from "../studio/schema"
import { urlFor } from "../utils/sanity-client"

interface ImageWithCaptionProps {
	image: Project["mainImage"] | Project["screenshots"][0]
	size: string
	priority?: boolean
}

export const ImageWithCaption: FC<ImageWithCaptionProps> = ({
	image,
	size,
	priority = false,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Box as="figure">
				<Center
					h={
						size === "sm"
							? "20vh"
							: {
									base: "14rem",
									sm: "16rem",
									md: "20rem",
									lg: "24rem",
									xl: "32rem",
							  }
					}
					overflow="hidden"
					pos="relative"
					rounded="xl"
					shadow="xl"
				>
					<Center
						_hover={{
							opacity: 0.9,
						}}
						bg="gray.900"
						flexDirection="column"
						h={
							size === "sm"
								? "20vh"
								: {
										base: "14rem",
										sm: "16rem",
										md: "20rem",
										lg: "24rem",
										xl: "32rem",
								  }
						}
						opacity={0}
						px={{ base: 6 }}
						py={{ base: 12 }}
						transition="200ms ease 200ms"
						w="100%"
						zIndex={1}
					>
						<Text
							as="figcaption"
							color="gray.50"
							fontSize={{
								base: "0.75rem",
								sm: "1rem",
								md: "0.875rem",
								lg: "1rem",
							}}
							px={size === "sm" && { base: 0, sm: 4, md: 16 }}
							textStyle="paragraph"
						>
							{image.caption}
						</Text>
						<IconButton
							aria-label="Zoom"
							color="gray.50"
							fontSize="xl"
							icon={<SearchIcon />}
							mt={{ base: 0 }}
							variant="ghost"
							isRound
							onClick={onOpen}
						/>
					</Center>
					<Image
						alt={image.alt}
						layout="fill"
						objectFit="cover"
						priority={priority}
						src={urlFor(image).url()}
					/>
				</Center>
			</Box>

			<Modal isOpen={isOpen} size="6xl" isCentered onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody minH="60vh" pos="relative">
						<Image
							alt={`Zoomed ${image.alt}`}
							layout="fill"
							objectFit="cover"
							quality={100}
							src={urlFor(image).url()}
						/>
					</ModalBody>

					<ModalFooter
						alignItems="center"
						bg={mode("white", "gray.900")}
						borderBottomRadius="lg"
						justifyContent="center"
						py={4}
					>
						<Text mb={0} textStyle="paragraph">
							{image.caption}
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
