import CmsManager from "../components/CmsManager";
import { teamApi } from "../services/cmsApi";

const TeamAdmin = () => (
  <CmsManager
    title="Team Members"
    subtitle="Manage your team profiles displayed on the website."
    api={teamApi}
    dataKey="members"
    fields={[
      { name: "name", label: "Name", required: true, col: "col-md-6", maxLength: 80, placeholder: "Full name" },
      { name: "role", label: "Role", required: true, col: "col-md-6", maxLength: 80, placeholder: "Job title" },
      { name: "bio", label: "Bio", type: "textarea", maxLength: 500, placeholder: "Short professional bio" },
      { name: "image", label: "Photo", type: "upload", col: "col-md-6", required: true, hint: "Supported: JPG/PNG/GIF/WebP/SVG, max 1MB." },
      { name: "linkedin", label: "LinkedIn URL", col: "col-md-6", url: true, placeholder: "https://linkedin.com/in/username" },
      { name: "order", label: "Order", type: "number", col: "col-md-6", min: 0, placeholder: "Display order" },
      { name: "status", label: "Status", type: "checkbox", checkboxLabel: "Active" },
    ]}
  />
);

export default TeamAdmin;
