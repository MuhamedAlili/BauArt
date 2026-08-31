"use client";

/* Client-side image import: reads a PNG/JPG/JPEG/WEBP file, downsizes it on
   a canvas, and returns a compact data: URI. No server upload involved —
   the image is embedded directly in the project record (localStorage),
   which keeps the app deployable on serverless hosts (Vercel/Netlify)
   with no writable filesystem required. */

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export const ACCEPTED_IMAGE_EXT = ".png,.jpg,.jpeg,.webp";
export const MAX_SOURCE_BYTES = 12 * 1024 * 1024; // 12MB guard before we even try to decode

export function isAcceptedImage(file) {
  return !!file && ACCEPTED_IMAGE_TYPES.includes(file.type);
}

export function readAndCompressImage(file, { maxDim = 1600, quality = 0.85 } = {}) {
  return new Promise((resolve, reject) => {
    if (!isAcceptedImage(file)) {
      reject(new Error("Nicht unterstütztes Format. Erlaubt: PNG, JPG, JPEG, WEBP."));
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      reject(new Error("Datei ist zu groß (max. 12 MB)."));
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const scale = maxDim / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const mime = file.type === "image/png" ? "image/png" : "image/jpeg";
      const dataUrl = canvas.toDataURL(mime, quality);
      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Bild konnte nicht gelesen werden."));
    };
    img.src = url;
  });
}
