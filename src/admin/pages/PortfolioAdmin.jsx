import CmsManager from "../components/CmsManager";
import { caseStudyApi } from "../services/cmsApi";

const PortfolioAdmin = () => (
  <CmsManager
    title="Case Studies"
    subtitle="Manage portfolio and case study content."
    api={caseStudyApi}
    dataKey="caseStudies"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-12", maxLength: 120, placeholder: "Enter case study title" },
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000, placeholder: "Describe the project outcome and impact" },
      { name: "image", label: "Image", type: "upload", required: true, hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB." },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default PortfolioAdmin;
