import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { resolveImageSrc } from "../utils/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop";

// Generic "Read More" detail modal. Shows only the single selected item —
// title, full (untruncated) description, featured image, and whichever
// optional list (results / features) is passed in. If the item ever gains
// an `images` array from the backend, additional images render
// automatically; today's models only expose a single `image`, so that
// gallery row simply doesn't render.
const ReadMoreModal = ({ show, onClose, item, listLabel, footer }) => {
  const galleryImages = Array.isArray(item?.images)
    ? item.images
    : Array.isArray(item?.additionalImages)
      ? item.additionalImages
      : [];

  return (
    <AnimatePresence>
      {show && item && (
        <motion.div
          className="readmore-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="readmore-modal"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="readmore-close"
              onClick={onClose}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {item.image && (
              <div className="readmore-image-wrap">
                <img
                  src={resolveImageSrc(item.image)}
                  alt={item.title}
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_IMAGE) {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }
                  }}
                />
              </div>
            )}

            <div className="readmore-body">
              <h2 className="readmore-title">{item.title}</h2>
              {item.subtitle && <p className="readmore-subtitle">{item.subtitle}</p>}
              <p className="readmore-description">{item.description || item.text}</p>

              {galleryImages.length > 0 && (
                <div className="readmore-gallery">
                  {galleryImages.map((src, i) => (
                    <div className="readmore-gallery-item" key={i}>
                      <img
                        src={resolveImageSrc(src)}
                        alt={`${item.title} ${i + 1}`}
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_IMAGE) {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(item.list) && item.list.length > 0 && (
                <div className="readmore-list">
                  {listLabel && <h4 className="readmore-list-label">{listLabel}</h4>}
                  <ul>
                    {item.list.map((entry, i) => (
                      <li key={i}>{entry}</li>
                    ))}
                  </ul>
                </div>
              )}

              {footer && <div className="readmore-footer">{footer}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReadMoreModal;
