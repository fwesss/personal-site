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
          <meta content="Westley Feller" name="application-name" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content="Westley Feller" name="apple-mobile-web-app-title" />
          <meta
            content="Portfolio and personal site for Westley Feller"
            name="description"
          />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="/browserconfig.xml" name="msapplication-config" />
          <meta content="#8FBCBB" name="msapplication-TileColor" />
          <meta content="no" name="msapplication-tap-highlight" />
          <meta content="#8FBCBB" name="theme-color" />

          <link href="/touch-icon-iphone.png" rel="apple-touch-icon" />
          <link
            href="/touch-icon-ipad.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />
          <link
            href="/touch-icon-iphone-retina.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/touch-icon-ipad-retina.png"
            rel="apple-touch-icon"
            sizes="167x167"
          />

          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/manifest.json" rel="manifest" />
          <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <link href="/favicon.ico" rel="shortcut icon" />

          <meta content="summary" name="twitter:card" />
          <meta content="https://wesfeller.dev" name="twitter:url" />
          <meta content="Westley Feller" name="twitter:title" />
          <meta
            content="Portfolio and personal website for Westley Feller"
            name="twitter:description"
          />
          <meta
            content="https://wesfeller.dev/static/android-chrome-192x192.png"
            name="twitter:image"
          />
          <meta content="@FellerWestley" name="twitter:creator" />
          <meta content="website" property="og:type" />
          <meta content="Westley Feller" property="og:title" />
          <meta
            content="Portfolio and personal website for Westley Feller"
            property="og:description"
          />
          <meta content="Westley Feller" property="og:site_name" />
          <meta content="https://wesfeller.dev" property="og:url" />
          <meta
            content="https://wesfeller.dev/static/apple-touch-icon.png"
            property="og:image"
          />

          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link color="#8fbcbb" href="/safari-pinned-tab.svg" rel="mask-icon" />
          <meta content="#8fbcbb" name="msapplication-TileColor" />
          <meta content="#8fbcbb" name="theme-color" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
