import { Icon, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FC } from "react"

interface ExternalLinkProps {
	text: string
	href: string
	display?: string
}

const ExternalLink: FC<ExternalLinkProps> = ({ text, href, display }) => (
	<NextLink href={href} passHref>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<Link display={display || "flex"} alignItems="baseline" isExternal>
			{text}
			<Icon
				as={FaExternalLinkAlt}
				verticalAlign="baseline"
				mx={1}
				boxSize="0.85em"
			/>
		</Link>
	</NextLink>
)

export default ExternalLink
