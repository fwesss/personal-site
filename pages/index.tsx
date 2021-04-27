import Head from "next/head"
import { Box, Heading, Link, LinkBox, LinkOverlay } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import styles from "../styles/Home.module.css"
import sanity from "../utils/sanity-client"
import { Project as ProjectT } from "../studio/schema"
import Block from "../components/Block"
import { FadeContainer } from "../components/MotionContainer"

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ProjectProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

type Home = (props: { projects: ProjectProps }) => JSX.Element
const Home: Home = ({ projects }) => {
	return (
		<FadeContainer as="main">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Heading as="h1" size="4xl">
					Welcome to{" "}
					<Link href="https://nextjs.org" isExternal>
						Next.js!
					</Link>
				</Heading>

				<p className={styles.description}>
					Get started by editing{" "}
					<code className={styles.code}>pages/index.js</code>
				</p>

				<Link as={NextLink} href="/posts/test-1">
					Test Post
				</Link>
				<Link as={NextLink} href="/projects/planet-data">
					Planet Data
				</Link>

				{projects.map(project => (
					<LinkBox
						key={project._id}
						as="article"
						maxW="sm"
						p="5"
						borderWidth="1px"
						rounded="md"
					>
						<Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
							13 days ago
						</Box>
						<Heading size="md" my="2">
							<NextLink href={`/projects/${project.slug.current}`} passHref>
								<LinkOverlay>{project.title}</LinkOverlay>
							</NextLink>
						</Heading>
						<Block blocks={project.purpose} />
					</LinkBox>
				))}

				<div className={styles.grid}>
					<a href="https://nextjs.org/docs" className={styles.card}>
						<h3>Documentation &rarr;</h3>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className={styles.card}>
						<h3>Learn &rarr;</h3>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/master/examples"
						className={styles.card}
					>
						<h3>Examples &rarr;</h3>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={styles.card}
					>
						<h3>Deploy &rarr;</h3>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</FadeContainer>
	)
}

type GetStaticProps = () => Promise<{ props: ProjectT[] }>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async () => {
	const projects = await sanity.getAll("project")

	return { props: { projects } }
}

export default Home
