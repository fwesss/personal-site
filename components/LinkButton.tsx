import { Button, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import * as React from "react"
import { FC } from "react"
import styles from "../styles/Global.module.css"

interface LinkButtonProps {
	href: string
	size?: string
}

export const LinkButton: FC<LinkButtonProps> = ({ href, size }) => (
	<NextLink href={href}>
		<Button
			as={Link}
			w={{ base: "40%", sm: "30%" }}
			colorScheme="blue"
			className={styles.link}
			size={size}
			fontSize={{ base: "sm" }}
		>
			{"Read More ==>"}
		</Button>
	</NextLink>
)
