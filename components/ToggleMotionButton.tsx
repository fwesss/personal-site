import { IconButton, useToast } from "@chakra-ui/react"
import { useEffect, useContext, useCallback } from "react"
import { FaRegPauseCircle, FaPlayCircle } from "react-icons/fa"

import { WindowContext, MotionContext } from "../pages/_app"

const ToggleMotionButton = (): JSX.Element => {
  const { motionPref, update } = useContext(MotionContext)
  const windowState = useContext(WindowContext)
  const SwitchIcon = motionPref ? FaRegPauseCircle : FaPlayCircle
  const toast = useToast()

  const toggleMotion = useCallback(() => {
    update({ motionPref: !motionPref })
    toast({
      title: `Motion ${motionPref ? "disabled" : "enabled"}.`,
      description: `All movement based animations on this site have been ${
        motionPref ? "disabled" : "enabled"
      }.`,
      status: "info",
      duration: 4000,
    })
  }, [motionPref, toast, update])

  useEffect(() => {
    if (windowState) {
      window.CommandBar.addCallback("toggleMotion", toggleMotion)
    }
  }, [toggleMotion, windowState])

  return (
    <IconButton
      aria-label="Toggle motion preference"
      icon={<SwitchIcon />}
      pointerEvents="all"
      variant="ghost"
      isRound
      onClick={() => {
        toggleMotion()
      }}
    />
  )
}

export default ToggleMotionButton
