import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/layout/dashboard/Header';
import ProjectSidebar from '../../components/layout/dashboard/ProjectSidebar';
import UserProject from '../../components/layout/dashboard/UserLogs';
import UserLogs from '../../components/layout/dashboard/UserLogs';
import { useLog } from '../../context/LogContext';
import ProjectDashboardSetting from './ProjectDashboardSetting';

const ProjectDashboardPage = () => {
  const { projectId } = useParams();

  const [selected, setSelected] = useState("logs")

  const { connectionLiveSocket, disconnectLiveSocket
} = useLog();

  useEffect(() => {

    connectionLiveSocket(`proj_${projectId}`);

    return () => {
      disconnectLiveSocket();
    };

  }, [projectId]);

  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        {/* <ProjectSidebar selected={selected} setSelected={setSelected} /> */}
        <main className='flex-1 overflow-y-auto'>

          {
            selected === "logs" &&
            <UserLogs />
          }

          {/* {
            selected === "settings" &&
            <p className='font-bold text-xl'>
              <ProjectDashboardSetting/>
            </p>
          } */}

        </main>
      </div>
    </div>
  )
}

export default ProjectDashboardPage