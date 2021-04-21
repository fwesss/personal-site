import { Box, ChakraProvider, Flex, VStack } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import ColorModeButton from "../components/ColorModeButton"

init()

interface AppPropsErr extends AppProps {
	err: Error
}

const MyApp = ({ Component, pageProps, err }: AppPropsErr): JSX.Element => (
	<ChakraProvider theme={theme}>
		<VStack>
			<Flex w="100%" justify="flex-end" align="center" p={3}>
				<ColorModeButton />
			</Flex>
			<Box>
				<Component {...pageProps} err={err} />
			</Box>
			<Box h={14} />
		</VStack>
	</ChakraProvider>
)

export default MyApp
