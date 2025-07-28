import { Modal, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { markChapterAsWatched } from "../services/courseService";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface VideoModalProps {
  open: boolean;
  videoUrl: string;
  onClose: () => void;
  chapterId: string;
  onWatched: (chapterId: string) => void;
}

const VideoPlayerModal = ({
  open,
  videoUrl,
  onClose,
  chapterId,
  onWatched,
}: VideoModalProps) => {
  const [watchedPercent, setWatchedPercent] = useState<number>(0);
  const [marked, setMarked] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userId = useSelector((state: RootState) => state.auth.id);

  useEffect(() => {
    if (!open) {
      setWatchedPercent(0);
      setMarked(false); 
    }
  }, [open]);

  const handleTimeUpdate = async () => {
    const video = videoRef.current;
    if (!video) return;

    const percent = Math.round((video.currentTime / video.duration) * 100);
    setWatchedPercent(percent);

    // Only mark as watched once when threshold reached
    if (!marked && percent >= 9) {
      try {
        await markChapterAsWatched(userId!, chapterId);
        onWatched(chapterId);
        setMarked(true);
      } catch (err) {
        console.error("Failed to mark chapter as watched:", err);
      }
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Watch Lecture"
      width={800}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        width="100%"
        onTimeUpdate={handleTimeUpdate}
      />

      <div style={{ marginTop: "10px" }}>
        <strong>Watched:</strong>{" "}
        <Progress percent={watchedPercent} size="small" />
      </div>
    </Modal>
  );
};

export default VideoPlayerModal;
