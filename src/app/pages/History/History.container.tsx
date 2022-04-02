import { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import Input from '~/app/components/global/Input/Input'
import Select, { SelectOption } from '~/app/components/global/Select/Select'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { ui } from '~/app/lib/utils/ui-dictionary'

const sortBy: Array<SelectOption> = [
  { value: 'component', name: 'Component' },
  { value: 'branch', name: 'Branch' },
  { value: 'commit', name: 'Commit' },
]

function Historycontainer() {
  const onSearchTermChange = () => {}
  const onSearch = () => {}
  const [selectedOption, setSelectedOption] = useState<string>('')

  const onSelectChange = (value: string) => {
    setSelectedOption(value)
  }

  return (
    <>
      <HistoryHeader />
      <div className="p-8">
        <h2 className="text-2xl text-black mb-5 font-bold">
          {ui('history.history')}
        </h2>
        <div className="flex">
          <Input
            onChange={onSearchTermChange}
            placeholder={'Search...'}
            className=""
          />
          <Button
            onClick={onSearch}
            backgroundColor="#18A0FB"
            primary
            className="ml-8"
          >
            {ui('history.search')}
          </Button>
        </div>
      </div>
      <div>
        <Select
          options={sortBy}
          onChange={onSelectChange}
          value={selectedOption}
          placeholder="Select one..."
        />
      </div>
    </>
  )
}

export default Historycontainer
