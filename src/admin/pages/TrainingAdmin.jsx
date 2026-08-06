import CmsManager from "../components/CmsManager";
import { trainingApi } from "../services/cmsApi";

const TrainingAdmin = () => (
  <CmsManager
    title="Corporate Training"
    subtitle="Manage training programs shown on the Corporate Training page."
    api={trainingApi}
    dataKey="trainings"
    defaultItem={{ section: "program" }}
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-12", maxLength: 120, placeholder: "Enter training title" },
      { name: "subtitle", label: "Subtitle", col: "col-12", maxLength: 200, placeholder: "Short subtitle shown under the title (optional)" },
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000, placeholder: "Enter a clear and concise description" },
      {
        name: "image",
        label: "Featured Image",
        type: "upload",
        required: true,
        hint: "Maximum File Size: 1 MB\nRecommended Dimensions: 1200 × 800 px\nWidth: 1200 px\nHeight: 800 px",
      },
      {
        name: "additionalImages",
        label: "Additional Images",
        type: "multiupload",
        hint: "Maximum File Size: 1 MB each\nRecommended Dimensions: 1200 × 800 px\nWidth: 1200 px\nHeight: 800 px",
      },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TrainingAdmin;
