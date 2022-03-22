import { XIcon } from '@heroicons/react/solid'

import Logo from '~/app/assets/icons/common/logo.svg'
import { ui } from '~/app/lib/utils/ui-dictionary'

import styles from './Header.styles'

function Header() {
  return (
    <header className="bg-primary-white border-solid border-b border-wf-tertiary">
      <div className="flex justify-between items-center px-3.5 py-4">
        <div className="flex">
          <a href="#">
            <img className="h-8 w-auto sm:h-10" src={Logo} alt="engi" />
          </a>
          <h1 css={styles.title} className="ml-5 text-wf-primary">
            {ui('header.title')}
          </h1>
        </div>
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="mr-6 text-sm text-wf-secondary">
              {ui('header.learnMore')}
              <span className="text-wf-primary">
                {ui('header.companyName')}
              </span>
            </span>
            <XIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
