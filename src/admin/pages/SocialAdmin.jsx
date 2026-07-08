import CmsManager from "../components/CmsManager";
import { socialApi } from "../services/cmsApi";

const SocialAdmin = () => (
  <CmsManager
    title="Social Media Links"
    subtitle="Manage footer and website social media links."
    api={socialApi}
    dataKey="socialLinks"
    fields={[
      { name: "platform", label: "Platform", required: true, col: "col-md-6", maxLength: 60, placeholder: "e.g. Facebook, LinkedIn" },
      { name: "url", label: "URL", required: true, col: "col-md-6", url: true, placeholder: "https://example.com/profile" },
      { name: "icon", label: "Icon Name", col: "col-md-6", maxLength: 60, placeholder: "Icon class or key" },
      { name: "order", label: "Order", type: "number", col: "col-md-6", min: 0, placeholder: "Display order" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default SocialAdmin;
