import { Box, Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react"
import { FC } from "react"

import theme from "../../theme/index"

export const Intro: FC = () => (
  <>
    <Flex
      align="center"
      bottom="4rem"
      h="calc(100vh - 4rem)"
      pe={{ base: "0", md: "6", lg: "12", xl: "24" }}
      position="relative"
      ps={{ base: "0", md: "24", lg: "32", xl: "48" }}
    >
      <Box
        bg={useColorModeValue(
          `${theme.colors.gray["50"]}CB`,
          `${theme.colors.gray["900"]}CB`
        )}
        boxShadow="xl"
        p={{ base: 8 }}
        pointerEvents="none"
        rounded={{ base: "0", lg: "xl" }}
        sx={{ backdropFilter: "blur(6px)" }}
        width={{
          base: "clamp(30ch, 100%, 40ch)",
          sm: "clamp(45ch, 100%, 120ch)",
        }}
        zIndex={3}
      >
        <Text
          fontSize={{
            base: "lg",
            sm: "xl",
            md: "2xl",
            lg: "3xl",
            xl: "4xl",
          }}
          mb={0}
        >
          Hi, I&apos;m
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "12vw", md: "10vw", lg: "9vw", xl: "8vw" }}
        >
          Wes Feller
        </Heading>
        <Text
          fontSize={{
            base: "md",
            sm: "lg",
            md: "xl",
            lg: "2xl",
            xl: "3xl",
          }}
          lineHeight="1.35"
          width={{
            base: "clamp(30ch, 100%, 40ch)",
            sm: "clamp(45ch, 100%, 75ch)",
          }}
        >
          I&apos;m a web developer who loves creative problem solving, using
          data visualization to tell stories, and building stable, performant,
          and accessible web apps.
        </Text>
        <Text
          fontSize={{
            base: "md",
            sm: "lg",
            md: "xl",
            lg: "2xl",
            xl: "3xl",
          }}
          lineHeight="1.35"
          width={{
            base: "clamp(30ch, 100%, 40ch)",
            sm: "clamp(45ch, 100%, 75ch)",
          }}
        >
          When I&apos;m not at my desk, I&apos;m rock climbing, backpacking in
          the Sierra Nevada, playing bass and guitar, and spending a bit too
          much time brewing the perfect cup of coffee.
        </Text>
      </Box>
    </Flex>
  </>
)
