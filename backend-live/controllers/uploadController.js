export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file uploaded.",
    });
  }

  // Prefer an explicit PUBLIC_BASE_URL (set this in backend/.env for
  // production). Fall back to the request's own host so local dev and any
  // other environment still produce a correct, loadable URL instead of a
  // hardcoded domain.
  const base =
    process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get("host")}`;

  // Served under /api/uploads (not a bare /uploads) so the image URL rides
  // the same reverse-proxy path that already works for every other API
  // call. A bare /uploads path is commonly not forwarded to the Node
  // backend by the proxy, which was causing uploaded images to 404 in
  // production while working locally.
  const imageUrl = `${base}/api/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    imageUrl,
  });
};