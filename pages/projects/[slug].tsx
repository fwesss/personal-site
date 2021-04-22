import { groq } from "next-sanity"
import { Text, Heading, HStack, Link } from "@chakra-ui/react"
import { FaExternalLinkAlt } from "react-icons/fa"
import client, { config } from "../../utils/sanity"

interface ProjectProps {
	title: string
	deployedUrl: string
}

const Project = ({ title, deployedUrl }: ProjectProps): JSX.Element => {
	return (
		<>
			<Heading>{title}</Heading>
			<Link href={deployedUrl} isExternal>
				<HStack>
					<Text>Demo</Text>
					<FaExternalLinkAlt />
				</HStack>
			</Link>
		</>
	)
}

const query = groq`*[_type == "project" && slug.current == $slug][0]{
 title,
 mainImage,
 deployedUrl,
 repoUrl,
 purpose,
 keyFeatures,
 techStack,
 devDiary,
 knowledgeGained,
 challenges,
 different,
 screenshots,
 tags 
}`

Project.getInitialProps = async (context: { query: { slug?: "" } }) => {
	const { slug = "" } = context.query
	return client.fetch(query, { slug })
}

export default Project
