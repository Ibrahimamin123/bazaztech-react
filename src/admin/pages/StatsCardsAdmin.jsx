import CmsManager from "../components/CmsManager";
import { statsCardApi } from "../services/cmsApi";

const StatsCardsAdmin = () => (
  <CmsManager
    title="Hero Stats Cards"
    subtitle="Manage the 4 stat cards shown in the homepage hero section."
    api={statsCardApi}
    dataKey="statsCards"
    fields={[
      { name: "image", label: "Image Upload (Logo/Icon)", type: "upload", col: "col-12", hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB." },
      { name: "value", label: "Text", required: true, col: "col-12", maxLength: 80, placeholder: "e.g. 1200+ Happy Clients" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default StatsCardsAdmin;
