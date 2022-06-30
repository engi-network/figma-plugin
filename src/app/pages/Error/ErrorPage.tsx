import { InformationCircleIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import ErrorLaptop from '~/app/components/global/Icons/ErrorLaptop'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

import styles from './ErrorPage.styles'

interface Props {
  ctaTitle?: string
  message?: string
  onClick?: () => void
}

function ErrorPage({
  onClick,
  message,
  ctaTitle = ui('error.checkInput'),
}: Props) {
  const { globalError } = useAppContext()
  const navigate = useNavigate()

  const handleCheckInput = () => {
    onClick && onClick()
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="flex justify-center">
        <ErrorLaptop />
      </div>
      <div className="flex px-12 mt-10 justify-center items-center">
        <span
          className="text-sm text-[#FA7B7B] flex font-medium"
          role="alert"
          css={styles.alert}
        >
          <InformationCircleIcon className="w-5 h-5 text-[#FA7B7B] mr-2" />
          {message || globalError || ui('error.globalError')}
        </span>
      </div>
      <div className="flex justify-center w-full mt-9">
        <Button onClick={handleCheckInput} className="uppercase">
          {ctaTitle}
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
