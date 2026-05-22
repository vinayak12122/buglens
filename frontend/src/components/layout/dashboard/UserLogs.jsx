import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Search,
  Filter,
  Globe,
  Terminal,
  ExternalLink,
  ArrowLeft,
  CircleAlert,
  RotateCw,
  ChevronDown
} from 'lucide-react';
import { useLog } from '../../../context/LogContext';

const UserLogs = () => {

  const navigate = useNavigate();

  const { projectId } = useParams();

  const {
    issues,
    fetchIssues,
    issuesLoading,
    updateIssueStatus
  } = useLog();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState("last_seen");
  const [filterOpen, setFilterOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // const dropdownRef = useRef(null);

  const options = [
    { value: 'unresolved', label: 'unresolved', shortLabel: 'ur', color: 'bg-red-500' },
    { value: 'resolved', label: 'resolved', shortLabel: 're', color: 'bg-green-500' },
    { value: 'ignored', label: 'ignored', shortLabel: 'ig', color: 'bg-gray-500' }
  ];

  const filteredIssues = useMemo(() => {
    let updated = [...issues]

    if (search.trim()) {
      const q = search.toLowerCase();

      updated = updated.filter((issue) =>
        issue.title?.toLowerCase().includes(q) ||
        issue.id?.toLowerCase().includes(q) ||
        issue.latest_page?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "last_seen") {

      updated.sort(
        (a, b) =>
          new Date(b.last_seen) -
          new Date(a.last_seen)
      );

    } else if (sortBy === "events") {

      updated.sort((a, b) => b.count - a.count);
    }
    return updated;

  }, [issues, search, sortBy])

  useEffect(() => {

    fetchIssues(projectId);

  }, [projectId]);

  const handleSelect = (issueId,status) => {
    updateIssueStatus(projectId,issueId,status);
    setOpenDropdownId(null);
  }

  // console.log(issues)

  const severityMap = {
    error: "text-red-500 bg-red-500/5 border-red-500/20",
    warning: "text-amber-500 bg-amber-500/5 border-amber-500/20",
    info: "text-blue-500 bg-blue-500/5 border-blue-500/20",
  };

  const handleRowClick = (projectId, logId) => {

    navigate(`/dashboard/${projectId}/${logId}`);

  };

  const handleReload = async () => {
    if (reload) return;

    setReload(true);

    const start = Date.now();

    try {
      window.location.reload();
    } finally {
      const elapsed = Date.now() - start;
      const remaining = Math.max(500 - elapsed, 0);

      setTimeout(() => {
        setReload(false);
      }, remaining);
    }
  };

  return (
    <div className='flex flex-col h-screen bg-app-bg text-app-text p-4 gap-4 overflow-hidden'>

      {/* HEADER */}
      <div className='flex items-center justify-between border-app-border '>

        <div className='items-center gap-3 hidden sm:flex'>
          <button
            onClick={() => navigate(-1)}
            className='p-1.5 hover:bg-app-border/40 rounded transition-colors'
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className='text-lg font-bold'>Issues</h1>

          <span className='px-2 py-0.5 rounded border border-app-border text-[10px] text-app-text-h font-mono'>
            proj_{projectId}
          </span>
        </div>

        <div className='w-full sm:w-max flex flex-col gap-5'>
          <div className='sm:hidden items-center gap-4 flex '>
            <button
              onClick={() => navigate(-1)}
              className='p hover:bg-app-border/40 rounded transition-colors'
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className='text-lg font-bold'>Issues</h1>
          </div>
          <div className='flex items-center gap-2 w-full justify-between sm:justify-normal sm:w-max'>

            <button
              onClick={handleReload}
              disabled={reload}
              className={`p-1.5 border border-app-border rounded hover:bg-app-border/40 ${reload ? "opacity-60 select-none" : ""
                }`}
            >
              <RotateCw size={14} className={`${reload ? "animate-spin" : ""
                }`} />
            </button>

            <div className='relative w-[80%]'>
              <Search
                className='absolute left-2.5 top-1/2 -translate-y-1/2 text-app-text-h'
                size={14}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by error..."
                className="bg-app-bg border border-app-border rounded text-xs pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-app-text/30 w-full sm:w-48"
              />
            </div>

            <div className='relative '>

              <button
                onClick={() => setFilterOpen((prev) => !prev)}
                className='p-1.5 border border-app-border rounded hover:bg-app-border/40'
              >
                <Filter size={14} />
              </button>

              {
                filterOpen && (
                  <div className='absolute right-0 mt-2 w-40 bg-app-bg border border-app-border rounded shadow-lg z-50 overflow-hidden'>

                    <button
                      onClick={() => {
                        setSortBy("last_seen");
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-app-border/30 ${sortBy === "last_seen"
                        ? "bg-app-border/20"
                        : ""
                        }`}
                    >
                      Sort by Last Seen
                    </button>

                    <button
                      onClick={() => {
                        setSortBy("events");
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-app-border/30 ${sortBy === "events"
                        ? "bg-app-border/20"
                        : ""
                        }`}
                    >
                      Sort by Events
                    </button>

                  </div>
                )
              }

            </div>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className='flex-1 border border-app-border rounded bg-app-bg overflow-auto'>

        <table className='w-full text-left border-collapse table-fixed'>

          <thead className='sticky top-0 bg-app-bg border-b border-app-border z-10'>

            <tr className='text-[10px] uppercase text-app-text-h font-bold bg-app-border/10'>

              <th className='px-4 py-2 w-[40%]'>
                Issue Message
              </th>

              <th className='px-4 py-2 w-[15%]'>
                Status
              </th>

              <th className='px-4 py-2 w-[15%]'>

                <div className='relative flex items-center gap-1 w-fit group cursor-pointer'>

                  <CircleAlert
                    size={12}
                    className='text-app-text cursor-pointer'
                  />

                  <span>Events</span>

                  {/* TOOLTIP */}
                  <div
                    className=' absolute left-0 top-6 hidden group-hover:block w-56 rounded border border-app-border bg-app-text p-2 text-[10px] normal-case text-app-text-h shadow-lg z-50 wrap-break-word
      '
                  >
                    Note<br/>1 event = 1 error occurrence on a single user device.
                  </div>

                </div>

              </th>

              <th className='px-4 py-2 w-[15%] text-right'>
                Last Seen
              </th>

              <th className='px-4 py-2 w-[5%]'></th>

            </tr>

          </thead>

          <tbody className='divide-y divide-app-border/50'>

            {
              issuesLoading
                ?
                Array.from({ length: 3 }).map((_, index) => (

                  <tr
                    key={index}
                    className='animate-pulse border-b border-app-border/40'
                  >

                    {/* MESSAGE */}
                    <td className='px-4 py-4'>

                      <div className='flex flex-col gap-3'>

                        <div className='flex items-center gap-2'>

                          <div className='h-4 w-14 rounded bg-app-border'></div>

                          <div className='h-3 w-44 rounded bg-app-border'></div>

                        </div>

                        <div className='h-4 w-[85%] rounded bg-app-border'></div>

                        <div className='flex items-center gap-3'>

                          <div className='h-3 w-24 rounded bg-app-border'></div>

                          <div className='h-3 w-20 rounded bg-app-border'></div>

                        </div>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className='px-4 py-4'>

                      <div className='h-4 w-24 rounded bg-app-border'></div>

                    </td>

                    {/* COUNT */}
                    <td className='px-4 py-4'>

                      <div className='h-5 w-12 rounded bg-app-border'></div>

                    </td>

                    {/* DATE */}
                    <td className='px-4 py-4'>

                      <div className='flex flex-col items-end gap-2'>

                        <div className='h-3 w-16 rounded bg-app-border'></div>

                        <div className='h-3 w-24 rounded bg-app-border'></div>

                      </div>

                    </td>

                    {/* ICON */}
                    <td className='px-4 py-4'>

                      <div className='h-4 w-4 rounded bg-app-border ml-auto'></div>

                    </td>

                  </tr>

                ))
                :
                filteredIssues.length > 0
                  ?
                  filteredIssues.map((issue) => (

                    <tr
                      key={issue.id}
                      onClick={() =>
                        handleRowClick(
                          projectId,
                          issue.id
                        )
                      }
                      className='hover:bg-app-accent/5 cursor-pointer group transition-colors'
                    >
                      <td className='px-4 py-3 overflow-hidden'>

                        <div className='flex flex-col'>

                          <div className='flex items-center gap-2 mb-1'>

                            <span
                              className={`text-[9px] px-1 font-bold border rounded ${severityMap[issue.severity]}`}
                            >
                              {issue.severity}
                            </span>

                            <span className='text-[10px] text-app-text-h font-mono truncate'>
                              {issue.id}
                            </span>

                          </div>

                          <p className='text-xs font-medium truncate group-hover:text-app-accent'>
                            {issue.title}
                          </p>

                          <div className='flex items-center gap-3 mt-1 text-[10px] text-app-text-h'>

                            <span className='flex items-center gap-1'>
                              <Globe size={10} />
                              {issue.latest_page || "Unknown"}
                            </span>



                          </div>

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className='px-4 py-2' onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block text-left">

                          <button
                            type="button"
                            onClick={() => setOpenDropdownId(prev => prev === issue.id ? null : issue.id)}
                            className='bg-app-bg border border-app-border rounded px-2 py-1 text-[11px] outline-none status  flex justify-between items-center cursor-pointer select-none text-app-text gap-1'
                          >
                            <div className="flex-1 text-left">
                              {options.map((opt) => opt.value === issue.status && (
                                <span key={opt.value}>
                                  <span className="sm:hidden capitalize">{opt.shortLabel}</span>
                                  {/* Small Screen and Up: Full Text */}
                                  <span className="hidden sm:inline capitalize">{opt.label}</span>
                                </span>
                              ))}
                            </div>
                            <span className={`text-[9px] opacity-60 ${openDropdownId ? "rotate-180":"rotate-0"} duration-300`}><ChevronDown size={12}/></span>
                          </button>

                          {openDropdownId === issue.id && (
                            <ul className="absolute left-0 mt-1  bg-app-bg border border-app-border rounded shadow-lg z-50 overflow-hidden text-[11px] text-app-text ">
                              {options.map((option) => (
                                <li
                                  key={option.value}
                                  onClick={() => handleSelect(issue.id,option.value)}
                                  className={`px-2 py-1.5 cursor-pointer flex items-center gap-2 hover:bg-app-text/10 transition-colors ${issue.status === option.value ? 'bg-app-text/10 text-app-text' : ''
                                    }`}
                                >
                                  <span className={`w-2 h-2 rounded-full ${option.color}`} />
                                  <span className="capitalize">{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                        </div>
                      </td>

                      {/* COUNT */}
                      <td className='px-4 py-2 text-center'>

                        <span className='text-xs font-mono bg-app-border/20 px-1.5 py-0.5 rounded'>
                          {issue.count}
                        </span>

                      </td>

                      {/* LAST SEEN */}
                      <td className='px-4 py-2 text-right'>

                        <p className='text-[11px] font-medium'>
                          {
                            new Date(issue.last_seen)
                              .toLocaleTimeString()
                          }
                        </p>

                        <p className='text-[9px] text-app-text-h'>
                          {
                            new Date(issue.last_seen)
                              .toLocaleDateString()
                          }
                        </p>

                      </td>

                      {/* ICON */}
                      <td className='px-4 py-2'>

                        <ExternalLink
                          size={12}
                          className='text-app-text-h opacity-0 group-hover:opacity-100 transition-opacity'
                        />

                      </td>

                    </tr>

                  ))
                  :
                  (
                    <tr>
                      <td
                        colSpan={5}
                        className='text-center py-12 text-app-text-h'
                      >
                        No issues found
                      </td>
                    </tr>
                  )
            }

          </tbody>

        </table>

      </div>

      <div className='flex items-center justify-between text-[11px] text-app-text-h px-2 pb-2'>

        <p>
          Showing {filteredIssues.length} active issues
        </p>

      </div>

    </div>
  );
};

export default UserLogs;