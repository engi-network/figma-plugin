import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

import { STEP_MESSAGES, STEPS } from '../Main/Main.types'

interface Props {
  step?: STEPS
}

type QueryState = null | Record<string, string>

function Loading({ step }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as QueryState) ?? {}

  const stepFromQuery = (state as Record<string, string>).step as unknown

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const internalStep = stepFromQuery
    ? (stepFromQuery as STEPS)
    : step
    ? step
    : STEPS.CLONE

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <Loader step={internalStep} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
        {STEP_MESSAGES[internalStep]}
      </h2>
      <div className="flex justify-center">
        <Button onClick={handleCreateNew} className="w-2/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
    </>
  )
}

export default Loading
