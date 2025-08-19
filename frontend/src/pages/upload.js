"use client";

import { useState } from "react";

export default function UploadCV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CV first!");
      return;
    }

    setMessage("Uploading...");
    setSkills([]);
    setAchievements([]);

    const formData = new FormData();
    formData.append("cv", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed. Check backend.");
      }

      const data = await res.json();
      console.log(data);

      setMessage(`Uploaded: ${data.filename}`);
      setSkills(data.skills || []);
      setAchievements(data.achievements || []);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Make sure backend is running.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Upload Your CV</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}

      {skills.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Skills:</h2>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold text-lg">Achievements:</h2>
          <ul className="list-disc list-inside">
            {achievements.map((achieve, index) => (
              <li key={index}>{achieve}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
