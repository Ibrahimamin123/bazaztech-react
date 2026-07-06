import CmsManager from "../components/CmsManager";
import { caseStudyApi } from "../services/cmsApi";

const PortfolioAdmin = () => (
  <CmsManager
    title="Case Studies"
    subtitle="Manage portfolio and case study content."
    api={caseStudyApi}
    dataKey="caseStudies"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-12" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "image", label: "Image", type: "upload" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default PortfolioAdmin;
