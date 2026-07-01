import CmsManager from "../components/CmsManager";
import { aboutApi } from "../services/cmsApi";

const AboutAdmin = () => (
  <CmsManager
    title="About Sections"
    subtitle="Manage mission, vision, and company story tabs."
    api={aboutApi}
    dataKey="aboutSections"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-6" },
      { name: "order", label: "Order", type: "number", col: "col-md-6" },
      { name: "text", label: "Content", type: "textarea", rows: 5, required: true },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active on website" },
    ]}
  />
);

export default AboutAdmin;
