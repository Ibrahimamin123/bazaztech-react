import { FaYoutube, FaTimes } from "react-icons/fa";

// Change this URL later to point at the real founder video.
// Accepts a normal "watch" or "youtu.be" link — it's converted to an
// embeddable URL automatically below.
export const FOUNDER_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const getYouTubeId = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }
    if (parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }
    const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch) return embedMatch[1];
  } catch {
    // fall through
  }
  return null;
};

const FounderVideoModal = ({ show, onClose, videoUrl = FOUNDER_VIDEO_URL }) => {
  if (!show) return null;

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : videoUrl;
  const watchUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : videoUrl;

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
