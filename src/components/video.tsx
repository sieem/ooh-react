import { baseUrl } from "../constants/baseUrl"
import { useRef, useState, useEffect } from 'react';
import { currentLeftPage$, currentRightPage$ } from '../store/currentPage.store';
import { useObservable } from "../hooks/useObservable.hook";


export function Video({ videoForward, videoBackward, pageId }: { videoForward: string, videoBackward: string, pageId: number }) {
  const [videoPosition, setVideoPosition] = useState<'forward' | 'backward'>('backward');
  const videoForwardRef = useRef<HTMLVideoElement>(null);
  const videoBackwardsRef = useRef<HTMLVideoElement>(null);
  const currentLeftPage = useObservable(currentLeftPage$);
  const currentRightPage = useObservable(currentRightPage$);

  useEffect(() => {
    if (!videoForwardRef.current || !videoBackwardsRef.current) {
      return;
    }

    if (currentLeftPage?.id === pageId || currentRightPage?.id === pageId) {
      setTimeout(() => {
        videoBackwardsRef.current?.play();
        setVideoPosition('backward');
      }, 250);
    }
    
  }, [currentLeftPage, currentRightPage]);

  const playForward = () => {
    if (!videoForwardRef.current || !videoBackwardsRef.current) {
      return;
    }

    if (videoBackwardsRef.current.currentTime === 0) {
      videoBackwardsRef.current.currentTime = videoBackwardsRef.current.duration;
    }

    videoForwardRef.current.currentTime = videoBackwardsRef.current.duration - videoBackwardsRef.current.currentTime;

    setTimeout(() => {
      videoForwardRef.current?.play();
      setVideoPosition('forward');
    });
  };

  const playBackward = () => {
    if (!videoForwardRef.current || !videoBackwardsRef.current) {
      return;
    }
    videoBackwardsRef.current.currentTime = videoForwardRef.current.duration - videoForwardRef.current.currentTime;

    setTimeout(() => {
      videoBackwardsRef.current?.play();
      setVideoPosition('backward');
    });
  };
  
  const forwardStyle = videoPosition === 'forward' ? { opacity: '1' } : {};
  const backwardStyle = videoPosition === 'backward' ? { opacity: '1' } : {};

  return <div className='h-full w-full relative'>
    <video className='opacity-0 absolute h-full w-full' style={forwardStyle} muted preload="auto" src={`${baseUrl}/${videoForward}`} ref={videoForwardRef} ></video>
    <video className='opacity-0 absolute h-full w-full' style={backwardStyle} muted preload="auto" src={`${baseUrl}/${videoBackward}`} ref={videoBackwardsRef} ></video>
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2' onMouseEnter={playForward} onMouseLeave={playBackward}></div>
  </div>
}
