import { useWebsiteSettings } from "../hooks/useWebsiteSettings";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP } from "../utils/whatsapp";

const WhatsAppButton = ({
  children = "Get a free consultation",
  className = "btn btn-primary custom-btn",
  message = "Hello! I'd like to get a free consultation.",
  ...props
}) => {
  const { whatsapp } = useWebsiteSettings();
  const url = buildWhatsAppUrl(whatsapp || DEFAULT_WHATSAPP, message);

  const handleClick = () => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};

export default WhatsAppButton;
