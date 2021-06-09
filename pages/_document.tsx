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
  static async getInitialProps(ctx: unknown): Promise<{
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
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <meta name="application-name" content="Westley Feller" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Westley Feller" />
          <meta
            name="description"
            content="Portfolio and personal site for Westley Feller"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#8FBCBB" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#8FBCBB" />

          <link rel="apple-touch-icon" href="/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://wesfeller.dev" />
          <meta name="twitter:title" content="Westley Feller" />
          <meta
            name="twitter:description"
            content="Portfolio and personal website for Westley Feller"
          />
          <meta
            name="twitter:image"
            content="https://wesfeller.dev/static/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@FellerWestley" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Westley Feller" />
          <meta
            property="og:description"
            content="Portfolio and personal website for Westley Feller"
          />
          <meta property="og:site_name" content="Westley Feller" />
          <meta property="og:url" content="https://wesfeller.dev" />
          <meta
            property="og:image"
            content="https://wesfeller.dev/static/apple-touch-icon.png"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8fbcbb" />
          <meta name="msapplication-TileColor" content="#8fbcbb" />
          <meta name="theme-color" content="#8fbcbb" />
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
