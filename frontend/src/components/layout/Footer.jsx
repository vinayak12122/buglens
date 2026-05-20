import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Copy, Check } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'

const Footer = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const currentYear = new Date().getFullYear()

  const copyEmail = () => {
    navigator.clipboard.writeText('mishravinayak613@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="relative w-full bg-app-bg p overflow-hidden px-5 pt-20">

      {/* Footer Card */}
      <div className="relative z-20 max-w-6xl mx-auto bg-transparent sm:bg-app-bg border-none sm:border border-app-border rounded px-8 md:px-14 py-10 mb-10 sm:shadow-[0_30px_80px_rgba(0,0,0,0.18)] ">

        {/* Top Content */}
        <div className="grid md:grid-cols-12 gap-12">

          {/* Left */}
          <div className="md:col-span-5">
            <h2
              onClick={() => navigate('/')}
              className="text-2xl font-semibold text-app-text cursor-pointer"
            >
              BugLens
            </h2>

            <p className="text-app-text-h text-sm mt-4 max-w-sm leading-relaxed">
              Capture production bugs instantly and debug modern applications faster.
            </p>

            {/* Socials */}
            <div className="gap-4 mt-8 hidden sm:flex">
              <a
                href="https://github.com/vinayak12122"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-app-border flex items-center justify-center text-purple-700 hover:bg-purple-700 hover:text-white transition-all duration-300"
              >
                <FaGithub size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/vinayak-mishra-b14412351/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-app-border flex items-center justify-center text-purple-700 hover:bg-purple-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="md:col-span-3 ">
            <h4 className="text-app-text font-medium mb-5">About Product</h4>

            <div className="space-y-3 text-sm text-app-text-h">
              <button
                onClick={() => navigate('/auth/login')}
                className="block hover:text-purple-700 transition"
              >
                Dashboard
              </button>

              <button
                onClick={() => navigate('/page/docs')}
                className="block hover:text-purple-700 transition"
              >
                Documentation
              </button>
              <button
                onClick={() => navigate('/page/features')}
                className="block hover:text-purple-700 transition"
              >
                Features
              </button>
            </div>
          </div>

          <div className='sm:hidden'>
            <p className='text-app-text font-medium mb-5 '>Connect with me</p>
            <div className='flex gap-4'>
              <a
                href="https://github.com/vinayak12122"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-app-border flex items-center justify-center text-purple-700 hover:bg-purple-700 hover:text-white transition-all duration-300"
              >
                <FaGithub size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/vinayak-mishra-b14412351/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-app-border flex items-center justify-center text-purple-700 hover:bg-purple-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="md:col-span-4">
            <h4 className="text-app-text font-medium mb-5">Support</h4>

            <div className="flex items-center gap-2">
              {/* <Mail size={15} className="text-purple-700" /> */}

              <a
                href="mailto:mishravinayak613@gmail.com"
                className="text-sm text-app-text-h hover:text-app-text"
              >
                mishravinayak613@gmail.com
              </a>

              <button onClick={copyEmail}>
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-app-text-h hover:text-purple-700 transition" />
                )}
              </button>

            </div>
          </div>
        </div>
      </div>

      <div className="relative -mb-8 sm:-mb-20 text-center z-10 pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] md:text-[14rem] font-black tracking-tight text-app-text/10 dark:text-white/10 leading-none">
          BUGLENS
        </h1>
      </div>

    </footer>
  )
}

export default Footer