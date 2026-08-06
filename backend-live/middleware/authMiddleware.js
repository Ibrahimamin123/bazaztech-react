import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const normalizeRole = (role) => {
  if (role === "Super Admin") return "Super Administrator";
  if (role === "Admin") return "Administrator";
  if (role === "Editor") return "Content Editor";
  return role || "Administrator";
};

export const protect = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "Server configuration error. JWT_SECRET is not set.",
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Please login.",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.admin?.role)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission for this action.",
    });
  }

  next();
};

export const attachAdmin = async (req, res, next) => {
  try {
    if (!req.admin?.id) return next();
    const admin = await Admin.findById(String(req.admin.id)).select("role permissions isActive");
    if (!admin || !admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is not active.",
      });
    }
    req.admin = {
      ...req.admin,
      role: normalizeRole(admin.role),
      permissions: admin.permissions || [],
    };
    next();
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to verify admin permissions.",
    });
  }
};

export const authorizePermissions = (...requiredPermissions) => (req, res, next) => {
  const permissions = req.admin?.permissions || [];
  const hasFullAccess =
    permissions.includes("full_access") || req.admin?.role === "Super Administrator";
  const allowed =
    hasFullAccess || requiredPermissions.every((permission) => permissions.includes(permission));

  if (!allowed) {
    return res.status(403).json({
      success: false,
      message: "You do not have the required permission for this action.",
    });
  }
  next();
};
