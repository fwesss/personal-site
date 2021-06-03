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
			className={styles.link}
			colorScheme="teal"
			fontSize={{ base: "sm" }}
			size={size}
			w={{ base: "40%", sm: "30%" }}
		>
			{"Read More ==>"}
		</Button>
	</NextLink>
)
