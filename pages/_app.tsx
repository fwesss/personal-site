import { init } from "../utils/sentry"
import "../styles/globals.css"

init()

const MyApp = ({ Component, pageProps, err }) => (
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	<Component {...pageProps} err={err} />
)

export default MyApp
