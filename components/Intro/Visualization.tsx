import {
	forceLink,
	forceSimulation,
	scaleQuantize,
	forceCollide,
	forceManyBody,
	ScaleQuantize,
} from "d3"
import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import useResizeObserver from "use-resize-observer"
import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"
import theme from "../../theme/index"
import forceBound from "./forceBound"

export const Visualization: FC = () => {
	// const parentRef = useRef(null) as MutableRefObject<null | HTMLDivElement>
	const canvasRef = useRef(null) as MutableRefObject<null | HTMLCanvasElement>

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
	const {
		ref: parentRef,
		width = 1000,
		height = 1000,
	} = useResizeObserver<HTMLDivElement>()

	useEffect(() => {
		if (width && height) {
			type GenNodes = (amount: number) => Node[]
			const genNodes: GenNodes = amount =>
				Array.from(Array(amount).keys()).map((_, i) => ({
					x: getRandomInt(1, width),
					y: getRandomInt(1, height),
					r: getRandomInt(minRadius, maxRadius),
					id: i,
				}))

			setNodes(genNodes(Math.floor((width * height) / density(0.35))))
		}
	}, [height, width])

	useEffect(() => {
		if (nodes) {
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

			const colors = (scaleQuantize()
				.domain([minRadius, maxRadius])
				.range(
					(Object.values(theme.colors.teal)
						.reverse()
						.slice(2, 8) as unknown) as number[]
				) as unknown) as ScaleQuantize<string | never>

			const canvas = canvasRef.current
			const context = canvas.getContext("2d")

			type DrawLink = (d: Link) => void
			const drawLink: DrawLink = d => {
				context.moveTo(d.source.x, d.source.y)
				context.lineTo(d.target.x, d.target.y)
			}

			type DrawNode = (d: Node) => void
			const drawNode: DrawNode = d => {
				context.moveTo(d.x + d.r, d.y)
				context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
			}

			const ticked = () => {
				context.clearRect(0, 0, width, height)

				context.beginPath()
				links.forEach(drawLink)
				context.strokeStyle = `${theme.colors.gray["200"]}88`
				context.stroke()

				nodes.forEach(node => {
					context.beginPath()
					drawNode(node)
					context.fillStyle = colors(node.r)
					context.fill()
					context.strokeStyle = colors(node.r)
				})
				context.stroke()
			}

			const simulation = forceSimulation(nodes)
				.force(
					"link",
					forceLink(links)
						.distance(d => d.distance)
						.strength(0.0004)
				)
				.force("collide", forceCollide().strength(0.1).iterations(1).radius(50))
				.force("charge", forceManyBody().strength(-2))
				.force("bound", forceBound(0.1, 50, 0, width, 0, height))
				.velocityDecay(0.2)
				.alphaDecay(0)

			simulation.on("tick", ticked)
		}
	}, [height, nodes, width])

	return (
		<Box
			ref={parentRef}
			w="100%"
			h="100%"
			position="absolute"
			top={0}
			zIndex={-1}
		>
			<motion.canvas
				id="vis"
				width={width}
				height={height}
				ref={canvasRef}
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.175 }}
			/>
		</Box>
	)
}
