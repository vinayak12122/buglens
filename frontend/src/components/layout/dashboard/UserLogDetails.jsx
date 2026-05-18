import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import {
  ArrowLeft,
  Terminal,
  Globe,
  Clock,
  Box,
  Shield,
  Cpu
} from 'lucide-react'

import { useLog } from '../../../context/LogContext'

const UserLogDetails = () => {

  const { projectId, logId } = useParams()

  const navigate = useNavigate()

  const {
    logs,
    logLoading,
    fetchLogs
  } = useLog()

  useEffect(() => {

    fetchLogs(projectId, logId)

  }, [projectId, logId])

  const logData = logs?.[0]

  // console.log(logData)

  const properties = [

    {
      label: "Event ID",
      value: logData?.id || "None",
      icon: <Box size={14} />,
      isMono: true
    },

    {
      label: "Issue ID",
      value: logData?.issue_id || "None",
      icon: <Shield size={14} />,
      isMono: true
    },

    {
      label: "Type",
      value: logData?.type || "None",
      isBadge: true,
      type: logData?.type
    },

    {
      label: "Project",
      value: logData?.project_id || "None",
      icon: <Cpu size={14} />,
      isMono: true
    },

    {
      label: "URL / Page",
      value: logData?.page || "None",
      icon: <Globe size={14} />
    },

    {
      label: "Browser",
      value: logData?.browser || "None",
      icon: <Terminal size={14} />
    },

    {
      label: "Timestamp",
      value: logData?.created_at
        ? new Date(logData.created_at).toLocaleString()
        : "None",
      icon: <Clock size={14} />
    }

  ]

  return (

    <div className='flex flex-col h-screen bg-app-bg text-app-text p-4 gap-4 overflow-hidden font-poppins'>

      {/* HEADER */}
      <div className='flex items-center gap-4 border-b border-app-border pb-4'>

        <button
          onClick={() => navigate(-1)}
          className='sm:p-1.5 hover:bg-app-border/40 rounded transition-colors'
        >
          <ArrowLeft size={18} />
        </button>

        <div className='overflow-hidden'>

          <h1 className='text-lg font-bold text-app-text'>
            Event Logs
          </h1>

          <h2 className='text-xs text-app-text-h truncate max-w-255 hidden sm:block'>
            {logData?.message || "None"}
          </h2>

        </div>

      </div>

      {/* CONTENT */}
      <div className='flex-1 overflow-auto scrollbar-hide space-y-4'>

        {
          logLoading
            ?
            (
              <div className='space-y-4 animate-pulse'>

                <div className='h-52 rounded border border-app-border bg-app-border/30'></div>

                <div className='h-64 rounded border border-app-border bg-app-border/30'></div>

                <div className='h-52 rounded border border-app-border bg-app-border/30'></div>

              </div>
            )
            :
            (
              <>
                {/* PROPERTIES TABLE */}
                <div className='border border-app-border rounded overflow-hidden'>

                  <table className='w-full text-left border-collapse table-fixed'>

                    <thead className='bg-app-border/10 border-b border-app-border'>

                      <tr className='text-[10px] uppercase text-app-text-h font-bold'>

                        <th className='px-4 py-2 w-1/4'>
                          Property
                        </th>

                        <th className='px-4 py-2 w-3/4'>
                          Value
                        </th>

                      </tr>

                    </thead>

                    <tbody className='divide-y divide-app-border/50'>

                      {
                        properties.map((prop, i) => (

                          <tr
                            key={i}
                            className='hover:bg-app-border/5'
                          >

                            <td className='px-4 py-2.5 text-[11px] font-semibold text-app-text-h flex items-center gap-2'>

                              {prop.icon}

                              {prop.label}

                            </td>

                            <td className='px-4 py-2.5 text-[11px] break-all'>

                              {
                                prop.isBadge
                                  ?
                                  (
                                    <span
                                      className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${prop.type === 'error'
                                        ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                        : prop.type === 'warning'
                                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                        }`}
                                    >
                                      {prop.value}
                                    </span>
                                  )
                                  :
                                  (
                                    <span
                                      className={
                                        prop.isMono
                                          ? 'font-mono text-app-accent'
                                          : 'font-medium'
                                      }
                                    >
                                      {prop.value}
                                    </span>
                                  )
                              }

                            </td>

                          </tr>

                        ))
                      }

                    </tbody>

                  </table>

                </div>

                {/* STACK TRACE */}
                <div className='border border-app-border rounded overflow-hidden'>

                  <div className='bg-app-border/10 px-4 py-2 border-b border-app-border flex items-center justify-between'>

                    <span className='text-[10px] uppercase text-app-text-h font-bold'>
                      Stack Trace
                    </span>

                    <span className='text-[10px] font-mono text-app-text-h'>
                      stack
                    </span>

                  </div>

                  <div className='p-4 bg-app-bg overflow-x-auto'>

                    <pre className='text-[11px] font-mono leading-relaxed text-red-400/90 whitespace-pre-wrap break-all'>

                      {logData?.stack || "None"}

                    </pre>

                  </div>

                </div>

                {/* PAYLOAD */}
                <div className='border border-app-border rounded overflow-hidden'>

                  <div className='bg-app-border/10 px-4 py-2 border-b border-app-border flex items-center justify-between'>

                    <span className='text-[10px] uppercase text-app-text-h font-bold'>
                      Payload / Context
                    </span>

                    <span className='text-[10px] font-mono text-app-text-h'>
                      payload
                    </span>

                  </div>

                  <div className='p-4 bg-app-border/5 overflow-auto'>

                    <pre className='text-[11px] font-mono text-app-accent whitespace-pre-wrap break-all'>

                      {
                        logData?.payload
                          ? JSON.stringify(logData.payload, null, 2)
                          : "None"
                      }

                    </pre>

                  </div>

                </div>
              </>
            )
        }

      </div>

      {/* FOOTER */}
      <div className='pt-2 border-t border-app-border text-[10px] text-app-text-h flex justify-between'>

        <span>
          Project: {logData?.project_id || "None"}
        </span>

        <span>
          Internal ID: {logData?.id || "None"}
        </span>

      </div>

    </div>

  )
}

export default UserLogDetails