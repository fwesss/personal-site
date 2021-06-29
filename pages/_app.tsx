import {
  Box,
  ChakraProvider,
  Flex,
  useDisclosure,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import {
  AnimatePresence,
  AnimateSharedLayout,
  MotionConfig,
} from "framer-motion"
import { AppProps } from "next/app"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { FC } from "react"

import { NavContent } from "../components/Navbar/NavContent"
import { NavLink } from "../components/Navbar/NavLink"
import theme from "../theme/index"
import { init } from "../utils/sentry"

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
  const { isOpen, onClose, onToggle } = useDisclosure()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>

      <ChakraProvider theme={theme}>
        <MotionConfig transition={{ duration: prefersReducedMotion && 0 }}>
          <Flex
            direction="column"
            pb={router.pathname !== "/adventures" && 50}
            onClick={isOpen ? onClose : undefined}
          >
            <Box
              background="transparent"
              minHeight="16"
              pointerEvents="none"
              position="sticky"
              top={0}
              w="100%"
              zIndex={1001}
            >
              <Box
                height="16"
                mx="auto"
                pe={{ base: "5", md: "4" }}
                ps={{ base: "6", md: "8" }}
              >
                <Flex
                  align="center"
                  aria-label="Site navigation"
                  as="nav"
                  fontFamily="mono"
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  height="100%"
                  justify="space-between"
                >
                  <NextLink href="/" passHref>
                    <NavLink.Desktop h={10}>WF</NavLink.Desktop>
                  </NextLink>
                  <NavContent.Desktop display={{ base: "none", md: "flex" }} />
                  <NavContent.Mobile
                    display={{ base: "flex", md: "none" }}
                    isOpen={isOpen}
                    onToggle={onToggle}
                  />
                </Flex>
              </Box>
            </Box>

            <AnimateSharedLayout type="crossfade">
              <AnimatePresence
                exitBeforeEnter
                onExitComplete={handleExitComplete}
              >
                <Component {...pageProps} key={router.route} err={err} />
              </AnimatePresence>
            </AnimateSharedLayout>
          </Flex>
        </MotionConfig>
      </ChakraProvider>
    </>
  )
}

export default MyApp
