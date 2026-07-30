import CmsManager from "../components/CmsManager";
import { trainingApi } from "../services/cmsApi";

const TrainingAdmin = () => (
  <CmsManager
    title="Corporate Training"
    subtitle="Manage training hero, features, and programs."
    api={trainingApi}
    dataKey="trainings"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-6", maxLength: 120, placeholder: "Enter training title" },
      {
        name: "section",
        label: "Section",
        type: "select",
        col: "col-md-6",
        options: [
          { value: "hero", label: "Hero" },
          { value: "feature", label: "Feature" },
          { value: "program", label: "Program" },
        ],
      },
      { name: "subtitle", label: "Subtitle", col: "col-12", maxLength: 200, placeholder: "Short subtitle shown under the title (optional)" },
      { name: "description", label: "Description", type: "textarea", required: true, maxLength: 1000, placeholder: "Enter a clear and concise description" },
      { name: "image", label: "Featured Image", type: "upload", required: true, hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB." },
      { name: "additionalImages", label: "Additional Images", type: "multiupload", hint: "Optional. Shown in the program's detail modal gallery." },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TrainingAdmin;
