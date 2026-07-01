import CmsManager from "../components/CmsManager";
import { teamApi } from "../services/cmsApi";

const TeamAdmin = () => (
  <CmsManager
    title="Team Members"
    subtitle="Manage your team profiles displayed on the website."
    api={teamApi}
    dataKey="members"
    fields={[
      { name: "name", label: "Name", required: true, col: "col-md-6" },
      { name: "role", label: "Role", required: true, col: "col-md-6" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image", label: "Photo", type: "upload", col: "col-md-6" },
      { name: "linkedin", label: "LinkedIn URL", col: "col-md-6" },
      { name: "order", label: "Order", type: "number", col: "col-md-6" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TeamAdmin;
