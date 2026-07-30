import CmsManager from "../components/CmsManager";
import { trustedLogoApi } from "../services/cmsApi";

const TrustedLogosAdmin = () => (
  <CmsManager
    title="Trusted-By Logos"
    subtitle="Manage the customer/brand logos in the homepage 'Trusted by Happy Customers' marquee."
    api={trustedLogoApi}
    dataKey="trustedLogos"
    fields={[
      { name: "image", label: "Image Upload", type: "upload", required: true, col: "col-12", hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB. Transparent PNG/SVG recommended." },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TrustedLogosAdmin;
