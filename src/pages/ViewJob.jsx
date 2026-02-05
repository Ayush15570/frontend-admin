import { useLocation } from "react-router-dom";
import React from "react";
const ViewJob = () => {
  const { state } = useLocation();
  const job = state?.job;

  if (!job) {
    return <p>No job data found</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Job ID: {job.jobId}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p><b>Client:</b> {job.clientName}</p>
        <p><b>Phone:</b> {job.clientPhone}</p>
        <p><b>City:</b> {job.city}</p>
        <p><b>Service:</b> {job.serviceName}</p>
        <p><b>Engineer:</b> {job.engineerName}</p>
        <p><b>Engineer Phone:</b> {job.engineerPhone}</p>
        <p><b>Status:</b> {job.status}</p>
      </div>
    </div>
  );
};

export default ViewJob;
