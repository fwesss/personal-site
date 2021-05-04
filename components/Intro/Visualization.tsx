import { Box, useInterval } from "@chakra-ui/react"
import {
	select,
	forceLink,
	forceSimulation,
	scaleQuantize,
	svg,
	forceCollide,
	forceManyBody,
} from "d3"
import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import theme from "../../theme/index"
import forceBound from "./forceBound"

export const Visualization: FC = () => {
	const parentRef = useRef(null) as MutableRefObject<null | HTMLDivElement>
	const svgRef = useRef()

	const getRandomInt = (min, max) =>
		Math.floor(
			Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
		)

	type CX = number
	type CY = number
	type R = number
	type Id = number

	type Node = { x: CX; y: CY; r: R; id: Id }
	type Link = {
		source: Node
		target: Node
		distance: number
	}

	const minRadius = 6
	const maxRadius = 35
	const density = (factor = 1) => factor * 200000

	const [nodes, setNodes] = useState(undefined as Node[])
	const [reLink, setReLink] = useState(false)

	useEffect(() => {
		const { offsetWidth: width, offsetHeight: height } = parentRef.current
		type GenNodes = (amount: number) => Node[]
		const genNodes: GenNodes = amount =>
			Array.from(Array(amount).keys()).map((_, i) => ({
				x: getRandomInt(1, width),
				y: getRandomInt(1, height),
				r: getRandomInt(minRadius, maxRadius),
				id: i,
			}))

		setNodes(genNodes(Math.floor((width * height) / density(0.35))))
	}, [])

	useEffect(() => {
		if (nodes) {
			const { offsetWidth: width, offsetHeight: height } = parentRef.current
			let links: Link[] = []

			type GenLinks = (amount: number) => Link[]
			const genLinks: GenLinks = amount =>
				Array.from(Array(amount).keys()).map(() => {
					const source = nodes[Math.floor(Math.random() * nodes.length)]
					const target = nodes[Math.floor(Math.random() * nodes.length)]
					const distance = getRandomInt(150, width * 0.6)

					return { source, target, distance }
				})

			links = genLinks(Math.floor((width * height) / density(1)))
			setReLink(false)

			const colors = scaleQuantize()
				.domain([minRadius, maxRadius])
				.range(
					(Object.values(theme.colors.teal)
						.reverse()
						.slice(2, 8) as unknown) as number[]
				)

			const svgElement = select(svgRef.current)

			const simulation = forceSimulation(nodes)
				.force(
					"link",
					forceLink(links)
						.distance(d => d.distance)
						.strength(0.006)
				)
				.force(
					"collide",
					forceCollide().strength(0.5).iterations(1).radius(100)
				)
				.force("charge", forceManyBody().strength(-20))
				.force("bound", forceBound(0.1, 25, 0, width, 0, height))
				.alphaDecay(0)

			const link = svgElement
				.selectAll("line")
				.data(links)
				.join("line")
				.attr("stroke", theme.colors.gray["200"])
				.attr("opacity", 0)

			const node = svgElement
				.selectAll("circle")
				.data(nodes)
				.enter()
				.append("circle")
				.attr("r", 0)
				.attr("cx", d => d.x)
				.attr("cy", d => d.y)
				.attr("fill", d => colors(d.r))

			node
				.transition()
				.duration(400)
				.delay(() => Math.random() * 400)
				.attr("r", d => d.r)

			link.transition().duration(1400).attr("opacity", 0.5)

			simulation.on("tick", () => {
				node.attr("cx", d => d.x).attr("cy", d => d.y)

				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y)
			})
		}
	}, [nodes, reLink])

	useInterval(() => {
		setReLink(true)
	}, 7500)

	return (
		<Box
			ref={parentRef}
			w="100%"
			h="100%"
			position="absolute"
			top={0}
			zIndex={-1}
		>
			<svg width="100%" height="100%" ref={svgRef} />
		</Box>
	)
}
