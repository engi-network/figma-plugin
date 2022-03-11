function Header() {
  return (
    <header>
      <div className="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="engi"
            />
          </a>
        </div>
        <a
          href="#"
          className="text-base font-medium text-gray-400 hover:text-gray-200"
        >
          About
        </a>
        <a
          href="#"
          className="text-base font-medium text-gray-400 hover:text-gray-200"
        >
          Contact
        </a>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
      </div>
    </header>
  )
}

export default Header
