export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image file uploaded.",
    });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    imageUrl,
  });
};
