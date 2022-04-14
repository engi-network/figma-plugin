import { useNavigate } from 'react-router'

import WorkingLaptop from '~/app/assets/images/laptop.svg'
import Button from '~/app/components/global/Button/Button'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { ui } from '~/app/lib/utils/ui-dictionary'

function Loading() {
  const navigate = useNavigate()

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <img src={WorkingLaptop} width={400} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center my-10">
        {ui('loading.analyzing')}
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
