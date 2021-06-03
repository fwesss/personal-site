import { Icon, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"

interface ExternalLinkProps {
	text: string
	href: string
	display?: string
}

const ExternalLink: FC<ExternalLinkProps> = ({ text, href, display }) => (
	<NextLink href={href} passHref>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<Link alignItems="baseline" display={display || "flex"} isExternal>
			{text}
			<Icon
				as={FaExternalLinkAlt}
				boxSize="0.85em"
				mx={1}
				verticalAlign="baseline"
			/>
		</Link>
	</NextLink>
)

export default ExternalLink
