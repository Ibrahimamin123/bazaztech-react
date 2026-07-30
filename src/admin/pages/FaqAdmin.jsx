import CmsManager from "../components/CmsManager";
import { faqApi } from "../services/cmsApi";

const FaqAdmin = () => (
  <CmsManager
    title="FAQs"
    subtitle="Manage frequently asked questions."
    api={faqApi}
    dataKey="faqs"
    fields={[
      { name: "question", label: "Question", required: true, maxLength: 220, placeholder: "Enter frequently asked question" },
      { name: "answer", label: "Answer", type: "textarea", required: true, maxLength: 1500, placeholder: "Provide a helpful answer" },
      { name: "order", label: "Order", type: "number", col: "col-md-6", min: 0, placeholder: "Display order" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default FaqAdmin;
