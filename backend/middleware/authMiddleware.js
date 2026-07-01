import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
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
