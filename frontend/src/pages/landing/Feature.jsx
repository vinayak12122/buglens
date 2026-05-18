import React from 'react'
import {
    Activity,
    Layers3,
    Monitor,
    Zap,
    Fingerprint,
    Database,
    Globe,
    Terminal,
    Wifi,
    ShieldAlert
} from 'lucide-react'

const Feature = () => {

    const features = [
        {
            icon: Activity,
            title: 'Real-time Error Streaming',
            desc: 'Errors are pushed instantly to your dashboard using WebSocket connections for live monitoring.'
        },
        {
            icon: Fingerprint,
            title: 'Issue Grouping',
            desc: 'Duplicate errors are grouped using fingerprinting so repeated failures stay organized under one issue.'
        },
        {
            icon: Database,
            title: 'Batched Log Processing',
            desc: 'Incoming events are buffered and inserted efficiently to reduce database pressure.'
        },
        {
            icon: Monitor,
            title: 'Live Dashboard Updates',
            desc: 'Issue counts, logs, and project stats update instantly without page refresh.'
        },
        {
            icon: Globe,
            title: 'Browser Context Capture',
            desc: 'Capture browser, page URL, stack traces, and runtime metadata automatically.'
        },
        {
            icon: Terminal,
            title: 'Manual Exception Capture',
            desc: 'Trigger custom exceptions manually using BugMonitor.captureException().'
        },
        {
            icon: Wifi,
            title: 'Persistent WebSocket Monitoring',
            desc: 'Dedicated socket connections keep project activity synced across dashboard views.'
        },
        {
            icon: Layers3,
            title: 'Project-based Isolation',
            desc: 'Every project has isolated issue streams, logs, API keys, and monitoring sessions.'
        },
        {
            icon: Zap,
            title: 'Lightweight SDK',
            desc: 'Simple script integration with minimal runtime overhead.'
        }
    ]

    const stats = [
        {
            value: 'Realtime',
            label: 'Live issue ingestion'
        },
        {
            value: 'Grouped',
            label: 'Duplicate error aggregation'
        },
        {
            value: 'Instant',
            label: 'Dashboard synchronization'
        }
    ]

    return (
        <div className='w-full min-h-screen bg-app-bg text-app-text'>

            <div className='max-w-7xl mx-auto px-8 py-10 space-y-20'>

                {/* FEATURES GRID */}
                <section className='space-y-8'>

                    <div className='flex items-center gap-3'>
                        <Layers3
                            size={24}
                            className='text-app-accent'
                        />

                        <h2 className='text-3xl font-bold'>
                            Core Capabilities
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

                        {features.map((feature) => {

                            const Icon = feature.icon

                            return (
                                <div
                                    key={feature.title}
                                    className='group rounded border border-app-border bg-linear-to-br from-purple-700/10 via-transparent to-transparent p-7 hover:border-purple-700/30 hover:-translate-y-1 transition-all duration-300'
                                >

                                    <div className='w-14 h-14 rounded bg-purple-700/10 border border-purple-700/20 flex items-center justify-center mb-5'>
                                        <Icon
                                            size={24}
                                            className='text-purple-700'
                                        />
                                    </div>

                                    <h3 className='text-lg font-semibold mb-3'>
                                        {feature.title}
                                    </h3>

                                    <p className='text-sm text-app-text-h leading-7'>
                                        {feature.desc}
                                    </p>

                                </div>
                            )
                        })}

                    </div>

                </section>

                {/* HOW IT WORKS */}
                <section className='space-y-8 pb-20'>

                    <div className='flex items-center gap-3'>
                        <Activity
                            size={24}
                            className='text-app-accent'
                        />

                        <h2 className='text-3xl font-bold'>
                            How BugLens Works
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-4 gap-6'>

                        {[
                            'Install SDK',
                            'Capture Errors',
                            'Process & Group',
                            'Monitor Live'
                        ].map((step, index) => (
                            <div
                                key={step}
                                className='rounded border border-app-text-h/30 bg-app-text-h/10 p-7'
                            >
                                <p className='text-app-accent text-sm mb-3'>
                                    STEP {index + 1}
                                </p>

                                <p className='text-lg font-semibold'>
                                    {step}
                                </p>
                            </div>
                        ))}

                    </div>

                </section>

            </div>

        </div>
    )
}

export default Feature