import CmsManager from "../components/CmsManager";
import { socialApi } from "../services/cmsApi";

const SocialAdmin = () => (
  <CmsManager
    title="Social Media Links"
    subtitle="Manage footer and website social media links."
    api={socialApi}
    dataKey="socialLinks"
    fields={[
      { name: "platform", label: "Platform", required: true, col: "col-md-6" },
      { name: "url", label: "URL", required: true, col: "col-md-6" },
      { name: "icon", label: "Icon Name", col: "col-md-6" },
      { name: "order", label: "Order", type: "number", col: "col-md-6" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default SocialAdmin;
