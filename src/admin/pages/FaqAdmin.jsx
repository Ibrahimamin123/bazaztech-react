import CmsManager from "../components/CmsManager";
import { faqApi } from "../services/cmsApi";

const FaqAdmin = () => (
  <CmsManager
    title="FAQs"
    subtitle="Manage frequently asked questions."
    api={faqApi}
    dataKey="faqs"
    fields={[
      { name: "question", label: "Question", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "order", label: "Order", type: "number", col: "col-md-6" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default FaqAdmin;
