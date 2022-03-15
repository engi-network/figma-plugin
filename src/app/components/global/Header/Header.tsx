import Navigation from '~/app/components/modules/Navigation/Navigation'

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start">
          <a href="#">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="engi"
            />
          </a>
        </div>
        <div className="flex-1">
          <Navigation />
        </div>
        <div>Learn more</div>
      </div>
    </header>
  )
}

export default Header
