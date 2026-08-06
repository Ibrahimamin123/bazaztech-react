// Central place for permission keys used across the admin panel.
// These string values MUST match the permission keys stored on the
// Admin model in the backend (backend-live/models/Admin.js ->
// ADMIN_PERMISSIONS) so that frontend route guards stay in sync with
// whatever a Super Administrator assigns to a role.

export const MODULE_PERMISSIONS = {
  dashboard: "dashboard_access",
  services: "manage_services",
  portfolio: "manage_case_studies",
  training: "manage_training_programs",
  admins: "manage_admins",
  messages: "manage_messages",
  settings: "manage_website_settings",
  media: "manage_media",
};

export const CRUD_PERMISSIONS = {
  view: "view_records",
  create: "create_records",
  edit: "edit_records",
  delete: "delete_records",
};

// Roles that always bypass individual permission checks.
export const SUPER_ROLE = "Super Administrator";

// True if the logged-in admin is allowed to do everything, regardless of
// which individual permissions were assigned to them.
export const hasFullAccess = (admin) =>
  admin?.role === SUPER_ROLE || Boolean(admin?.permissions?.includes("full_access"));

// `required` can be a single permission key or an array of permission keys.
// A route/section is unlocked if the admin has full access, OR holds at
// least one of the requested permissions (module permission OR the
// matching generic CRUD permission) — this mirrors how roles are built in
// the "Admins" screen, where a role can be given either a module-specific
// permission, a generic one, or both.
export const hasPermission = (admin, required) => {
  if (!required) return true;
  if (hasFullAccess(admin)) return true;

  const requiredList = Array.isArray(required) ? required : [required];
  const granted = admin?.permissions || [];

  return requiredList.some((permission) => granted.includes(permission));
};
