import { ChakraProvider } from "@chakra-ui/react"
import { init } from "../utils/sentry"
import theme from "../theme/index"
import "../styles/globals.css"

init()

function MyApp({ Component, pageProps, err }) {
	return (
		<ChakraProvider theme={theme}>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			<Component {...pageProps} err={err} />
		</ChakraProvider>
	)
}

export default MyApp
