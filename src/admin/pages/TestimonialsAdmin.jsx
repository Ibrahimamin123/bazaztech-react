import CmsManager from "../components/CmsManager";
import { testimonialApi } from "../services/cmsApi";

const TestimonialsAdmin = () => (
  <CmsManager
    title="Testimonials"
    subtitle="Manage client testimonials and reviews."
    api={testimonialApi}
    dataKey="testimonials"
    fields={[
      { name: "name", label: "Client Name", required: true, col: "col-md-6" },
      { name: "role", label: "Role", col: "col-md-6" },
      { name: "company", label: "Company", col: "col-md-6" },
      { name: "rating", label: "Rating (1-5)", type: "number", col: "col-md-6" },
      { name: "message", label: "Testimonial", type: "textarea", required: true },
      { name: "image", label: "Photo", type: "upload" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TestimonialsAdmin;
