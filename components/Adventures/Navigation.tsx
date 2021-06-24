import {
  Button,
  Center,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"

import type { IndexedAdventure, Fly } from "../../pages/adventures"
import { parseViewport } from "../../pages/adventures"
import type { Adventure } from "../../studio/schema"
import theme from "../../theme/index"

interface NavigationProps {
  adventures: Adventure[]
  setActiveAdventure: Dispatch<SetStateAction<IndexedAdventure>>
  fly: Fly
  rotateCamera: () => void
  rotating: boolean
}

export const Navigation: FC<NavigationProps> = ({
  adventures,
  setActiveAdventure,
  fly,
  rotateCamera,
  rotating,
}) => {
  const buttonHoverColor = useColorModeValue("teal.600", "teal.200")

  const goToAdventure = (
    adventure: Adventure,
    adventureIndex: number
  ): void => {
    fly(parseViewport(adventure.initialView))
    setActiveAdventure({ ...adventure, index: adventureIndex })
    if (rotating) {
      rotateCamera()
    }
  }

  return (
    <Center
      _hover={{
        bg: useColorModeValue(
          theme.colors.gray["50"],
          theme.colors.gray["900"]
        ),
      }}
      align="center"
      background={useColorModeValue("white", "gray.800")}
      bg={useColorModeValue(
        `${theme.colors.gray["50"]}CB`,
        `${theme.colors.gray["900"]}CB`
      )}
      borderRadius="xl"
      boxShadow="xl"
      my={{ base: 0, xl: 4 }}
      position={{ xl: "absolute" }}
      px={6}
      py={{ base: 0, xl: 6 }}
      right={4}
      sx={{ backdropFilter: "blur(4px)" }}
      transition="all 0.2s"
      zIndex={1000}
    >
      <UnorderedList listStyleType="none" marginInlineStart={0}>
        {adventures.map((adventure, adventureIndex) => (
          <ListItem key={adventure._id} mb={2}>
            <Button
              _active={{
                borderColor: "currentcolor",
                color: buttonHoverColor,
              }}
              _hover={{
                borderColor: "currentcolor",
                color: buttonHoverColor,
              }}
              borderBottom="2px"
              borderColor={{ base: "teal.600", xl: "transparent" }}
              borderRadius={0}
              colorScheme="teal"
              pointerEvents="all"
              transition="all 0.2s"
              variant="unstyled"
              onClick={() => {
                goToAdventure(adventure, adventureIndex)
              }}
            >
              {adventure.title}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
    </Center>
  )
}
