import { ColorModeScript } from "@chakra-ui/react"
import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document"
import React, { ReactElement, ReactFragment } from "react"

class MyDocument extends Document {
	static async getInitialProps(
		ctx: unknown
	): Promise<{
		head?: Array<JSX.Element | null>
		html: string
		styles?: ReactElement[] | ReactFragment
	}> {
		const initialProps = await Document.getInitialProps(ctx as DocumentContext)
		return { ...initialProps }
	}

	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<link href="https://fonts.gstatic.com" rel="preconnect" />
					<link
						href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400;500;600&family=Inter:wght@400;500;600;700;800;900&display=swap"
						rel="stylesheet"
					/>
					<link href="/favicon.ico" rel="icon" />
				</Head>
				<body>
					<ColorModeScript initialColorMode="light" />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
