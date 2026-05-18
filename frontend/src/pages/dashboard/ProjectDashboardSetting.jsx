import React, { useState } from 'react'
import { useProject } from '../../context/ProjectContext'
import { useParams } from 'react-router-dom';

const ProjectDashboardSetting = () => {


    return (
        <div className='p-10 flex flex-col h-full gap-15 '>

            <div className='flex w-full justify-between items-center'>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-app-text font-bold text-2xl'>API Settings</p>
                        <p className='text-sm text-app-text-h'>Use this public key to authenticate your client-side integration.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectDashboardSetting