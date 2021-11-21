import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import * as React from "react"
import { FC } from "react"
import { IconBaseProps } from "react-icons"
import { DiCode } from "react-icons/di"
import { IoLogoVercel } from "react-icons/io5"
import {
  SiTypescript,
  SiJavascript,
  SiHaskell,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiD3Dotjs,
  SiJest,
  SiPython,
  SiMapbox,
  SiWebgl,
} from "react-icons/si"

interface TechTagProps {
  tech: string
  variant?: string
  size?: string
}

export const TechTag: FC<TechTagProps> = ({
  tech,
  variant = "solid",
  size = "md",
}) => {
  const icons: {
    [key: string]: FC<IconBaseProps>
  } = {
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    Haskell: SiHaskell,
    "Next.js": SiNextdotjs,
    React: SiReact,
    Redux: SiRedux,
    D3: SiD3Dotjs,
    Jest: SiJest,
    Python: SiPython,
    Mapbox: SiMapbox,
    Vercel: IoLogoVercel,
    WebGL: SiWebgl,
  }

  return (
    <Tag colorScheme="teal" size={size} variant={variant}>
      <TagLeftIcon as={icons[tech] || DiCode} title={`${tech} logo`} />
      <TagLabel>{tech}</TagLabel>
    </Tag>
  )
}
