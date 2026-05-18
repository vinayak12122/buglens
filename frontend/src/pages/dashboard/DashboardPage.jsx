import React, { useState } from 'react'
import Header from '../../components/layout/dashboard/Header'
import Sidebar from '../../components/layout/dashboard/Sidebar'
import Projects from './Projects'
import DashBoardSettings from './DashBoardSettings'
import Installation from '../../components/layout/dashboard/Installation'
import { Menu, User, X } from 'lucide-react'
import ProjectMenuPage from '../../components/ui/ProjectMenuPage'
import { useAuth } from '../../context/AuthContext'

const DashboardPage = () => {

  const [selected, setSelected] = useState("projects")
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useAuth();

  const getLetter = (name) =>{
    if (!name) return "?";
    const nameParts = name.trim().split(/\s+/)
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    const firstLetter = nameParts[0].charAt(0);
    const lastLetter = nameParts[nameParts.length - 1].charAt(0);
    return (firstLetter + lastLetter).toUpperCase();
  }

  return (
    <div className='h-screen flex flex-col overflow-hidden'>

      <Header />

      <div className='flex flex-1 overflow-hidden'>

        <Sidebar
          selected={selected}
          setSelected={setSelected}
        />


        <div className="sm:hidden fixed top-0 left-0 right-0 h-14 bg-app-bg border-b border-app-border z-50 flex items-center px-4">
          <button
            onClick={() =>
              setOpenMenu(prev => !prev)
            }
            className="p-2 rounded-lg hover:bg-app-text/5 transition"
          >
            <Menu size={20} />
          </button>

          <p
            className={`
      ml-4 text-app-text text-lg tracking-wide font-semibold
      transition-opacity duration-300
      ${openMenu
                ? "opacity-0"
                : "opacity-100"
              }
    `}
          >
            BugLens
          </p>
        </div>

        <div
          onClick={() =>
            setOpenMenu(false)
          }
          className={`
    fixed inset-0 bg-black/50 z-40 sm:hidden
    transition-opacity duration-300
    ${openMenu
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
            }
  `}
        />
        <div
          className={`
    fixed top-0 left-0 h-screen w-[80%] max-w-xs
    bg-app-bg border-r border-app-border
    z-50 sm:hidden flex flex-col justify-between
    transition-transform duration-300 ease-in-out
    ${openMenu
              ? "translate-x-0"
              : "-translate-x-full"
            }
  `}
        >
          <div>
            <div className='w-full flex items-center justify-between p-4'>
              <p className='text-app-text text-2xl tracking-wider font-rogbold'>
                BugLens
              </p>
              <div className='flex justify-end'>
                <X onClick={() => setOpenMenu(false)} className='hover:bg-app-text/5 rounded p-2 h-max w-max cursor-pointer' />
              </div>
            </div>
            <ProjectMenuPage
              setOpenMenu={setOpenMenu}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className='pb-5 w-full flex justify-center items-center flex-col'>
            <div className='gap-3 flex rounded items-center'>
              <div className='bg-app-text text-app-bg font-semibold rounded-full p flex items-center justify-center text-lg p-2 tracking-wider border border-purple-500/30 dynamic-avatar '>
                {getLetter(user?.name)}
              </div>
              <p className='text-xl capitalize'>{user?.name || "Guest User"}</p>
            </div>
            <p className='text-app-text-h text-[12px] w-full flex justify-center items-center mt-1'>Free tier</p>
          </div>
        </div>

        <main className='flex-1 overflow-y-auto mt-10 sm:mt-0'>
          {
            selected === "projects" &&
            <Projects />
          }

          {
            selected === "settings" &&
            <DashBoardSettings />
          }

          {
            selected === "installation" &&
            <Installation />
          }

        </main>

      </div>

    </div>
  )
}

export default DashboardPage