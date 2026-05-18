import React from 'react'
import { Copy, CheckCircle2, Terminal, Key, FolderPlus, Play } from 'lucide-react'

const Installation = () => {
    return (
        <div className='w-full h-full overflow-y-auto bg-app-bg scrollbar-hide'>
            <div className='max-w-5xl mx-auto p-8 flex flex-col gap-10'>

                {/* Header */}
                <div className='space-y-3'>
                    <p className='text-3xl font-bold text-app-text'>
                        BugLens SDK Installation
                    </p>

                    <p className='text-app-text-h text-sm max-w-2xl'>
                        Follow these steps to connect your application with BugLens
                        and start monitoring real-time production errors instantly.
                    </p>
                </div>

                {/* Step 1 */}
                <div className='bg-app-card space-y-4'>
                    <div className='flex items-center gap-3'>
                        <FolderPlus size={20} />
                        <h2 className='text-xl font-semibold'>
                            Step 1 — Create a Project
                        </h2>
                    </div>

                    <div className='flex flex-col gap-4 bg-app-text/10 p-4 rounded border border-app-border  '>
                        <p className='text-app-text/50 text-sm'>
                            Create a new project from your dashboard and enter:
                        </p>

                        <ul className='list-disc pl-6 text-sm text-app-text/50 space-y-2'>
                            <li>Project Name</li>
                            <li>Website URL</li>
                            <li>Project Framework</li>
                        </ul>
                    </div>

                    {/* <div className='rounded-lg  -app- p-4 bg-app-/10'>
                        Example: <span className='font-mono'>My Portfolio</span>
                    </div> */}
                </div>

                {/* Step 2 */}
                <div className=' bg-app-card space-y-4'>
                    <div className='flex items-center gap-3'>
                        <Key size={20} />
                        <h2 className='text-xl font-semibold'>
                            Step 2 — Copy Your API Key
                        </h2>
                    </div>

                    <p className='text-app-text-h text-sm'>
                        Every project gets a unique public API key.
                        Copy it from your Projects page.
                    </p>

                    <div className='font-mono text-sm bg-app-/10 break-all bg-app-text/10 p-4 rounded border border-app-border'>
                        bg_live_xxxxxxxxxxxxxxxxxxxxx
                    </div>
                </div>

                {/* Step 3 */}
                <div className=' bg-app-card space-y-4'>
                    <div className='flex items-center gap-3'>
                        <Terminal size={20} />
                        <h2 className='text-xl font-semibold'>
                            Step 3 — Add BugLens SDK
                        </h2>
                    </div>

                    <p className='text-app-text-h text-sm'>
                        Add this script before closing the
                        <span className='font-mono'> &lt;/body&gt; </span>
                        tag.
                    </p>

                    <pre className='text-sm overflow-x-auto text-green-400 bg-app-text/10 p-4 rounded border border-app-border'>
                        {`<script
    src="http://localhost:5173/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>`}
                    </pre>
                </div>

                {/* Step 4 */}
                <div className='bg-app-card space-y-4'>
                    <div className='flex items-center gap-3'>
                        <Play size={20} />
                        <h2 className='text-xl font-semibold'>
                            Step 4 — Deploy Your App
                        </h2>
                    </div>

                    <p className='text-app-text-h text-sm'>
                        Deploy your website normally.
                        BugLens will automatically initialize and monitor:
                    </p>

                    <ul className='list-disc pl-6 text-sm text-app-text/50 space-y-2 bg-app-text/10 p-4 rounded border border-app-border'>
                        <li>Runtime JavaScript errors</li>
                        <li>Unhandled promise rejections</li>
                        <li>Stack traces</li>
                        <li>Browser + page metadata</li>
                        <li>Fetching Issues</li>
                    </ul>
                </div>

                {/* Step 5 */}
                <div className=' bg-app-card space-y-4'>
                    <div className='flex items-center gap-3'>
                        <CheckCircle2 size={20} />
                        <h2 className='text-xl font-semibold'>
                            Step 5 — View Errors Live
                        </h2>
                    </div>

                    <p className='text-app-text-h text-sm'>
                        Once users interact with your application,
                        errors will instantly appear in your BugLens dashboard
                        with:
                    </p>

                    <ul className='list-disc pl-6 text-sm text-app-text/50 space-y-2 bg-app-text/10 p-4 rounded border border-app-border'>
                        <li>Error message</li>
                        <li>Stack trace</li>
                        <li>Page URL</li>
                        <li>Browser information</li>
                        <li>Real-time event stream</li>
                    </ul>
                </div>

                {/* Example */}
                <div className='bg-app-/5'>
                    <p className='text-sm text-app-text mb-3'>
                        Complete Example
                    </p>

                    <pre className='text-sm overflow-x-auto text-green-400 bg-app-text/10 p-4 rounded border border-app-border'>
                        {`<html>
  <body>
    <div>
        {/* Designing Part */}
    </div>
    <script
      src="http://localhost:5173/sdk/sdk.js"
      data-api-key="bg_live_xxxxxxxxx"
    >
    </script>
  </body>
</html>`}
                    </pre>
                </div>
                <div className=' rounded p-3 bg-linear-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/20 text-center'>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 mb-4">
                        <CheckCircle2 className="text-emerald-500" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-app-text mb-2">You're all set!</h3>
                    <p className="text-app-text-h text-sm">Waiting for your first event... Errors will appear in the dashboard as they happen.</p>
                </div>

            </div>
        </div>
    )
}

export default Installation