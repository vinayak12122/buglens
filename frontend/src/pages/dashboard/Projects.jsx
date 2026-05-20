import React, { useEffect, useState } from 'react'
import CreateProject from '../../components/ui/CreateProject';
import { useNavigate } from 'react-router-dom'
import { Calendar, Check, Copy, EllipsisVertical, ExternalLink, Globe, Plus, ShieldCheck } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import MoreTab from '../../components/ui/MoreTab';

const Projects = () => {

    const navigate = useNavigate();

    // const [projectLoading, setProjectLoading] = useState(true)
    const [openProject, setOpenProject] = useState(false);
    const [copied, setCopied] = useState(null)
    const [openMoreTab,setOpenMoreTab] = useState(null)

    const {
        projects,
        projectLoading,
        setProjectLoading
    } = useProject()

    const handleCopy = (text, type, projectId) => {

        navigator.clipboard.writeText(text)

        setCopied({
            type,
            projectId
        })

        setTimeout(() => {
            setCopied(null)
        }, 2000)
    }

    const handleViewDashboard = (project_id) => {
        const cleanId = project_id.replace('proj_', '');
        // console.log(cleanId)
        navigate(`/dashboard/${cleanId}`);
    }

    const formatLogCount = (num) => {
        if (!num) return 0;
        if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`; 
        if (num >= 100000) return `${(num / 100000).toFixed(1).replace(/\.0$/, '')}m`; 
        return num;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setProjectLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const closeTab = () => setOpenMoreTab(null);

        document.addEventListener("click", closeTab);

        return () => document.removeEventListener("click", closeTab);
    }, []);

    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-8 p-8'>

            {openProject && <CreateProject openProject={openProject} setOpenProject={setOpenProject} />}

            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-3xl font-bold text-app-text'>
                        Projects
                    </p>

                    <p className='text-sm text-app-text-h mt-1 hidden sm:block'>
                        Monitor all your applications and environments
                    </p>
                </div>

                <button
                    className=' px-4 sm:px-2 py-1 rounded bg-app-text text-app-bg text-sm font-medium hover:opacity-90 transition-all w-max flex gap-1 items-center justify-center
                    '
                    onClick={() => setOpenProject(true)}
                >
                    <p className='text-lg'>+</p>
                    New <p className='hidden sm:flex'>Project</p>
                </button>
            </div>

            {
                projectLoading
                    ?
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className=' border border-app-border rounded p-5 bg-app-bg animate-pulse
                                    '
                                >

                                    <div className='flex justify-between items-start'>

                                        <div className='flex flex-col gap-3 w-full'>

                                            <div className='h-5 w-40 rounded bg-app-border'></div>

                                            <div className='h-4 w-24 rounded bg-app-border'></div>

                                        </div>

                                        <div className='h-8 w-8 rounded bg-app-border'></div>

                                    </div>

                                    <div className='flex justify-between mt-8'>

                                        <div className='flex flex-col gap-2'>
                                            <div className='h-3 w-16 rounded bg-app-border'></div>
                                            <div className='h-5 w-10 rounded bg-app-border'></div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='h-3 w-16 rounded bg-app-border'></div>
                                            <div className='h-5 w-14 rounded bg-app-border'></div>
                                        </div>

                                    </div>

                                    <div className='mt-6 h-10 rounded bg-app-border'></div>

                                </div>
                            ))
                        }

                    </div>

                    :

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {Array.isArray(projects) && projects.length > 0 ? (
                            [...projects].sort((a,b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
                                <div
                                    key={project.project_id}
                                    className='border border-app-border rounded p-4 bg-app-bg hover:border-app-text/30 transition-all group relative'
                                >
                                    {/* Project Title & ID */}
                                    <div className='flex justify-between items-start'>
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='font-bold text-lg text-app-text truncate max-w-50'>
                                                {project.name}
                                            </h3>
                                            <div className='flex items-center gap-1.5 text-xs text-app-text-h'>
                                                <Globe size={12} />
                                                <span className='truncate max-w-37.5'>{project.website_url || 'No URL'}</span>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className='p-2 rounded bg-app-border/40 text-app-text group-hover:bg-app-text group-hover:text-app-bg transition-colors cursor-pointer'
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setOpenMoreTab((prev) =>
                                                        prev === project.project_id ? null : project.project_id
                                                    );
                                                }}
                                            >
                                                <EllipsisVertical size={20} />
                                            </div>

                                            {openMoreTab === project.project_id && (
                                                <div
                                                    className="absolute top-0 right-0 w-full z-50"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreTab project_id={project.project_id} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* ===== CONTENT INFO ===== */}
                                    {/* <div className='flex justify-between grid-cols-2 gap-4 mt-4'>
                                        <div className='flex flex-col'>
                                            <span className='text-[10px] uppercase tracking-wider text-app-text-h font-semibold'>Project ID</span>
                                            <div
                                                className='flex items-center gap-2 cursor-pointer hover:text-app-text transition-colors'
                                                onClick={() =>
                                                    handleCopy(
                                                        project.project_id,
                                                        'pid',
                                                        project.project_id
                                                    )
                                                }
                                            >
                                                <span className='text-sm font-medium text-app-text/80 truncate'>{project.project_id}</span>
                                                {copied?.type === 'pid' &&
                                                    copied?.projectId === project.project_id
                                                    ? <Check size={12} className="text-green-500" />
                                                    : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                }
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className='text-[10px] uppercase tracking-wider text-app-text-h font-semibold'>Created At</span>
                                            <div className='flex items-center gap-1.5 text-app-text/80'>
                                                <Calendar size={12} />
                                                <span className='text-sm font-medium'>
                                                    {new Date(project.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* ===== PROJECT DETAILS =====*/}
                                    <div className='mt-5'>

                                        <div className='rounded p-2 bg-app-text/5 w-full text-center flex items-center justify-center border border-app-border'>

                                            <div className='flex items-end gap-2 '>
                                                <h2 className='text-2xl font-bold text-app-text'>
                                                    {formatLogCount( project.logs_count )}
                                                </h2>
                                                <span className=' text-app-text-h'>
                                                   Event Logs
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    {/* ===== PUBLIC KEY ===== */}
                                    <div className='group mt-4 p-2 rounded bg-app-text/5 border border-app-border flex items-center justify-between relative'>
                                        {/* Content that shows ONLY on hover */}
                                        <div className='flex flex-col overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <span className='text-xs font-mono truncate text-app-text/60'>{project.public_key}</span>
                                        </div>

                                        <button
                                            onClick={() => handleCopy(project.public_key, 'pk', project.project_id)}
                                            className='p-1.5 hover:bg-app-border rounded transition-colors opacity-0 group-hover:opacity-100'
                                        >
                                            {copied?.type === 'pk' && copied?.projectId === project.project_id
                                                ? <Check size={14} className="text-green-500" />
                                                : <Copy size={14} className="text-app-text-h" />
                                            }
                                        </button>

                                        {/* "API Key" text that hides on hover */}
                                        <p className='absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden gap-4 sm:gap-0'>
                                            API Key
                                            <button
                                                onClick={() => handleCopy(project.public_key, 'pk', project.project_id)}
                                                className='p-1.5 hover:bg-app-border sm:hidden'
                                            >
                                                {copied?.type === 'pk' && copied?.projectId === project.project_id
                                                    ? <Check size={14} className="text-green-500" />
                                                    : <Copy size={14} className="text-app-text-h" />
                                                }
                                            </button>
                                        </p>
                                    </div>


                                    {/* Action Button */}
                                    <button className='w-full mt-4 py-2.5 rounded bg-app-text text-app-bg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all'
                                        onClick={() =>
                                            handleViewDashboard(project.project_id)
                                        }
                                    >
                                        View Dashboard
                                        <ExternalLink size={14} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 border-app-border rounded flex flex-col items-center justify-center text-app-text-h">
                                <p>No projects found</p>
                            </div>
                        )}
                    </div>
            }

        </div>
    )
}

export default Projects