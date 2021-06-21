import { IconButton, Link, VStack } from "@chakra-ui/react"
import { Dispatch, FC, SetStateAction } from "react"
import { FaArrowUp, FaRegMap } from "react-icons/fa"
import { RiRotateLockFill } from "react-icons/ri"

interface ControlsProps {
  size: "base" | "xs" | "sm" | "md" | "lg" | "xl"
  setRotate: Dispatch<SetStateAction<boolean>>
  rotating: boolean
}

export const Controls: FC<ControlsProps> = ({ size, setRotate, rotating }) => {
  return size !== "xl" ? (
    <VStack bottom={6} position="fixed" right={4} zIndex={1000}>
      <IconButton
        aria-label="Scroll to top"
        as={Link}
        colorScheme="teal"
        href="#top"
        icon={<FaArrowUp />}
        isRound
      />
      <IconButton
        aria-label="Scroll to map"
        as={Link}
        colorScheme="teal"
        href="#map"
        icon={<FaRegMap />}
        isRound
      />
      <IconButton
        aria-label="Toggle auto rotation"
        colorScheme="teal"
        icon={<RiRotateLockFill />}
        isRound
        onClick={() => setRotate(!rotating)}
      />
    </VStack>
  ) : (
    <IconButton
      aria-label="Toggle auto rotation"
      bottom={6}
      colorScheme="teal"
      icon={<RiRotateLockFill />}
      position="fixed"
      right={4}
      size="lg"
      zIndex={1000}
      isRound
      onClick={() => setRotate(!rotating)}
    />
  )
}
