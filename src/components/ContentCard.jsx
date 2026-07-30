import { resolveImageSrc } from "../utils/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop";

const ContentCard = ({ image, title, description, onReadMore, badge }) => (
  <div className="content-card">
    <div className="content-card-image">
      <img
        src={resolveImageSrc(image) || FALLBACK_IMAGE}
        alt={title}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK_IMAGE) {
            e.currentTarget.src = FALLBACK_IMAGE;
          }
        }}
      />
      {badge && <span className="content-card-badge">{badge}</span>}
    </div>
    <div className="content-card-body">
      <h3 className="content-card-title">{title}</h3>
      <p className="content-card-desc">{description}</p>
      <button type="button" className="content-card-btn" onClick={onReadMore}>
        Read More
        <span className="content-card-btn-arrow">→</span>
      </button>
    </div>
  </div>
);

export default ContentCard;
