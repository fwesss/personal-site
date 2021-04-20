import { Box, ChakraProvider, Flex, VStack } from "@chakra-ui/react"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import ColorModeButton from "../components/ColorModeButton"

init()

function MyApp({ Component, pageProps, err }) {
	return (
		<ChakraProvider theme={theme}>
			<VStack>
				<Flex w="100%" justify="flex-end" align="center" p={3}>
					<ColorModeButton />
				</Flex>
				<Box>
					{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
					<Component {...pageProps} err={err} />
				</Box>
				<Box h={14} />
			</VStack>
		</ChakraProvider>
	)
}

export default MyApp
