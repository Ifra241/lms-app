import { Modal, Progress } from "antd";
import { useEffect,useRef,useState } from "react";
import { markChapterAsWatched } from "../services/courseService";
import { useSelector } from "react-redux";
import type { RootState } from "../store";




interface VideoModalProps{
    open:boolean;
    videoUrl:string;
    onClose:()=>void;
      chapterId: string;
    onWatched: (chapterId: string) => void;

}


const VideoPlayerModal=({open,videoUrl,onClose,chapterId ,onWatched}:VideoModalProps)=>{
    const[watchedPercent,setWatchedPercent]=useState<number>(0);
    const videoRef=useRef<HTMLVideoElement>(null);
      const userId = useSelector((state: RootState) => state.auth.id);
        const [marked, setMarked] = useState(false);




useEffect(()=>{
    if(!open){
        setWatchedPercent(0);
    }
},[open])


    const handleTimeUpdate=async()=>{
        const video=videoRef.current;
        if(!video||marked)return;
            const percent=(video.currentTime/video.duration)*100;
            setWatchedPercent(percent);

            if(percent>=2){
                try{
                    await markChapterAsWatched(userId!,chapterId);
                    onWatched(chapterId);
                            setMarked(true);
                        }catch(err){
                            console.error("Failed to Mark:",err)
    }
        }
    };
    
    return(
        <>
        <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        title="Watch Lecture"
        width={800} >
            <video
            ref={videoRef}
            src={videoUrl}
            controls
             width="100%"
        onTimeUpdate={handleTimeUpdate} />
<div>
<strong>Watched:</strong><Progress percent={watchedPercent} size="small"/>
</div>

        </Modal>
      </>
  );
};

export default VideoPlayerModal;