import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react"
import { NextApiRequest } from "next"

import theme from "../theme/index"

export function Chakra({ cookies, children }) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export function getServerSideProps({ req }: { req: NextApiRequest }) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}
