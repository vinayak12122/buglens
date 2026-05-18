import React from 'react'
import {
  BadgePlus,
  CirclePile,
  Settings,
} from 'lucide-react'

const Sidebar = ({ selected, setSelected }) => {

  const tabs = [
    {
      id: "projects",
      label: "Projects",
      icon: CirclePile,
    },
    {
      id: "installation",
      label: "SDK Installation",
      icon: BadgePlus,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <div
      className=' group hidden sm:flex flex-col h-full w-14 hover:w-64 transition-all duration-300 border-r border-app-border overflow-hidden bg-app-bg p-2 shrink-0
      '
    >

      <div className='flex flex-col gap-2'>

        {
          tabs.map((tab) => {

            const Icon = tab.icon
            const isActive = selected === tab.id

            return (
              <div
                key={tab.id}
                onClick={() => setSelected(tab.id)}
                className={`
                  flex
                  items-center
                  gap-4
                  cursor-pointer
                  p-2
                  rounded
                  transition-all
                  duration-200

                  ${isActive
                    ? "bg-app-border text-app-text"
                    : "hover:bg-app-border text-app-text-h"
                  }
                `}
              >

                <Icon className='min-w-6' />

                <span
                  className='
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-200
                    whitespace-nowrap
                  '
                >
                  {tab.label}
                </span>

              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default Sidebar