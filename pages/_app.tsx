import {
  Box,
  Flex,
  useDisclosure,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import { init as commandBarInit } from "commandbar"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { AppProps } from "next/app"
import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { createContext, FC, useEffect, useState } from "react"

import { Chakra } from "../components/Chakra"
import { NavContent } from "../components/Navbar/NavContent"
import { NavLink } from "../components/Navbar/NavLink"
import { init as sentryInit } from "../utils/sentry"

sentryInit()

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

export const MotionContext = createContext<
  | {
      motionPref: boolean
      update: (data: { motionPref: boolean }) => void
    }
  | undefined
>(undefined)
export const WindowContext = createContext<boolean>(false)

const MyApp: FC<AppPropsErr> = ({ Component, pageProps, err }) => {
  const router = useRouter()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const prefersReducedMotion = usePrefersReducedMotion()

  const [windowState, setWindowState] = useState(false)
  const [state, setState] = useState({
    motionPref: !prefersReducedMotion,
    update: (data: { motionPref: boolean }) => {
      setState(Object.assign({}, state, data))
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      commandBarInit("78efb29f")
      const loggedInUserId = "1"
      window.CommandBar.boot(loggedInUserId)
      setWindowState(true)
    }
  }, [router])

  useEffect(() => {
    if (windowState) {
      window.CommandBar.addRouter(route => {
        void router.push(route)
      })
    }
  }, [router, windowState])

  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
      </Head>

      {/* eslint-disable-next-line */}
      <Chakra cookies={pageProps.cookies}>
        <WindowContext.Provider value={windowState}>
          <MotionContext.Provider value={state}>
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
                    <NavContent.Desktop
                      display={{ base: "none", md: "flex" }}
                    />
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
          </MotionContext.Provider>
        </WindowContext.Provider>
      </Chakra>
    </>
  )
}

export { getServerSideProps } from "../components/Chakra"

export default MyApp
