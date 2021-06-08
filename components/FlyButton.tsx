import { Button } from "@chakra-ui/react"
import type { FC } from "react"

interface FlyButtonProps {
  clickFn: () => void
}

const FlyButton: FC<FlyButtonProps> = ({ clickFn, children }) => {
  return (
    <Button
      as="h3"
      fontSize={28}
      size="lg"
      variant="link"
      onClick={() => clickFn}
    >
      {children}
    </Button>
  )
}

const Enhanced = (clickFn: () => void): JSX.Element => (
  <FlyButton clickFn={clickFn} />
)

export default Enhanced
