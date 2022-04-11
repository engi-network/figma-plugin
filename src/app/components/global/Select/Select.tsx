import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'

import { ui } from '~/app/lib/utils/ui-dictionary'

import styles from './Select.styles'

export interface SelectOption {
  name: string
  value: string
}

interface SelectProps {
  className?: string
  onChange: (value: string) => void
  options: Array<SelectOption>
  placeholder?: string
  value?: string
}

function Select({
  options,
  onChange,
  value,
  placeholder,
  className,
}: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<SelectOption>()

  const handleSelectChange = (option: SelectOption) => {
    onChange(option.value)
    setSelectedOption(option)
  }

  useEffect(() => {
    if (!value) {
      return
    }

    const option = options.find((option) => option.value === value)
    setSelectedOption(option)
  }, [value])

  const label = selectedOption
    ? selectedOption.name
    : placeholder || ui('components.select.placeholder')

  return (
    <div className={className}>
      <Listbox value={selectedOption} onChange={handleSelectChange}>
        <div className="relative mt-1">
          <Listbox.Button className="flex justify-between items-center w-full p-2  text-sm text-left text-wf-primary cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
            <span className="block truncate">{label}</span>
            <span className="flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-4 h-4 text-wf-primary"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 overflow-auto bg-white rounded-2xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
              css={styles.optionPanel}
            >
              {options.map((option) => (
                <Listbox.Option key={option.value} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`cursor-default select-none relative text-sm ${
                        active
                          ? 'text-primary-dark bg-wf-bg'
                          : 'text-wf-primary'
                      }`}
                      css={styles.option}
                    >
                      <span className="block truncate">{option.name}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-primary-dark">
                          <CheckIcon className="w-4 h-4" aria-hidden="true" />
                        </span>
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Select
