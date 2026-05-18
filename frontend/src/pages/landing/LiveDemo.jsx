import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LiveDemo = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIcon, setShowIcon] = useState(true);

    const { isDark } = useTheme();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();

            videoRef.current.play().catch(() => {
                setIsPlaying(true);
            });
        }
    }, [isDark]);

    const toggleVideo = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setIsPlaying((prev) => !prev);
        setShowIcon(true);

        setTimeout(() => {
            setShowIcon(false);
        }, 1000);
    };

    return (
        <div className="w-full min-h-screen bg-app-bg text-app-text py-10 px-8 flex flex-col gap-10">
            <h2 className='text-3xl font-bold'>
                Watch Demo
            </h2>
            <div
                className="group max-w-7xl mx-auto relative cursor-pointer flex justify-center items-center border rounded-xl border-app-text/20 p-2 overflow-hidden"
                onClick={toggleVideo}
            >
                <video
                    ref={videoRef}
                    className="w-full h-65 sm:h-105 lg:h-auto lg:w-[90%] object-cover rounded "
                    muted
                    playsInline
                >
                    <source
                        src={isDark ? "/black-demo.mp4" : "/demo.mp4"}
                        type="video/mp4"
                    />
                </video>

                <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300
    ${showIcon ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                    <div
                        className="
            flex items-center justify-center
            w-15 h-15
            rounded-full
            bg-black/55
            border border-white/20
            text-white
            transition-transform duration-300
            group-hover:scale-110
        "
                    >
                        {isPlaying ? <Pause size={25} strokeWidth={2.5} /> : <Play size={25} strokeWidth={2.5} className="ml-1" />}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 w-full justify-center items-center pb-10 ">
                <p className="text-3xl font-bold lg:w-[90%] w-full  ">Explanation</p>
                <p className="text-app-text text-lg w-full lg:w-[90%] space-y-5 flex flex-col">
                    <span>
                        1. When the button breaks, it triggers an error in real time, and the Buglens script instantly captures it.
                    </span>

                    <span>
                        2. The Buglens script sends the error to the backend, which performs two actions: stores it in the database and broadcasts it via Socket.IO if a client is connected.
                    </span>

                    <span>
                        3. The frontend receives that event instantly and renders it in real time, exactly as shown in this demo.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LiveDemo;