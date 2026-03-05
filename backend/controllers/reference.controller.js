import fs from "fs";
import ReferenceDoc from "../models/ReferenceDoc.js";

export const uploadReference = async (req, res) => {

  try {

    const content = fs.readFileSync(req.file.path, "utf-8");

    const doc = await ReferenceDoc.create({
      userId: req.user.id,
      filename: req.file.originalname,
      content
    });

    res.json({
      message: "Reference document uploaded",
      doc
    });

  } catch (error) {

    res.status(500).json({
      message: "Upload failed"
    });

  }
};