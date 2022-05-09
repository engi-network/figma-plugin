import LottieView from '~/app/components/global/LottieView/LottieView'
import { mapStepToAnimation } from '~/app/lib/utils/animations'
import { STEPS } from '~/app/pages/Main/Main.types'

interface Props {
  step: STEPS
}

function Loader({ step }: Props) {
  const data = mapStepToAnimation[step]

  if (!data) {
    return null
  }

  return (
    <div>
      <LottieView animation={data} />
    </div>
  )
}

export default Loader
