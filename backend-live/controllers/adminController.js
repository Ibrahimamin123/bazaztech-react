import bcrypt from "bcrypt";
import Admin, { ADMIN_PERMISSIONS, ADMIN_ROLES } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword, validateRequired, sanitizeString } from "../utils/validate.js";

const normalizeRole = (role) => {
  if (role === "Super Admin") return "Super Administrator";
  if (role === "Admin") return "Administrator";
  if (role === "Editor") return "Content Editor";
  return role || "Administrator";
};

const adminResponse = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
  role: normalizeRole(admin.role),
  permissions: admin.permissions || [],
  avatar: admin.avatar || "",
});

const getRolePermissions = (role, permissions = []) => {
  const normalizedRole = normalizeRole(role);
  if (normalizedRole === "Super Administrator") return ADMIN_PERMISSIONS;
  if (permissions.includes("full_access")) return ADMIN_PERMISSIONS;
  return permissions.filter((permission) => ADMIN_PERMISSIONS.includes(permission));
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role, permissions = [] } = req.body;

    const nameCheck = validateRequired(name, "Name", 80);
    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);

    if (!nameCheck.valid || !emailCheck.valid || !passwordCheck.valid) {
      return res.status(400).json({
        success: false,
        message:
          nameCheck.message || emailCheck.message || passwordCheck.message,
      });
    }

    const existingAdmin = await Admin.findOne({ email: emailCheck.value });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const normalizedRole = normalizeRole(role || "Administrator");
    if (!ADMIN_ROLES.includes(normalizedRole)) {
      return res.status(400).json({ success: false, message: "Invalid role selected." });
    }
    const admin = await Admin.create({
      name: nameCheck.value,
      email: emailCheck.value,
      password: hashedPassword,
      role: normalizedRole,
      permissions: getRolePermissions(normalizedRole, permissions),
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      admin: adminResponse(admin),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailCheck = validateEmail(email);
    const passwordCheck = validatePassword(password);

    if (!emailCheck.valid || !passwordCheck.valid) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({ email: emailCheck.value });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated.",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error. JWT_SECRET is not set.",
      });
    }

    const token = jwt.sign(
      {
        id: String(admin._id),
        role: normalizeRole(admin.role),
        permissions: admin.permissions || [],
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: adminResponse(admin),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(String(req.admin.id)).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    res.json({ success: true, admin: adminResponse(admin) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(String(req.admin.id));

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    const { name, email, password, currentPassword, avatar } = req.body;
    const updates = {};

    if (name !== undefined) {
      const nameCheck = validateRequired(name, "Name", 80);
      if (!nameCheck.valid) {
        return res.status(400).json({ success: false, message: nameCheck.message });
      }
      updates.name = nameCheck.value;
    }

    if (email !== undefined) {
      const emailCheck = validateEmail(email);
      if (!emailCheck.valid) {
        return res.status(400).json({ success: false, message: emailCheck.message });
      }
      const existing = await Admin.findOne({
        email: emailCheck.value,
        _id: { $ne: admin._id },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already in use." });
      }
      updates.email = emailCheck.value;
    }

    if (avatar !== undefined) {
      updates.avatar = sanitizeString(avatar, 500);
    }

    if (password) {
      const passwordCheck = validatePassword(password, { minLength: 6 });
      if (!passwordCheck.valid) {
        return res.status(400).json({ success: false, message: passwordCheck.message });
      }
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to set a new password.",
        });
      }
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect.",
        });
      }
      updates.password = await bcrypt.hash(password, 10);
    }

    const updated = await Admin.findByIdAndUpdate(admin._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully.",
      admin: adminResponse(updated),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdmins = async (_req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, admins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.email) {
      const emailCheck = validateEmail(updates.email);
      if (!emailCheck.valid) {
        return res.status(400).json({ success: false, message: emailCheck.message });
      }
      updates.email = emailCheck.value;
    }

    if (updates.name) {
      const nameCheck = validateRequired(updates.name, "Name", 80);
      if (!nameCheck.valid) {
        return res.status(400).json({ success: false, message: nameCheck.message });
      }
      updates.name = nameCheck.value;
    }

    if (updates.password) {
      const passwordCheck = validatePassword(updates.password);
      if (!passwordCheck.valid) {
        return res.status(400).json({ success: false, message: passwordCheck.message });
      }
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    if (updates.role || updates.permissions) {
      const role = normalizeRole(updates.role || "Administrator");
      if (!ADMIN_ROLES.includes(role)) {
        return res.status(400).json({ success: false, message: "Invalid role selected." });
      }
      updates.role = role;
      updates.permissions = getRolePermissions(role, updates.permissions || []);
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    res.json({ success: true, message: "Admin updated.", admin: adminResponse(admin) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    res.json({ success: true, message: "Admin deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
