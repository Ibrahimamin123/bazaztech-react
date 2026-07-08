import CmsManager from "../components/CmsManager";
import { aboutApi } from "../services/cmsApi";

const AboutAdmin = () => (
  <CmsManager
    title="About Sections"
    subtitle="Manage mission, vision, and company story tabs."
    api={aboutApi}
    dataKey="aboutSections"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-6", maxLength: 120, placeholder: "Enter section title" },
      { name: "order", label: "Order", type: "number", col: "col-md-6", min: 0, placeholder: "Display order (0, 1, 2...)" },
      { name: "text", label: "Content", type: "textarea", rows: 5, required: true, maxLength: 2000, placeholder: "Enter detailed section content" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active on website" },
    ]}
  />
);

export default AboutAdmin;
