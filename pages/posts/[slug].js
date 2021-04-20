/* eslint-disable */

import { createImageUrlBuilder, groq } from "next-sanity"
import client, { config } from "../../utils/sanity"

function urlFor(source) {
	return createImageUrlBuilder(config).image(source)
}

const Post = props => {
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
					<img src={urlFor(authorImage).width(50).url()} />
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

Post.getInitialProps = async function (context) {
	// It's important to default the slug so that it doesn't return "undefined"
	const { slug = "" } = context.query
	return await client.fetch(query, { slug })
}

export default Post
