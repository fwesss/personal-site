import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import { AppProps } from "next/app"
import NextLink from "next/link"
import { AnimateSharedLayout } from "framer-motion"
import React from "react"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import { NavContent } from "../components/Navbar/NavContent"
import { NavLink } from "../components/Navbar/NavLink"

init()

interface AppPropsErr extends AppProps {
	err: Error
}

const MyApp = ({ Component, pageProps, err }: AppPropsErr): JSX.Element => {
	return (
		<ChakraProvider theme={theme}>
			<AnimateSharedLayout>
				<Box as="header" height="16" position="relative">
					<Box
						height="100%"
						maxW="7xl"
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
								<NavLink.Desktop h={10}>
									{"wes :: Maybe Task -> Just Success"}
								</NavLink.Desktop>
							</NextLink>
							<NavContent.Desktop display={{ base: "none", md: "flex" }} />
							<NavContent.Mobile display={{ base: "flex", md: "none" }} />
						</Flex>
					</Box>
				</Box>

				<Component {...pageProps} err={err} />
			</AnimateSharedLayout>
		</ChakraProvider>
	)
}

export default MyApp
