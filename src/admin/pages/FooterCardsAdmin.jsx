import CmsManager from "../components/CmsManager";
import { footerCardApi } from "../services/cmsApi";

const FooterCardsAdmin = () => (
  <CmsManager
    title="Winning Deeds Cards"
    subtitle="Manage the stat cards shown in the 'Our Winning Deeds' section above the footer."
    api={footerCardApi}
    dataKey="footerCards"
    fields={[
      { name: "value", label: "Value", required: true, col: "col-md-6", maxLength: 40, placeholder: "e.g. 10+ or 10 Years" },
      { name: "label", label: "Label", required: true, col: "col-md-6", maxLength: 80, placeholder: "e.g. Industries Served" },
      { name: "order", label: "Order", type: "number", col: "col-md-6", min: 0, placeholder: "Display order" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default FooterCardsAdmin;
