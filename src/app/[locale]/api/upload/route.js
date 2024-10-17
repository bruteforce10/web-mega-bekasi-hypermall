// app/api/upload/route.js

import { NextResponse } from "next/server";
import multer from "multer";
import { promisify } from "util";

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

// Convert Multer middleware to use with async/await
const uploadMiddleware = promisify(upload.single("file"));

// POST request handler for file uploads
export async function POST(req) {
  try {
    // Manually invoke the middleware without `next()`
    await uploadMiddleware(req);

    // Access the uploaded file via req.file
    const fileUploaded = req.file;

    return NextResponse.json({
      message: "File uploaded successfully",
      file: fileUploaded,
    });
  } catch (error) {
    console.error("File upload error:", error); // Improved error logging
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

// Disable Next.js bodyParser (Multer handles it)
export const config = {
  api: {
    bodyParser: false,
  },
};
