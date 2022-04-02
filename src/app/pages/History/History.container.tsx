import Button from '~/app/components/global/Button/Button'
import Dropdown from '~/app/components/global/Dropdown/Dropdown'
import Input from '~/app/components/global/Input/Input'
import HistoryHeader from '~/app/components/modules/History/HistoryHeader/HistoryHeader'
import { ui } from '~/app/lib/utils/ui-dictionary'

function Historycontainer() {
  const onSearchTermChange = () => {}
  const onSearch = () => {}

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
        <Dropdown items={[]} />
      </div>
    </>
  )
}

export default Historycontainer
