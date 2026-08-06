import CmsManager from "../components/CmsManager";
import { trustedLogoApi } from "../services/cmsApi";

const TrustedLogosAdmin = () => (
  <CmsManager
    title="Trusted-By Logos"
    subtitle="Manage the customer/brand logos in the homepage 'Trusted by Happy Customers' marquee. Only the image is shown on the website — no names."
    api={trustedLogoApi}
    dataKey="trustedLogos"
    fields={[
      {
        name: "image",
        label: "Logo Image",
        type: "upload",
        required: true,
        col: "col-12",
        hint: "Maximum File Size: 1 MB\nRecommended Dimensions: 400 × 200 px\nWidth: 400 px\nHeight: 200 px",
      },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TrustedLogosAdmin;
