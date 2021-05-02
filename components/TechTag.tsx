import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import * as React from "react"
import { FC } from "react"
import {
	SiTypescript,
	SiJavascript,
	SiHaskell,
	SiNextDotJs,
	SiReact,
	SiRedux,
	SiD3DotJs,
	SiJest,
	SiPython,
	SiMapbox,
} from "react-icons/si"
import { DiCode } from "react-icons/di"
import { IoLogoVercel } from "react-icons/io5"
import { IconBaseProps } from "react-icons"

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
		"Next.js": SiNextDotJs,
		React: SiReact,
		Redux: SiRedux,
		D3: SiD3DotJs,
		Jest: SiJest,
		Python: SiPython,
		Mapbox: SiMapbox,
		Vercel: IoLogoVercel,
	}

	return (
		<Tag variant={variant} size={size} colorScheme="teal">
			<TagLeftIcon as={icons[tech] || DiCode} title={`${tech} logo`} />
			<TagLabel>{tech}</TagLabel>
		</Tag>
	)
}
