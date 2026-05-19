import React, { useState } from 'react'
import {
    Terminal,
    Copy,
    Check,
    ChevronRight,
    Code2,
    HelpCircle,
    Rocket,
    Monitor,
    Layers3
} from 'lucide-react'

const Docs = () => {

    const [copied, setCopied] = useState('')

    const handleCopy = async (text, id) => {
        await navigator.clipboard.writeText(text)
        setCopied(id)

        setTimeout(() => {
            setCopied('')
        }, 2000)
    }

    const installScript = `<script
  src="http://localhost:5173/sdk/sdk.js"
  data-api-key="bg_live_xxxxxxxxx"
></script>`

    const manualCapture = `window.BugMonitor.captureException(
  new Error("Payment gateway failed")
)`

    const sections = [
        "Quick Start",
        "Installation",
        "Manual Capture",
        "FAQ"
    ]

    return (
        <div className='w-full min-h-screen bg-app-bg text-app-text'>

            <div className='max-w-7xl mx-auto flex gap-10 py-2 px-8'>

                {/* SIDEBAR */}
                <aside className='hidden xl:block w-60 shrink-0'>

                    <div className='sticky top-17 rounded bg-app-text-h/10 backdrop-blur-xl p-2 '>

                        {/* <p className='text-xs uppercase tracking-[0.2em] text-app-text-h mb-6'>
                            Documentation
                        </p> */}

                        <div className='flex flex-col gap-2'>
                            {sections.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className='group flex items-center justify-between p-4 rounded text-sm text-app-text-h hover:text-app-text hover:bg-app-border/20 transition-all duration-200'
                                >
                                    <span>{item}</span>

                                    <ChevronRight
                                        size={15}
                                        className='group-hover:translate-x-1 transition-transform'
                                    />
                                </a>
                            ))}
                        </div>

                    </div>

                </aside>
                {/* <div className='hidden sm:flex h-screen w-max fixed justify-center top-20 left-80'>
                    <p
                    className='h-[85%] w-[3px] bg-app-border'
                    ></p>
                </div> */}

                {/* MAIN */}
                <main className='flex-1 min-w-0 space-y-20 pt-5'>

                    {/* QUICK START */}
                    <section
                        id='Quick Start'
                        className='space-y-8 scroll-mt-28'
                    >

                        <div className='space-y-4'>
                            <div className='flex items-center gap-3'>
                                <Rocket size={24} className='text-purple-700' />
                                <h2 className='text-3xl font-bold'>
                                    Quick Start
                                </h2>
                            </div>

                            <p className='text-app-text-h leading-8 max-w-3xl'>
                                Integrate BugLens into your website to monitor
                                runtime JavaScript errors in real-time and view
                                them instantly inside your dashboard.
                            </p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                            {[
                                {
                                    icon: Layers3,
                                    title: 'Create Project',
                                    desc: 'Create a project and generate your unique API key.'
                                },
                                {
                                    icon: Terminal,
                                    title: 'Install SDK',
                                    desc: 'Add the BugLens script before closing body tag.'
                                },
                                {
                                    icon: Monitor,
                                    title: 'Monitor Live',
                                    desc: 'View issues and logs instantly in your dashboard.'
                                }
                            ].map((item) => {

                                const Icon = item.icon

                                return (
                                    <div
                                        key={item.title}
                                        className='group rounded border border-app-border bg-linear-to-br from-purple-700/10 via-transparent to-transparent p-7 hover:border-purple-700/30 hover:-translate-y-1 transition-all duration-300'
                                    >

                                        <div className='w-14 h-14 rounded bg-purple-700/10 border border-purple-700/20 flex items-center justify-center mb-5'>
                                            <Icon
                                                size={24}
                                                className='text-purple-700'
                                            />
                                        </div>

                                        <h3 className='text-lg font-semibold mb-3'>
                                            {item.title}
                                        </h3>

                                        <p className='text-sm text-app-text-h leading-7'>
                                            {item.desc}
                                        </p>

                                    </div>
                                )
                            })}
                        </div>

                    </section>

                    {/* INSTALLATION */}
                    <section
                        id='Installation'
                        className='space-y-8 scroll-mt-28'
                    >

                        <div className='flex items-center gap-3'>
                            <Terminal className='text-purple-700' size={24} />
                            <h2 className='text-4xl font-bold'>
                                Installation
                            </h2>
                        </div>

                        <div className='space-y-5 text-app-text-h leading-8'>
                            <p>1. Create a project from dashboard</p>
                            <p>2. Copy generated API key</p>
                            <p>3. Add script to your HTML</p>
                            <p>4. Deploy and BugLens starts tracking automatically</p>
                        </div>

                        <div className='rounded border border-app-border overflow-hidden bg-[#0f1117e5]'>

                            <div className='px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5'>

                                <div className='flex items-center gap-2 text-sm text-gray-400'>
                                    <Code2 size={16} />
                                    HTML Integration
                                </div>

                                <button
                                    onClick={() => handleCopy(installScript, 'html')}
                                    className='flex items-center gap-2 text-sm px-4 py-2 rounded border border-white/10 transition-all text-white hover:bg-white/5'
                                >
                                    {
                                        copied === 'html'
                                            ? 'Copied'
                                            : 'Copy'
                                    }
                                </button>

                            </div>

                            <pre className='overflow-x-auto p-7 text-sm text-emerald-400 leading-8'>
                                <code>{installScript}</code>
                            </pre>

                        </div>

                    </section>

                    {/* MANUAL CAPTURE */}
                    <section
                        id='Manual Capture'
                        className='space-y-8 scroll-mt-28'
                    >

                        <div className='flex items-center gap-3'>
                            <Code2 className='text-purple-700' size={24} />
                            <h2 className='text-4xl font-bold'>
                                Manual Capture
                            </h2>
                        </div>

                        <div className='rounded border border-app-border overflow-hidden bg-[#0f1117ea]'>

                            <div className='px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5'>

                                <p className='text-sm text-gray-300'>
                                    JavaScript
                                </p>

                                <button
                                    onClick={() => handleCopy(manualCapture, 'js')}
                                    className='text-sm px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-all text-white'
                                >
                                    {
                                        copied === 'js'
                                            ? 'Copied'
                                            : 'Copy'
                                    }
                                </button>

                            </div>

                            <pre className='overflow-x-auto p-7 text-sm text-emerald-400 leading-8'>
                                <code>{manualCapture}</code>
                            </pre>

                        </div>

                    </section>

                    {/* FAQ */}
                    <section
                        id='FAQ'
                        className='space-y-10 scroll-mt-28 pb-20'
                    >

                        <div className='flex items-center gap-3'>
                            {/* <HelpCircle className='text-purple-700' size={24} /> */}
                            <h2 className='text-4xl font-bold'>
                                FAQ
                            </h2>
                        </div>

                        <div className='space-y-3'>

                            {[
                                {
                                    q: "Does BugLens capture errors automatically?",
                                    a: "Yes. Runtime errors and unhandled promise rejections are captured automatically after SDK installation."
                                },
                                {
                                    q: "What information is collected?",
                                    a: "Error message, stack trace, browser details, page URL, and event metadata."
                                },
                                // {
                                //     q: "Can I trigger errors manually?",
                                //     a: "Yes. Use window.BugMonitor.captureException()."
                                // },
                                {
                                    q: "Where can I view errors?",
                                    a: "Inside your BugLens dashboard in real-time."
                                }
                            ].map((item) => (

                                <div
                                    key={item.q}
                                    className='rounded border border-app-border bg-app-project/10 p-4 hover:border-purple-700/20 transition-all'
                                >
                                    <p className='text-lg font-semibold mb-4'>
                                        {item.q}
                                    </p>

                                    <p className='text-app-text-h leading-8'>
                                        {item.a}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </section>

                </main>

            </div>

        </div>
    )
}

export default Docs