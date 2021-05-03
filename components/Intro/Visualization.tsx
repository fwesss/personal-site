import { Box, useInterval } from "@chakra-ui/react"
import {
	select,
	forceLink,
	forceSimulation,
	scaleQuantize,
	svg,
	forceManyBody,
	forceCenter,
	forceCollide,
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

	const [nodes, setnodes] = useState(undefined as Node[])
	const [links, setLinks] = useState(undefined as Link[])
	const [gravity, setGravity] = useState(-20)

	const colors = scaleQuantize()
		.domain([minRadius, maxRadius])
		.range(
			(Object.values(theme.colors.teal)
				.reverse()
				.slice(2, 8) as unknown) as number[]
		)

	useEffect(() => {
		type GenNodes = (amount: number, width: number, height: number) => Node[]
		const genNodes: GenNodes = (amount, width, height) =>
			Array.from(Array(amount).keys()).map((_, i) => ({
				x: getRandomInt(1, width),
				y: getRandomInt(1, height),
				r: getRandomInt(minRadius, maxRadius),
				id: i,
			}))

		if (parentRef.current) {
			const { offsetWidth: width, offsetHeight: height } = parentRef.current
			setnodes(
				genNodes(Math.floor((width * height) / density(0.7)), width, height)
			)
		}
	}, [parentRef])

	useEffect(() => {
		type GenLinks = (amount: number, nodesToConnect: Node[]) => Link[]
		const genLinks: GenLinks = (amount, nodesToConnect) =>
			Array.from(Array(amount).keys()).map(() => {
				const source =
					nodesToConnect[Math.floor(Math.random() * nodesToConnect.length)]
				const target =
					nodesToConnect[Math.floor(Math.random() * nodesToConnect.length)]
				const distance = getRandomInt(500, 750)

				return { source, target, distance }
			})

		if (parentRef.current && nodes) {
			const { offsetWidth: width, offsetHeight: height } = parentRef.current
			setLinks(genLinks(Math.floor((width * height) / density(1)), nodes))
		}
	}, [nodes, parentRef])

	useEffect(() => {
		const { offsetWidth: width, offsetHeight: height } = parentRef.current

		if (nodes && links) {
			const svgElement = select(svgRef.current)

			const simulation = forceSimulation(nodes)
				.force(
					"link",
					forceLink(links)
						.distance(d => d.distance)
						.strength(1)
				)
				.force("charge", forceManyBody().strength(gravity))
				.force("collide", forceCollide().strength(1).iterations(1).radius(50))
				.force("bound", forceBound(1, 50, 0, width, 0, height))
				.force(
					"center",
					forceCenter()
						.x(width / 2)
						.y(height / 2)
						.strength(1)
				)
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
				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y)

				node.attr("cx", d => d.x).attr("cy", d => d.y)
			})
		}
	}, [colors, gravity, links, nodes])

	useInterval(() => {
		setGravity(gravity < 0 ? getRandomInt(20, 40) : getRandomInt(-40, -20))
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
