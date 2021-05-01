import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import { AppProps } from "next/app"
import NextLink from "next/link"
import { AnimateSharedLayout } from "framer-motion"
import React, { FC } from "react"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import { NavContent } from "../components/Navbar/NavContent"
import { NavLink } from "../components/Navbar/NavLink"

init()

interface AppPropsErr extends AppProps {
	err: Error
}

const MyApp: FC<AppPropsErr> = ({ Component, pageProps, err }) => {
	return (
		<ChakraProvider theme={theme}>
			<AnimateSharedLayout>
				<Box pb={50}>
					<Box
						as="header"
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
									<NavLink.Desktop h={10}>WF</NavLink.Desktop>
								</NextLink>
								<NavContent.Desktop display={{ base: "none", md: "flex" }} />
								<NavContent.Mobile display={{ base: "flex", md: "none" }} />
							</Flex>
						</Box>
					</Box>

					<Component {...pageProps} err={err} />
				</Box>
			</AnimateSharedLayout>
		</ChakraProvider>
	)
}

export default MyApp
