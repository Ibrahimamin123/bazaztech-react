import { FaWhatsapp } from "react-icons/fa";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP } from "../utils/whatsapp";

const WhatsAppButton = ({
  children = "Chat on WhatsApp",
  className = "",
  message = "Hello! I'd like to get a free consultation.",
  showIcon = true,
  ...props
}) => {
  const { whatsapp } = useWebsiteSettings();
  const url = buildWhatsAppUrl(whatsapp || DEFAULT_WHATSAPP, message);

  const handleClick = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // Always include whatsapp-btn so green styling applies site-wide,
  // even when a custom className is passed.
  const classes = ["btn", "whatsapp-btn", className].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} onClick={handleClick} {...props}>
      {showIcon && <FaWhatsapp aria-hidden="true" />}
      {children}
    </button>
  );
};

export default WhatsAppButton;
