import { ENV } from "./src/lib/env.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    // 1x1 transparent png
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    console.log("Uploading...");
    const res = await cloudinary.uploader.upload(base64Image);
    console.log("Success:", res.secure_url);
  } catch (error) {
    console.error("Cloudinary error:", error);
  }
}

test();
