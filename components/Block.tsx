import {
  As,
  Code,
  Heading,
  Text,
  Link,
  ListItem,
  OrderedList,
  StylesProvider,
  UnorderedList,
  useMultiStyleConfig,
  Box,
} from "@chakra-ui/react"
import BlockContent, {
  BlockContentProps,
  WrappedComponent,
} from "@sanity/block-content-to-react"
import React, { ReactNode } from "react"

import ExternalLink from "./ExternalLink"

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

type BlockRenderer = (props: {
  node: { style: string }
  children: ReactNode
  size: string
}) => JSX.Element
const block: BlockRenderer = ({
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

    const convertTag = inTag => {
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

    return (
      <Heading as={convertTag(tag)} size={size || getSize(convertTag(tag)[1])}>
        {children}
      </Heading>
    )
  }

  return <Text textStyle="paragraph">{children}</Text>
}

const code: WrappedComponent = ({ children }) => <Code>{children}</Code>

type Link = (props: {
  children: string
  mark: { _type: string; href: string }
}) => JSX.Element
const link: Link = ({ children, mark }) =>
  mark._type === "link" && (
    <ExternalLink display="inline-flex" href={mark.href} text={children} />
  )

type Block = (props: BlockContentProps) => JSX.Element
const Block: Block = ({ blocks }) => (
  <BlockContent
    blocks={blocks}
    serializers={{
      types: { block },
      marks: { link, code },
      list: listType,
      listItem: WrappedListItem,
      container: WrappedContainer,
    }}
  />
)

export default Block
