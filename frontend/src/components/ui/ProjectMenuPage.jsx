import React from 'react'
import {
    FolderKanban,
    Download,
    Settings
} from 'lucide-react'

const ProjectMenuPage = ({
    setOpenMenu,
    selected,
    setSelected
}) => {
    const menuItems = [
        {
            id: "projects",
            label: "Projects",
            icon: FolderKanban
        },
        {
            id: "installation",
            label: "Installation",
            icon: Download
        },
        {
            id: "settings",
            label: "Settings",
            icon: Settings
        }
    ]

    const handleSelect = (item) => {
        setSelected(item)
        setOpenMenu(false)
    }

    return (
        <div className="w-full max-w-xs flex flex-col gap-2 px-4">

            {menuItems.map((item) => {
                const active =
                    selected === item.id

                const Icon = item.icon

                return (
                    <button
                        key={item.id}
                        onClick={() =>
                            handleSelect(item.id)
                        }
                        className={`
                            w-full flex items-center gap-4
                            px-4 py-3 rounded
                            transition-all duration-300
                            group
                            ${active
                                ? "bg-app-text/5 text-app-text border border-app-text-h/20"
                                : "text-app-text/50 hover:bg-app-text/5 hover:text-app-text"
                            }
                        `}
                    >
                        <Icon
                            size={18}
                            className={`
                                transition-all duration-300
                                text-app-text
                            `}
                        />

                        <span className="font-medium text-sm">
                            {item.label}
                        </span>

                        {/* {active && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-purple-400" />
                        )} */}
                    </button>
                )
            })}
        </div>
    )
}

export default ProjectMenuPage