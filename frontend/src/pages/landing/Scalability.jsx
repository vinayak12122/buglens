import React from 'react'
import {
    Database,
    DatabaseZap,
    Layers3,
    Activity,
    Server,
    Workflow,
    ShieldCheck,
    Cpu,
    Timer,
    ArrowRight
} from 'lucide-react'

const Scalability = () => {

    const pillars = [
        {
            icon: Layers3,
            title: 'Buffered Queue Architecture',
            desc: 'Logs enter a disk-backed queue before touching PostgreSQL, preventing sudden traffic spikes from overwhelming the database.'
        },
        {
            icon: Database,
            title: 'Batch Database Writes',
            desc: 'Events are flushed in controlled batches to reduce write amplification and improve throughput.'
        },
        {
            icon: Activity,
            title: 'Issue Aggregation',
            desc: 'Duplicate exceptions are fingerprinted and grouped before persistence to minimize redundant operations.'
        },
        {
            icon: Server,
            title: 'Async Broadcasting',
            desc: 'Dashboard updates stream through WebSockets independently from ingestion and persistence layers.'
        },
        {
            icon: Cpu,
            title: 'Parallel Processing',
            desc: 'Background workers process queues separately from API requests for smoother concurrency handling.'
        },
        {
            icon: ShieldCheck,
            title: 'Failure Recovery',
            desc: 'Failed processing batches are automatically retried using queue recovery and exponential backoff.'
        }
    ]

    const flow = [
        'SDK Captures Error',
        'Ingest API Receives Event',
        'Queue Buffers Request',
        'Batch Processor Aggregates',
        'Database Upsert Executes',
        'Realtime Dashboard Sync'
    ]

    return (
        <div className='w-full min-h-screen bg-app-bg text-app-text'>

            <div className='max-w-7xl mx-auto py-10 space-y-28 sm:px-10 px-5'>

                {/* HERO */}
                <section className='relative overflow-hidden rounded border border-app-border bg-app-project/10'>

                    <div className='absolute inset-0 bg-linear-to-br from-purple-700/10 via-transparent to-transparent' />

                    <div className='relative z-10 p-10 lg:p-10'>

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded border border-app-border bg-app-bg/60 backdrop-blur-xl text-sm mb-8'>
                            <Workflow
                                size={16}
                                className='text-purple-700'
                            />

                            Scalable Error Processing Architecture
                        </div>

                        <div className='max-w-4xl space-y-6'>

                            <h1 className='text-3xl lg:text-7xl font-bold leading-tight tracking-tight'>
                                Built for High Volume Error Monitoring
                            </h1>

                            <p className='text-app-text-h leading-9 max-w-3xl'>
                                BugLens uses buffered ingestion, asynchronous
                                pipelines, batch persistence, and realtime event
                                streaming to efficiently process large-scale
                                production error traffic.
                            </p>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-14'>

                            {
                                [
                                    {
                                        value: 'Queue-Based',
                                        label: 'Buffered ingestion architecture'
                                    },
                                    {
                                        value: 'Batch Flush',
                                        label: 'Controlled database pressure'
                                    },
                                    {
                                        value: 'In-Memory Cache',
                                        label: 'Cache logs in Memory'
                                    },
                                ].map((item) => (

                                    <div
                                        key={item.label}
                                        className='rounded border border-app-border bg-app-bg/40 backdrop-blur-xl p-4'
                                    >

                                        <p className='text-lg font-bold text-purple-700 mb-3'>
                                            {item.value}
                                        </p>

                                        <p className='text-app-text-h'>
                                            {item.label}
                                        </p>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                </section>

                {/* PILLARS */}
                <section className='space-y-10'>

                    <div className='space-y-4'>

                        <div className='flex items-center gap-3'>
                            <Server
                                size={24}
                                className='text-purple-700'
                            />

                            <h2 className='text-4xl font-bold'>
                                Core Scalability Pillars
                            </h2>
                        </div>

                        <p className='text-app-text-h text-lg leading-8 max-w-3xl'>
                            The backend architecture is designed around isolation,
                            batching, queue buffering, and async communication.
                        </p>

                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

                        {
                            pillars.map((item) => {

                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.title}
                                        className='group rounded border border-app-border bg-app-text-h/10 p-4 hover:border-purple-700/30 hover:-translate-y-1 transition-all duration-300'
                                    >

                                        <div className='w-16 h-16 rounded bg-purple-700/10 border border-purple-700/20 flex items-center justify-center mb-6'>
                                            <Icon
                                                size={26}
                                                className='text-purple-700'
                                            />
                                        </div>

                                        <h3 className='text-xl font-semibold mb-4'>
                                            {item.title}
                                        </h3>

                                        <p className='text-app-text-h leading-8'>
                                            {item.desc}
                                        </p>

                                    </div>
                                )
                            })
                        }

                    </div>

                </section>

                {/* FLOW */}
                <section className='space-y-10'>

                    <div className='space-y-4'>

                        <div className='flex items-center gap-3'>
                            <Activity
                                size={24}
                                className='text-purple-700'
                            />

                            <h2 className='text-4xl font-bold'>
                                Error Processing Flow
                            </h2>
                        </div>

                        <p className='text-app-text-h text-lg leading-8 max-w-3xl'>
                            Events move through isolated processing stages to
                            maintain stability during traffic spikes.
                        </p>

                    </div>

                    <div className='relative overflow-x-auto scrollbar-hide py-4'>

                        <div className='flex items-start min-w-max '>

                            {
                                flow.map((step, index) => (

                                    <React.Fragment key={step}>

                                        {/* STEP */}
                                        <div className='relative flex flex-col items-center text-center w-44 sm:w-52 lg:w-60 shrink-0'>

                                            {/* NODE */}
                                            <div className='relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded bg-app-bg border border-app-border shadow-lg shadow-black/5'>

                                                <div className='flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-purple-700/10 border border-purple-700/20 text-purple-700 text-xs sm:text-sm font-semibold'>
                                                    {index + 1}
                                                </div>

                                            </div>

                                            {/* TEXT */}
                                            <div className='mt-4 sm:mt-6 px-2 sm:px-4'>

                                                <p className='text-sm sm:text-base font-medium leading-6 sm:leading-7'>
                                                    {step}
                                                </p>

                                            </div>

                                        </div>

                                        {/* CONNECTOR */}
                                        {
                                            index !== flow.length - 1 && (

                                                <div className='flex items-center justify-center w-6 sm:w-15 shrink-0 pt-5 sm:pt-6'>

                                                    <div className='relative w-full h-px bg-app-border'>

                                                        <ArrowRight
                                                            size={14}
                                                            className='absolute right-0 -top-2 translate-x-1/2 text-app-text-h sm:w-4 sm:h-4'
                                                        />

                                                    </div>

                                                </div>
                                            )
                                        }

                                    </React.Fragment>
                                ))
                            }

                        </div>

                    </div>

                </section>

                {/* DATABASE LOAD */}
                <section className='space-y-10'>

                    <div className='flex items-center gap-3 pb-5'>
                        <DatabaseZap
                            size={24}
                            className='text-purple-700'
                        />

                        <h2 className='text-4xl font-bold'>
                            Database Load Optimization
                        </h2>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <p className='text-purple-700 text-lg'>
                            Frontend
                        </p>

                        <div className='rounded border border-app-border bg-app-project/10 p-5 space-y-8'>

                            <p className='text-lg text-app-text-h leading-9'>
                                BugLens uses an in-memory caching layer built with
                                <span className='text-app-text'> Map() </span> 
                                 to reduce unnecessary API requests for projects, issues,
                                and logs.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                Frequently accessed dashboard data is served directly from
                                cache, making page transitions and project switching feel
                                instant.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                This drastically lowers repeated database reads while
                                keeping the UI highly responsive during real-time updates.
                            </p>

                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <p className='text-purple-700 text-lg'>
                            Backend
                        </p>

                        <div className='rounded border border-app-border bg-app-project/10 p-5 space-y-8'>

                            <p className='text-lg text-app-text-h leading-9'>
                                Writing every incoming browser error directly to PostgreSQL
                                would create severe write amplification under high traffic.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                BugLens solves this using
                                <span className='text-app-text'> disk-backed ingestion queues </span>
                                powered by DiskCache Deque, allowing logs to be buffered
                                safely before database persistence.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                A dedicated background flusher processes logs in controlled
                                batches using asynchronous workers and a thread pool,
                                preventing request spikes from overwhelming the database.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                Duplicate issues are aggregated by fingerprint before insert,
                                ensuring repeated identical errors increment counters instead
                                of generating redundant rows.
                            </p>

                            {/* <p className='text-lg text-app-text-h leading-9'>
                                Batched PostgreSQL upserts, conflict resolution, and queue
                                retries provide reliability even during temporary database
                                slowdowns or traffic bursts.
                            </p> */}

                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <p className='text-purple-700 text-lg'>
                            Real-Time Scalability
                        </p>

                        <div className='rounded border border-app-border bg-app-project/10 p-5 space-y-8'>

                            <p className='text-lg text-app-text-h leading-9'>
                                WebSocket channels broadcast issue updates instantly without
                                requiring polling, minimizing server overhead while keeping
                                dashboards synchronized in real time.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                Project-level socket separation ensures updates are isolated
                                only to subscribed clients, enabling horizontal scaling as
                                monitored applications grow.
                            </p>

                            <p className='text-lg text-app-text-h leading-9'>
                                This architecture allows BugLens to efficiently handle
                                sustained error bursts while maintaining low latency and
                                stable dashboard performance.
                            </p>

                        </div>
                    </div>

                </section>

                {/* RECOVERY */}
                <section className='space-y-10 pb-20'>

                    <div className='flex items-center gap-3'>
                        <Timer
                            size={24}
                            className='text-purple-700'
                        />

                        <h2 className='text-4xl font-bold'>
                            Failure Recovery
                        </h2>
                    </div>

                    <div className='rounded border border-app-border bg-app-project/10 p-5'>

                        <p className='text-lg text-app-text-h leading-9'>
                            If persistence fails due to temporary database
                            downtime or network instability, events remain inside
                            the processing queue instead of being discarded.
                        </p>

                        <p className='text-lg text-app-text-h leading-9 mt-6'>
                            Queue workers retry failed batches automatically
                            using exponential backoff, ensuring reliable event
                            durability and recovery without blocking ingestion.
                        </p>

                    </div>

                </section>

            </div>

        </div>
    )
}

export default Scalability