import { CodeXml, Menu, Shield, X, Zap,SignalHigh , Crosshair} from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom'
import MenuPage from "../ui/MenuPage";

const letters = [
  {
    letter: "B",
    ropeHeight: "18vh",
    animation: "animate-swing-left",
  },
  {
    letter: "U",
    ropeHeight: "12vh",
    animation: "animate-swing-middle",
  },
  {
    letter: "G",
    ropeHeight: "16vh",
    animation: "animate-swing-right",
  },
];

const Body = ({ openMenu, setOpenMenu , activePage,setActivePage}) => {

  const navigate = useNavigate();

  return (
    <div>

      <div
        className={`
    fixed bg-purple-700 p-3 text-center z-100
    transition-all duration-500 ease-in-out sm:hidden overflow-hidden
    ${openMenu ? 'w-full h-full rounded-none' : 'w-14 h-14 rounded-[0px_0%_50%_0px]'}
  `}
      >
        <button
          onClick={() => setOpenMenu(prev => !prev)}
          className="flex justify-start items-start focus:outline-none text-white relative top-0.5"
        >
          {openMenu ? <X /> : <Menu />}
        </button>

        <div
          className={`
      w-full h-full flex relative top-10 justify-center
      transition-all duration-300 delay-150
      ${openMenu
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
            }
    `}
        >
          <MenuPage />
        </div>
      </div>


      {/* ======== BODY =========== */}
      <section className="w-full bg-app-bg overflow-hidden flex justify-center gap-[3vw] sm:gap-[8vw] pb-20 sm:pb-5">
        {letters.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center ${item.animation} origin-top`}
          >
            {/* Rope */}
            <div
              className="w-0.5 bg-app-text z-10"
              style={{ height: item.ropeHeight }}
            />

            <div className="relative -mt-3.5 sm:-mt-5">
              {/* hook pinned INTO letter */}
              <div className="absolute left-1/2 top-1.5 sm:top-2.5 -translate-x-1/2 z-30">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-app-bg border border-app-text" />
              </div>

              <h1 className="text-app-text text-[22vw] md:text-[140px] font-extralight leading-none tracking-wider">
                {item.letter}
              </h1>
            </div>
          </div>
        ))}
      </section>
      {/* ========== HERO SECTION ========= */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-0 sm:py-20">
        <div className=" flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* LEFT SIDE */}
          <div className="flex-1 max-w-2xl">

            <div className="space-y-2 pb-5 sm:pb-0">
              <p className="text-3xl sm:text-5xl font-bold text-app-text ">
                Monitor Bugs.
              </p>

              <p className="text-3xl sm:text-5xl font-bold text-app-text">
                Fix Issues.
                <span className="text-purple-700"> Ship Better.</span>
              </p>
            </div>

            <p className="mt-6 text-gray-400 text-sm sm:text-lg leading-relaxed max-w-xl hidden sm:block">
              Scalable realtime bug monitoring and issue tracking for modern
              applications. Capture crashes, logs and performance
              problems before your users report them.
            </p>
            <p className=" text-gray-400 text-sm sm:text-lg leading-relaxed max-w-xl sm:hidden">
              Scalable, real-time app monitoring that catches crashes and performance issues before users notice
            </p>

            <div className="flex gap-4 mt-8 mb-20 sm:mb-0 flex-col sm:flex-row">
              <button className="
          sm:px-6 sm:py-3 py-2 px-3 rounded bg-purple-700 text-white
          hover:bg-purple-700/60 transition-all duration-300
        "
                onClick={() => navigate('/auth/login')}
              >
                Start Monitoring
              </button>

              <button className="
          sm:px-6 sm:py-3 py-2 px-3 rounded-lg border border-app-border
          text-app-text hover:bg-white/5 transition-all duration-300
        "
        onClick={()=>navigate('/page/docs')}
        >
                View Docs
              </button>
            </div>
            <div className="mt-10 flex-col sm:flex-row gap-4 hidden sm:flex ">
              <div className="flex gap-2">
                <Zap className="text-purple-700" />
                <p className="text-gray-400">Real time logs</p>
              </div>
              <div className="flex gap-2">
                <Shield className="text-purple-700" />
                <p className="text-gray-400">99% Uptime</p>
              </div>
              <div className="flex gap-2">
                <CodeXml className="text-purple-700" />
                <p className="text-gray-400">Developer friendly</p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className=" flex-1 relative flex justify-center items-center min-h-75 sm:min-h-125 w-[90%]
    ">

            {/* Bottom Card */}
            <div className=" relative rotate-[-8deg] transition-all duration-500 hover:rotate-[-4deg] hover:scale-[1.02]
      ">
              <img
                src="/card-1.jpg"
                alt="Card 1"
                className=" w-[80vw] sm:w-[70vw] lg:w-[42vw] max-w-175 rounded border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]
          "
              />
            </div>

            {/* Top Card */}
            <div className=" absolute rotate-[8deg] transition-all duration-500 hover:rotate-[4deg] hover:scale-[1.02]
      ">
              <img
                src="/card-2.jpg"
                alt="Card 2"
                className=" w-[80vw] sm:w-[70vw] lg:w-[42vw] max-w-175 rounded border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.25)]
          "
              />
            </div>
          </div>
        </div>
      </div>


      {/* ========= FEATURE SECTION ======= */}
      <div className="my-24 px-4 sm:px-8 lg:px-16">

        <div className="text-center mb-14">
          <p className="text-purple-700 text-sm font-semibold tracking-[0.2em] uppercase">
            Features
          </p>

          <h2 className="text-app-text text-3xl sm:text-5xl font-bold mt-3">
            Everything you need to ship stable apps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              title: "Realtime Error Tracking",
              desc: "Capture frontend and backend crashes instantly with detailed stack traces and metadata."
            },
            {
              icon: Shield,
              title: "Smart Issue Grouping",
              desc: "Automatically group duplicate issues together and reduce debugging noise."
            },
            {
              icon: CodeXml,
              title: "Stack Trace Analysis",
              desc: "Debug faster with readable stack traces, source maps and issue context."
            },
            {
              icon: SignalHigh,
              title: "High Performance SDK",
              desc: "Lightweight SDK optimized for minimal performance impact in production."
            },
            {
              icon: Crosshair,
              title: "Capture every possible bug",
              desc: "Capable of capture every single bug of you application."
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className='group rounded border border-app-border bg-linear-to-br from-purple-700/10 via-transparent to-transparent p-7 hover:border-purple-700/30 hover:-translate-y-1 transition-all duration-300'
              >
                <div className="w-14 h-14 rounded bg-purple-700/10 border border-purple-700/20 flex items-center justify-center mb-5">
                  <Icon className="text-purple-700" size={28} />
                </div>

                <h3 className="text-app-text text-xl font-semibold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-400 mt-3 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HOW IT WORKS */}

      <div className="w-full px-4 sm:px-8 lg:px-16 mb-24">

        {/* Heading */}
        <div className="text-center">
          <p className="text-purple-700 text-sm font-semibold tracking-[0.2em] uppercase">
            HOW IT WORKS
          </p>

          <p className="text-app-text text-3xl sm:text-5xl font-bold mt-3">
            Three steps to better stability
          </p>
        </div>

        {/* Steps */}
        <div className=" relative mt-20 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8
  ">

          <div className=" hidden md:block absolute top-14 left-[16%] w-[68%] h-0.5 border-t border border-purple-700/40
    "></div>

          <div className="relative flex flex-col items-center text-center z-50">

            {/* Circle */}
            <div className=" relative z-10 w-28 h-28 rounded bg-purple-700 border border-purple-700/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.15)]
      ">
              <CodeXml className="text-app-bg" size={42} />
            </div>


            <h3 className="text-app-text text-2xl font-semibold mt-10">
              Install SDK
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed text-sm max-w-xs">
              Add our lightweight SDK to your frontend or backend
              application within minutes.
            </p>

          </div>

          {/* STEP 2 */}
          <div className="relative flex flex-col items-center text-center">

            {/* Circle */}
            <div className=" relative z-10 w-28 h-28 rounded bg-purple-700 border border-purple-700/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.15)]
      ">
              <Zap className="text-app-bg" size={42} />
            </div>
            <h3 className="text-app-text text-2xl font-semibold mt-10">
              Capture Errors
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed text-sm max-w-xs">
              Automatically collect crashes, logs, stack traces
              and performance issues in realtime.
            </p>

          </div>

          {/* STEP 3 */}
          <div className="relative flex flex-col items-center text-center">

            {/* Circle */}
            <div className=" relative z-10 w-28 h-28 rounded bg-purple-700 border border-purple-700/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.15)]
      ">
              <Shield className="text-app-bg" size={42} />
            </div>
            <h3 className="text-app-text text-2xl font-semibold mt-10">
              Fix Bugs Faster
            </h3>

            <p className="text-gray-400 mt-4 leading-relaxed text-sm max-w-xs">
              Debug efficiently with grouped issues,
              source maps and detailed diagnostics.
            </p>

          </div>
        </div>
      </div>

      {/* ====== MESSAGE ===== */}
      <div className="w-full px-4 sm:px-8 lg:px-16 mb-20">

        <div
          className=" relative overflow-hidden rounded-3xl border border-white/5 py-14 px-6 sm:px-12 flex flex-col items-center justify-center text-center bg-app-bg
    "
        >

          {/* Purple Glow */}
          <div
            className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_70%)]
        pointer-events-none
      "
          ></div>

          {/* Top Glow */}
          <div
            className=" absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent
      "
          ></div>

          {/* Content */}
          <div className="relative z-10">

            <h2 className="text-app-text text-3xl sm:text-5xl font-bold">
              Start monitoring your app today
            </h2>

            {/* <p className="text-app-text mt-5 text-sm sm:text-lg max-w-2xl mx-auto">
              Join hundreds of developers who ship better software
              with BugLens.
            </p> */}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">

              <button
                className=" px-8 py-3 rounded bg-purple-700/50 text-white font-medium hover:bg-purple-700/70 transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.35)]
          "
                onClick={() => navigate('/auth/login')}
              >
                Start Free
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Body;