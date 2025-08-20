"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a CV first!");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-cv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      setMessage(`✅ CV uploaded successfully: ${data.filename}`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📄 QuickApplyAI - CV Parser</h1>

      {/* Upload Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload CV"}
        </button>

        {message && <p className="mt-4 text-gray-700">{message}</p>}
      </div>

      {/* Parsed Results */}
      {result && (
        <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold mb-4">🔎 Extracted Data</h2>

          <div className="mb-4">
            <h3 className="font-medium">Skills:</h3>
            <ul className="list-disc ml-6">
              {result.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Achievements:</h3>
            <ul className="list-disc ml-6">
              {result.achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
