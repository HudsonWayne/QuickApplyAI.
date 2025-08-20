"use client";

import { useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchJobs = async () => {
    setLoading(true);
    const res = await fetch(`/api/jobs?skill=python`);
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  };

  const autoApply = async (job) => {
    await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job, cv: "cv.pdf" }),
    });
    alert(`Applied to ${job.title}`);
  };

  return (
    <div className="p-4">
      <button
        onClick={searchJobs}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        🔎 Search Jobs
      </button>

      {loading && <p>Loading jobs...</p>}

      <ul className="mt-4 space-y-2">
        {jobs.map((job, i) => (
          <li key={i} className="p-3 border rounded flex justify-between">
            <span>{job.title} – {job.company}</span>
            <button
              onClick={() => autoApply(job)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              ⚡ Auto Apply
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
