import { Icon, Link } from "@chakra-ui/react"
import { FaExternalLinkAlt } from "react-icons/fa"

type ExternalLink = (props: {
	text: string
	href: string
	display?: string
}) => JSX.Element
const ExternalLink: ExternalLink = ({ text, href, display }) => (
	<Link
		href={href}
		display={display || "flex"}
		alignItems="baseline"
		isExternal
	>
		{text}
		<Icon
			as={FaExternalLinkAlt}
			verticalAlign="baseline"
			mx={1}
			boxSize="0.85em"
		/>
	</Link>
)

export default ExternalLink
