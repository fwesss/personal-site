import { createImageUrlBuilder, groq } from "next-sanity"
import client, { config } from "../../utils/sanity"

function urlFor(source) {
	return createImageUrlBuilder(config).image(source)
}

interface PostProps {
	title: string
	name: string
	categories: [string]
	authorImage: string
}

const Post = (props: PostProps): JSX.Element => {
	const {
		title = "Missing title",
		name = "Missing name",
		categories,
		authorImage,
	} = props
	return (
		<article>
			<h1>{title}</h1>
			<span>By {name}</span>
			{categories && (
				<ul>
					Posted in
					{categories.map(category => (
						<li key={category}>{category}</li>
					))}
				</ul>
			)}
			{authorImage && (
				<div>
					<img src={urlFor(authorImage).width(50).url()} alt={name} />
				</div>
			)}
		</article>
	)
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

Post.getInitialProps = async (context: { query: { slug?: "" } }) => {
	// It's important to default the slug so that it doesn't return "undefined"
	const { slug = "" } = context.query
	return client.fetch(query, { slug })
}

export default Post
