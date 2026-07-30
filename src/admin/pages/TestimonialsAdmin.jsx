import CmsManager from "../components/CmsManager";
import { testimonialApi } from "../services/cmsApi";

const TestimonialsAdmin = () => (
  <CmsManager
    title="Testimonials"
    subtitle="Manage client testimonials and reviews."
    api={testimonialApi}
    dataKey="testimonials"
    fields={[
      { name: "name", label: "Client Name", required: true, col: "col-md-6", maxLength: 80, placeholder: "Client full name" },
      { name: "role", label: "Role", col: "col-md-6", maxLength: 80, placeholder: "Client role" },
      { name: "company", label: "Company", col: "col-md-6", maxLength: 120, placeholder: "Company name" },
      { name: "rating", label: "Rating (1-5)", type: "number", col: "col-md-6", required: true, min: 1, max: 5, placeholder: "1 to 5" },
      { name: "message", label: "Testimonial", type: "textarea", required: true, maxLength: 1200, placeholder: "Write client feedback" },
      { name: "image", label: "Photo", type: "upload", required: true, hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB." },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TestimonialsAdmin;
