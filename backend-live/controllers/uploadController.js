export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file uploaded.",
    });
  }

  // Store a relative path so the frontend can resolve it against the
  // active API host (localhost in dev, production domain in prod).
  // Absolute PUBLIC_BASE_URL links break local uploads when .env points
  // at the live domain while files are saved on this machine.
  const imageUrl = `/api/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    imageUrl,
  });
};
