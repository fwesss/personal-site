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
import { SearchIcon } from "@chakra-ui/icons"
import { urlFor } from "../utils/sanity-client"
import { Project } from "../studio/schema"

interface ImageWithCaptionProps {
	image: Project["mainImage"] | Project["screenshots"][0]
	size: string
}

export const ImageWithCaption: FC<ImageWithCaptionProps> = ({
	image,
	size,
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
					pos="relative"
					shadow="xl"
					rounded="xl"
					overflow="hidden"
				>
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
						bg="gray.900"
						zIndex={1}
						opacity={0}
						_hover={{
							opacity: 0.9,
						}}
						transition="200ms ease 200ms"
						flexDirection="column"
						py={{ base: 12 }}
						px={{ base: 6 }}
					>
						<Text
							textStyle="paragraph"
							color="gray.50"
							as="figcaption"
							fontSize={{ base: "0.75rem", sm: "1rem" }}
							px={size === "sm" && { base: 0, sm: 4, lg: 16 }}
						>
							{image.caption}
						</Text>
						<IconButton
							mt={{ base: 0 }}
							isRound
							fontSize="xl"
							color="gray.50"
							variant="ghost"
							aria-label="Zoom"
							icon={<SearchIcon />}
							onClick={onOpen}
						/>
					</Center>
					<Image
						objectFit="cover"
						layout="fill"
						src={urlFor(image).url()}
						alt={image.alt}
					/>
				</Center>
			</Box>

			<Modal isCentered size="6xl" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalBody minH="60vh" pos="relative">
						<Image
							src={urlFor(image).url()}
							alt={`Zoomed ${image.alt}`}
							quality={100}
							layout="fill"
							objectFit="cover"
						/>
					</ModalBody>

					<ModalFooter
						py={4}
						justifyContent="center"
						alignItems="center"
						bg={mode("white", "gray.900")}
						borderBottomRadius="lg"
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
