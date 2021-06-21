import {
  Container,
  Heading,
  HStack,
  IconButton,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react"
import type { FeatureCollection } from "geojson"
import { FC } from "react"
import { FaExpand, FaWindowMinimize } from "react-icons/fa"

import { IndexedAdventure } from "../../pages/adventures"
import type { Fly } from "../../pages/adventures"
import theme from "../../theme/index"
import Block from "../Block"

interface StoryProps {
  size: "base" | "xs" | "sm" | "md" | "lg" | "xl"
  activeAdventure: IndexedAdventure
  dataset: string
  fly: Fly
  projectId: string
  tracks: FeatureCollection[]
}

export const Story: FC<StoryProps> = ({
  size,
  activeAdventure,
  dataset,
  fly,
  projectId,
  tracks,
}) => {
  const [minimized, setMinimized] = useBoolean(false)

  return (
    <Container
      _hover={{
        bg: useColorModeValue(
          theme.colors.gray["50"],
          theme.colors.gray["900"]
        ),
      }}
      bg={useColorModeValue(
        `${theme.colors.gray["50"]}CB`,
        `${theme.colors.gray["900"]}CB`
      )}
      left={4}
      maxH={minimized ? "3.5rem" : "88%"}
      maxW={{ base: "100vw", xl: "3xl" }}
      my={{ base: 0, xl: 4 }}
      overflowY={minimized ? "hidden" : "auto"}
      position={{ xl: "absolute" }}
      px={12}
      py={{ base: 16, xl: minimized ? 2 : 8 }}
      sx={{ backdropFilter: "blur(4px)" }}
      transition="all 0.2s"
      zIndex={1000}
    >
      <HStack
        justify="flex-end"
        mt={-10}
        position="sticky"
        top={0}
        zIndex={1000}
      >
        {size === "xl" &&
          (minimized ? (
            <IconButton
              aria-label="Expand panel"
              icon={<FaExpand />}
              variant="ghost"
              onClick={setMinimized.toggle}
            />
          ) : (
            <IconButton
              aria-label="Minimize panel"
              icon={<FaWindowMinimize />}
              variant="ghost"
              onClick={setMinimized.toggle}
            />
          ))}
      </HStack>

      <Heading as="h2">{activeAdventure.title}</Heading>
      <Block
        activeAdventure={activeAdventure}
        blocks={activeAdventure.stories}
        dataset={dataset}
        fly={fly}
        projectId={projectId}
        tracks={tracks}
      />
    </Container>
  )
}
