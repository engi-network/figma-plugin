import { InformationCircleIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import ErrorLaptop from '~/app/components/global/Icons/ErrorLaptop'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

function ErrorPage() {
  const { globalError } = useAppContext()
  const navigate = useNavigate()

  const handleCheckInput = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <ErrorLaptop />
      </div>
      <div className="flex px-12 mt-10 justify-center items-center">
        <span className="text-sm text-secondary-error flex">
          <InformationCircleIcon className="w-5 h-5 text-secondary-error mr-2" />
          {globalError}
        </span>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCheckInput} className="w-2/12 uppercase">
          {ui('error.checkInput')}
        </Button>
      </div>
    </>
  )
}

export default ErrorPage
