"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      const response = await fetch("http://127.0.0.1:8000/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📄 Upload CV</h1>

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold">✅ Parsed CV Data</h2>
          <p>
            <strong>Filename:</strong> {result.filename}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {result.skills && result.skills.length > 0
              ? result.skills.join(", ")
              : "None found"}
          </p>
          <p>
            <strong>Achievements:</strong>{" "}
            {result.achievements && result.achievements.length > 0
              ? result.achievements.join(", ")
              : "None found"}
          </p>
        </div>
      )}
    </div>
  );
}
