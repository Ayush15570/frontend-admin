import React, { useState } from "react";
import adminService from "../api/adminService";

const GetJobById = () => {
  const [jobId, setJobId] = useState("");
  const [job, setJob] = useState(null);

  const handleSearch = async () => {
    if (!jobId) {
      alert("Enter Job ID");
      return;
    }

    try {
      const res = await adminService.getJobById(jobId);
      setJob(res.data.job);
    } catch {
      alert("Job not found");
      setJob(null);
    }
  };

  return (
    <div className="mb-4 bg-white rounded-xl shadow p-4">
      {/* Search row */}
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-gray-700 whitespace-nowrap">
          Job Lookup
        </h3>

        <input
          placeholder="Job ID"
          className="px-3 py-1.5 border rounded-lg flex-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {/* Result */}
      {job && (
        <div className="mt-3 text-sm text-gray-700 border-t pt-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <p><b>ID:</b> {job.jobId}</p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  job.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {job.status}
              </span>
            </p>
            <p><b>Service:</b> {job.serviceName}</p>
            <p><b>City:</b> {job.city}</p>
            <p><b>Client:</b> {job.clientName}</p>
            <p><b>Engineer:</b> {job.engineerName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetJobById;
