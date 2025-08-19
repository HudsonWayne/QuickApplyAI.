"use client";

import { useState } from "react";

export default function UploadCV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CV first!");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await fetch("http://localhost:8000/upload-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setMessage(`Uploaded: ${data.filename} (${data.size} bytes)`);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Make sure backend is running.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Upload Your CV</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
