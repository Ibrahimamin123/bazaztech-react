import { FaYoutube, FaTimes } from "react-icons/fa";

// Change this URL later to point at the real founder video.
// Accepts a normal "watch" or "youtu.be" link — it's converted to an
// embeddable URL automatically below.
export const FOUNDER_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const getYouTubeId = (url) => {
  if (!url) return null;
  
  try {
    let processedUrl = url;
    
    // Convert mobile YouTube URL to regular YouTube URL
    if (processedUrl.includes('m.youtube.com')) {
      processedUrl = processedUrl.replace('m.youtube.com', 'www.youtube.com');
    }
    
    const urlObj = new URL(processedUrl);
    
    // Handle youtu.be short links
    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.replace("/", "").split('?')[0];
    }
    
    // Handle youtube.com/live/VIDEO_ID (YE NAYA CODE ADD KAREIN)
    const liveMatch = urlObj.pathname.match(/\/live\/([^/?]+)/);
    if (liveMatch) return liveMatch[1];
    
    // Handle youtube.com/watch?v=VIDEO_ID
    if (urlObj.searchParams.get("v")) {
      return urlObj.searchParams.get("v");
    }
    
    // Handle youtube.com/embed/VIDEO_ID
    const embedMatch = urlObj.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch) return embedMatch[1];
    
    // Handle youtube.com/v/VIDEO_ID
    const vMatch = urlObj.pathname.match(/\/v\/([^/]+)/);
    if (vMatch) return vMatch[1];
    
    // Handle youtube.com/shorts/VIDEO_ID
    const shortsMatch = urlObj.pathname.match(/\/shorts\/([^/]+)/);
    if (shortsMatch) return shortsMatch[1];
    
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
  }
  
  return null;
};

const FounderVideoModal = ({
  show,
  onClose,
  videoUrl = FOUNDER_VIDEO_URL,
  channelUrl = "",
}) => {
  if (!show) return null;

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : videoUrl;
  // "Watch on YouTube" prefers the dashboard-configured channel link so
  // visitors land on the BazazTech channel; falls back to the video's own
  // watch page if no channel URL has been set yet.
  const watchUrl =
    channelUrl ||
    (videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl);

  return (
    <div
      className="founder-video-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="founder-video-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="founder-video-close"
          onClick={onClose}
          aria-label="Close video"
        >
          <FaTimes />
        </button>

        <div className="founder-video-frame">
          <iframe
            src={embedUrl}
            title="A Note from Our Founder"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="founder-video-watch-btn"
        >
          <FaYoutube /> Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default FounderVideoModal;
