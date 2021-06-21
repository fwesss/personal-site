import {
  As,
  Button,
  Code,
  Heading,
  Text,
  Link,
  ListItem,
  OrderedList,
  StylesProvider,
  UnorderedList,
  useMultiStyleConfig,
  useColorModeValue,
  Box,
} from "@chakra-ui/react"
import BlockContent, {
  BlockContentProps,
  WrappedComponent,
} from "@sanity/block-content-to-react"
import { FeatureCollection } from "geojson"
import React, { ReactNode } from "react"
import type { FC } from "react"
import { FaSearchLocation } from "react-icons/fa"

import type { Fly, ParseViewport } from "../pages/adventures"
import { parseViewport } from "../pages/adventures"
import { Project } from "../studio/schema"
import type { Adventure } from "../studio/schema"

import ExternalLink from "./ExternalLink"
import { ImageWithCaption } from "./ImageWithCaption"

interface ActiveAdventure extends Adventure {
  index: number
}

const WrappedUnorderedList: WrappedComponent = ({ children }) => {
  const styles = useMultiStyleConfig("ul", {})

  return (
    <StylesProvider value={styles}>
      <UnorderedList>{children}</UnorderedList>
    </StylesProvider>
  )
}

const WrappedOrderedList: WrappedComponent = ({ children }) => {
  const styles = useMultiStyleConfig("ul", {})

  return (
    <StylesProvider value={styles}>
      <OrderedList>{children}</OrderedList>
    </StylesProvider>
  )
}

type ListType = (props: { children: ReactNode; type: string }) => JSX.Element
const listType: ListType = ({ children, type }) =>
  type === "number" ? (
    <WrappedOrderedList>{children}</WrappedOrderedList>
  ) : (
    <WrappedUnorderedList>{children}</WrappedUnorderedList>
  )

const WrappedListItem: WrappedComponent = ({ children }) => {
  const styles = useMultiStyleConfig("li", {})

  return (
    <StylesProvider value={styles}>
      <ListItem fontSize="lg">{children}</ListItem>
    </StylesProvider>
  )
}

const WrappedContainer: WrappedComponent = ({ children }) => {
  const styles = useMultiStyleConfig("div", {})

  return (
    <StylesProvider value={styles}>
      <Box>{children}</Box>
    </StylesProvider>
  )
}

type BlockRenderer = (
  fly: Fly,
  tracks: FeatureCollection[],
  activeAdventure: ActiveAdventure
) => (props: {
  node: { style: string }
  children: string
  size: string
}) => JSX.Element
const block: BlockRenderer = (fly, tracks, activeAdventure) => ({
  node: { style = "normal" },
  children,
  size,
}) => {
  if (/^h\d/.test(style)) {
    const tag = `h${style.replace(/[^\d]/g, "")}` as As

    const getSize = (level: string): string => {
      switch (level) {
        case "6":
          return "sm"
        case "5":
          return "md"
        case "4":
          return "lg"
        case "3":
          return "xl"
        case "2":
          return "2xl"
        case "1":
          return "3xl"
        default:
          return "xl"
      }
    }

    const convertTag = (inTag: As<any>) => {
      switch (inTag) {
        case "h1":
          return "h3"
        case "h2":
          return "h4"
        case "h3":
          return "h5"
        default:
          return "h6"
      }
    }

    const [maybeAt, maybeNumber, maybeTitle] = children[0].split("_")

    return maybeAt === "@" ? (
      <Button
        _hover={{
          borderColor: "currentcolor",
          color: useColorModeValue("teal.600", "teal.200"),
        }}
        as={Link}
        borderColor="transparent"
        borderRadius={0}
        colorScheme="teal"
        fontSize={28}
        href="#map"
        pointerEvents="all"
        rightIcon={<FaSearchLocation size="0.75em" />}
        size="lg"
        transition="all 0.2s"
        variant="link"
        onClick={() =>
          fly(
            parseViewport(
              tracks[activeAdventure.index].features
                .filter(feature => feature.geometry.type === "Point")
                .filter(
                  feature =>
                    (feature.properties.name as string).split(" ")[0] ===
                    maybeNumber
                )[0].properties.cmt
            )
          )
        }
      >
        {maybeTitle}
      </Button>
    ) : (
      <Heading as={convertTag(tag)} size={size || getSize(convertTag(tag)[1])}>
        {children}
      </Heading>
    )
  }

  return <Text textStyle="paragraph">{children}</Text>
}

interface ImageRendererProps {
  node: Project["mainImage"]
}
const ImageRenderer: FC<ImageRendererProps> = ({ node }) => (
  <ImageWithCaption image={node} mb={4} size="md" />
)

const code: WrappedComponent = ({ children }) => <Code>{children}</Code>

type Link = (props: {
  children: string
  mark: { _type: string; href: string }
}) => JSX.Element
const link: Link = ({ children, mark }) =>
  mark._type === "link" && (
    <ExternalLink display="inline-flex" href={mark.href} text={children} />
  )

interface CustomBlockContentProps extends BlockContentProps {
  fly?: Fly
  parseViewport?: ParseViewport
  tracks?: FeatureCollection[]
  activeAdventure?: ActiveAdventure
}

type Block = (props: CustomBlockContentProps) => JSX.Element
const Block: Block = ({
  blocks,
  projectId,
  dataset,
  fly,
  tracks,
  activeAdventure,
}) => (
  <BlockContent
    blocks={blocks}
    dataset={dataset}
    projectId={projectId}
    serializers={{
      types: {
        block: block(fly, tracks, activeAdventure),
        image: ImageRenderer,
      },
      marks: { link, code },
      list: listType,
      listItem: WrappedListItem,
      container: WrappedContainer,
    }}
  />
)

export default Block
