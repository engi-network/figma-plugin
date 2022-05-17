import { InformationCircleIcon } from '@heroicons/react/outline'

import Button from '~/app/components/global/Button/Button'
import Header from '~/app/components/global/Header/Header'
import Code from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import { useAppContext } from '~/app/contexts/App.context'
import { useMainContext } from '~/app/contexts/Main.context'
import { ui } from '~/app/lib/utils/ui-dictionary'

import { DEMENSIONS } from './Main.container.data'

function Main() {
  const {
    handleSubmit,
    draw,
    selectionData,
    isLoading,
    handleChange,
    formValues,
    formErrors,
    originCanvasRef,
  } = useMainContext()
  const { globalError } = useAppContext()

  const { width = 0, height = 0 } = selectionData || {}

  const isDisabled = !!isLoading || !!globalError

  return (
    <>
      <Header numberOfProgress={2} />
      <h3 className="text-base text-text-primary font-meidum px-7 pt-4">
        {ui('main.subtitle')}
      </h3>
      <div className="flex px-10 pt-9">
        <section className="w-1/2 flex flex-col items-end">
          <Preview
            draw={draw}
            originalCanvasRef={originCanvasRef}
            label={isDisabled ? undefined : `${width} ✕ ${height}`}
            {...DEMENSIONS.SMALL}
          />
        </section>
        <section className="w-1/2">
          <Code
            onChange={handleChange}
            values={formValues}
            errors={formErrors}
            isDisabled={isLoading}
          />
        </section>
      </div>
      {globalError && (
        <div className="flex px-12 mt-5 justify-center items-center">
          <span className="text-sm text-secondary-error flex">
            <InformationCircleIcon className="w-5 h-5 text-secondary-error mr-2" />
            {globalError}
          </span>
        </div>
      )}
      <footer className="flex justify-end px-6 my-8">
        <Button onClick={handleSubmit} className="w-3/12" disabled={isLoading}>
          {ui('main.analyze')}
        </Button>
      </footer>
    </>
  )
}

export default Main
