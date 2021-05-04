import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import { AppProps } from "next/app"
import NextLink from "next/link"
import { AnimatePresence } from "framer-motion"
import React, { FC } from "react"
import { useRouter } from "next/router"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import { NavContent } from "../components/Navbar/NavContent"
import { NavLink } from "../components/Navbar/NavLink"
import { Visualization } from "../components/Intro/Visualization"

init()

interface AppPropsErr extends AppProps {
	err: Error
}

const handleExitComplete = (): void => {
	if (typeof window !== "undefined") {
		const hashId = window.location.hash
		if (hashId) {
			const element = document.querySelector(hashId)
			if (element) {
				element.scrollIntoView()
			}
		}
	}
}

const MyApp: FC<AppPropsErr> = ({ Component, pageProps, err }) => {
	const router = useRouter()

	return (
		<ChakraProvider theme={theme}>
			<Box pb={50}>
				<Box
					h="16"
					w="100%"
					position="sticky"
					top={0}
					zIndex={1000}
					pointerEvents="none"
					background="transparent"
				>
					<Box
						height="100%"
						mx="auto"
						ps={{ base: "6", md: "8" }}
						pe={{ base: "5", md: "4" }}
					>
						<Flex
							as="nav"
							aria-label="Site navigation"
							align="center"
							justify="space-between"
							height="100%"
							fontFamily="mono"
							fontSize={{ base: "md", sm: "lg", md: "xl" }}
						>
							<NextLink href="/" passHref>
								<NavLink h={10}>WF</NavLink>
							</NextLink>
							<NavContent display="flex" />
						</Flex>
					</Box>
				</Box>

				<Visualization />

				<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
					<Component {...pageProps} err={err} key={router.route} />
				</AnimatePresence>
			</Box>
		</ChakraProvider>
	)
}

export default MyApp
