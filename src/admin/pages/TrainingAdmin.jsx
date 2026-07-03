import CmsManager from "../components/CmsManager";
import { trainingApi } from "../services/cmsApi";

const TrainingAdmin = () => (
  <CmsManager
    title="Corporate Training"
    subtitle="Manage training hero, features, and programs."
    api={trainingApi}
    dataKey="trainings"
    fields={[
      { name: "title", label: "Title", required: true, col: "col-md-6" },
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
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "upload" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TrainingAdmin;
