import Head from "next/head"
import React from "react"

import { Contact } from "../components/Contact/Contact"
import { Intro } from "../components/Intro/Intro"
import { FadeBox } from "../components/MotionComponents"
import { Projects } from "../components/Projects/Projects"
import { Project as ProjectT } from "../studio/schema"
import sanity from "../utils/sanity-client"

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ProjectProps = UnwrapPromise<ReturnType<typeof getStaticProps>>["props"]

type Home = (props: { projects: ProjectProps }) => JSX.Element
const Home: Home = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Wes Feller | Web Dev</title>
      </Head>

      <FadeBox as="main">
        <Intro />
        <Projects projects={projects} sectionName="Projects" />
        <Contact sectionName="Contact" />
      </FadeBox>
    </>
  )
}

type GetStaticProps = () => Promise<{ props: ProjectT[] }>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async () => {
  const projects = await sanity.getAll("project")

  type SortProjects = (projectsToSort: ProjectT[]) => ProjectT[]
  const sortProjects: SortProjects = projectsToSort =>
    projectsToSort.sort((a, b) => a.order - b.order)

  return { props: { projects: sortProjects(projects) } }
}

export default Home
