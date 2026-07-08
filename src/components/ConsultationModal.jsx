import ContactForm from "./ContactForm";
import WhatsAppButton from "./WhatsAppButton";

const ConsultationModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay" role="dialog" aria-modal="true">
      <div className="custom-modal consultation-modal">
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h3>Get Free Consultation</h3>
        <p className="mb-4">
          Fill out the form below and our team will contact you shortly.
        </p>

        <ContactForm className="contact-form-card" compact onSubmitted={onClose} />

        <div className="mt-3 d-flex justify-content-end">
          <WhatsAppButton className="btn btn-success">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
