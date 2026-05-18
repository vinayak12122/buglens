import React, { useState } from 'react'
import {
    ChevronDown,
    Check,
    Loader
} from 'lucide-react'
import { useProject } from '../../context/ProjectContext'
import { useToast } from './Toast'
import { useAuth } from '../../context/AuthContext'

const CreateProject = ({ openProject, setOpenProject }) => {

    const [projectName, setProjectName] = useState('')
    const [projectURL, setProjectURL] = useState('')
    const [projectFramework, setProjectFramework] = useState('React')
    const [frameworkOpen, setFrameworkOpen] = useState(false)
    const [projectLoading,setProjectLoading] = useState(false);
    const [urlError, setUrlError] = useState('')
    const [projectNameError, setProjectNameError] = useState(false);
    
    const { createProject } = useProject()
    const {user} = useAuth();
    const toast = useToast();

    const frameworks = [
        "React",
        "Next.js",
        "Vue",
        "Angular",
        "Vite",
    ]

    const validateURL = (url) => {
        const strictUrlRegex =
            /^(https?:\/\/)(localhost(:\d+)?|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))([\/\w .-]*)*\/?$/;

        if (!url.trim()) {
            return "Website URL is required";
        }

        if (!strictUrlRegex.test(url)) {
            return "Enter a valid URL starting with http:// or https://";
        }

        return "";
    };

    const handleCreateProject = async () => {

        const error = validateURL(projectURL);

        if (error) {
            setUrlError(error);
            return;
        }

        if(projectName.trim() === ''){
            setProjectNameError(true);
            return;
        }

        setUrlError('');

        setProjectLoading(true)
        try {

            await createProject({
                name: projectName,
                website_url: projectURL
            })

            setOpenProject(false)

        } catch (error) {
            toast(error,'error')
        }finally{
            setProjectLoading(false)
        }
    }

    return (
        <div
            className='fixed inset-0 z-200 flex items-center justify-center backdrop-blur-sm px-4'
        >

            <div
                className='bg-app-bg border border-app-border p-6 rounded w-[95%] lg:w-[60%] shadow-2xl min-h-[70%] flex flex-col gap-6 overflow-y-auto scrollbar-hide'
            >

                {/* Header */}
                <div>
                    <p className='text-2xl font-bold text-app-text'>
                        Create Project
                    </p>

                    <p className='text-sm text-app-text-h mt-1'>
                        Configure your monitoring project
                    </p>
                </div>

                {/* Project Name */}
                <div className='flex flex-col gap-3'>

                    <label className='text-app-text text-sm pl-1'>
                        Project Name
                        <span className='text-red-500'> *</span>
                    </label>

                    <div className='flex flex-col gap-2'>
                        <input
                            type="text"
                            placeholder='Project Name'
                            value={projectName}
                            onChange={(e) => {
                                const value = e.target.value;
                                setProjectName(value);

                                if (projectNameError) {
                                    setProjectNameError(
                                        value.trim() === ''
                                    );
                                }
                            }}
                            className={`px-2 py-1.5 w-full border rounded text-sm focus:outline-none bg-transparent dark:placeholder:text-gray-500 transition-colors
${projectNameError
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-app-border focus:border-blue-500/50"
                                }`}
                        />
                        {
                            projectNameError ? (
                                <p className="text-red-500 text-xs pl-1">
                                    Project name is required
                                </p>
                            ) : 
                                <p className='text-xs pl-2 text-app-text-h'>{user.name}/{projectName}</p>
                        }
                    </div>
                </div>

                {/* Website URL */}
                <div className='flex flex-col gap-3'>

                    <div>
                        <label className='text-app-text text-sm pl-1'>
                            Website URL
                            <span className='text-red-500'> *</span>
                        </label>

                        <p className='text-app-text-h text-xs pl-1 mt-1'>
                            You can also use localhost during development
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder='Url'
                        value={projectURL}
                        onChange={(e) => {
                            const value = e.target.value;
                            setProjectURL(value);

                            if (urlError) {
                                setUrlError(validateURL(value));
                            }
                        }}
                        className={`px-2 py-1.5 w-full border rounded text-sm focus:outline-none bg-transparent dark:placeholder:text-gray-500 transition-colors
${urlError
                                ? "border-red-500 focus:border-red-500"
                                : "border-app-border focus:border-blue-500/50"
                            }`}
                    />
                    {
                        urlError && (
                            <p className="text-red-500 text-xs pl-1">
                                {urlError}
                            </p>
                        )
                    }
                </div>

                <div className='flex flex-col gap-3 relative'>

                    <label className='text-app-text text-sm pl-1'>
                        Project Framework
                        <span className='text-red-500'> *</span>
                    </label>

                    <button
                        type='button'
                        onClick={() => setFrameworkOpen(!frameworkOpen)}
                        className=' w-full flex items-center justify-between px-2 py-1.5 border text-sm border-app-border rounded bg-transparent hover:border-zinc-700 transition-all
                        '
                    >

                        <span className='text-app-text'>
                            {projectFramework}
                        </span>

                        <ChevronDown
                            size={18}
                            className={`
                                transition-transform
                                duration-200
                                ${frameworkOpen ? "rotate-180" : ""}
                            `}
                        />

                    </button>

                    {
                        frameworkOpen &&

                        <div
                            className=' absolute top-full mt-2 w-full max-h-72 overflow-y-auto border border-app-border rounded bg-zinc-950 shadow-2xl z-50 p-2 scrollbar-hide
                            '
                        >

                            {
                                frameworks.map((framework) => {

                                    const active =
                                        framework === projectFramework

                                    return (
                                        <button
                                            key={framework}
                                            type='button'
                                            onClick={() => {
                                                setProjectFramework(framework)
                                                setFrameworkOpen(false)
                                            }}
                                            className={` w-full flex items-center justify-between p-2 rounded text-left transition-all

                                                ${active
                                                    ? "bg-zinc-800 text-white"
                                                    : "hover:bg-zinc-900 text-zinc-300"
                                                }
                                            `}
                                        >

                                            <span>
                                                {framework}
                                            </span>

                                            {
                                                active &&
                                                <Check size={16} />
                                            }

                                        </button>
                                    )
                                })
                            }

                        </div>
                    }

                </div>

                {/* Footer */}
                <div className='flex justify-end gap-3 mt-auto'>

                    <button
                        onClick={() => setOpenProject(false)}
                        className=' px-5 py-1.5 rounded border border-app-border transition-all
                        '
                    >
                        Cancel
                    </button>

                    <button
                        className=' px-4 rounded bg-app-text text-app-bg font-medium hover:opacity-90 transition-all flex items-center justify-center
                        '
                        onClick={handleCreateProject}
                    >
                        {projectLoading ? 
                        <Loader className='animate-spin'/> 
                        :
                        <p>Create Project</p>
                        }
                    </button>

                </div>

            </div>

        </div>
    )
}

export default CreateProject