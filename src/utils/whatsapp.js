export const buildWhatsAppUrl = (number, message = "") => {
  if (!number) return null;
  const digits = String(number).replace(/\D/g, "");
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
};

export const DEFAULT_WHATSAPP = "+923278445721";
