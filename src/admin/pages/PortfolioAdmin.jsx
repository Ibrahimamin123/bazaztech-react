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
      {
        name: "image",
        label: "Image",
        type: "upload",
        required: true,
        hint: "Maximum File Size: 1 MB\nRecommended Dimensions: 1200 × 800 px\nWidth: 1200 px\nHeight: 800 px",
      },
      {
        name: "externalUrl",
        label: "Read More URL",
        required: true,
        url: true,
        col: "col-md-12",
        maxLength: 500,
        placeholder: "https://example.com/case-study",
        helpText: "Visitors will open this link when they click Read More.",
      },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default PortfolioAdmin;
