import React, { useEffect, useRef, useState } from 'react'

const LiveDemo = () => {
    const videoRef = useRef();
    const [isPlaying,setIsPlaying] = useState(true);

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.play();
        };
    },[])

    const toggleVideo = ()=>{
        if(isPlaying){
            videoRef.current.pause();
        }else{
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };



    return (
        <div className='w-full min-h-screen bg-app-bg text-app-text'>

            <div 
            className='max-w-7xl mx-auto py-10 space-y-28 sm:px-10 px-5'
            onClick={toggleVideo}
            >
                <video 
                ref={videoRef}
                className='w-full rounded-xl'
                autoPlay
                muted
                playsInline
                >
                    <source src='/demo.mp4' type='video/mp4' />
                </video>

                <p>Hii</p>
            </div>
        </div>
    )
}

export default LiveDemo