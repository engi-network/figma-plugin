import { useLottie } from 'lottie-react'

import Loading from '~/app/assets/animations/loading.json'

function Loader() {
  const options = {
    animationData: Loading,
    loop: true,
    autoplay: true,
  }

  const { View } = useLottie(options)

  return View
}

export default Loader
