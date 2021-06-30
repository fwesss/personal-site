import { IconButton, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { FaRegPauseCircle, FaPlayCircle } from "react-icons/fa"

import { MotionContext } from "../pages/_app"

const ToggleMotionButton = (): JSX.Element => {
  const { motionPref, update } = useContext(MotionContext)
  const SwitchIcon = motionPref ? FaRegPauseCircle : FaPlayCircle
  const toast = useToast()

  return (
    <IconButton
      aria-label="Toggle motion preference"
      icon={<SwitchIcon />}
      pointerEvents="all"
      variant="ghost"
      isRound
      onClick={() => {
        update({ motionPref: !motionPref })
        toast({
          title: `Motion ${motionPref ? "disabled" : "enabled"}.`,
          description: `All movement based animations on this site have been ${
            motionPref ? "disabled" : "enabled"
          }.`,
          status: "info",
          duration: 4000,
        })
      }}
    />
  )
}

export default ToggleMotionButton
