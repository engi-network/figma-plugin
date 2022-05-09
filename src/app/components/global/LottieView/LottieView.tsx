import { useLottie } from 'lottie-react'

interface Props {
  animation: unknown
}

function LottieView({ animation }: Props) {
  const options = {
    animationData: animation,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options)

  return View
}

export default LottieView
