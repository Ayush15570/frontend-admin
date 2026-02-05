import React, { useState } from "react";
import { useParams } from "react-router-dom";
import adminService from "../api/adminService";
const AssignJob = () => {
  const { requestId } = useParams();
  const [engineerName, setEngineerName] = useState("");
  const [engineerPhone, setEngineerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("REQUEST ID", requestId)
  const handleAssign = async (e) => {
    e.preventDefault();

    if (!engineerName || !engineerPhone) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await adminService.assignJob({
        requestId,
        engineerName,
        engineerPhone,
      });

      alert("Job assigned successfully ✅");
    } catch {
      alert("Failed to assign job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Assign Job</h2>

      <p className="text-sm text-gray-500 mb-4">
        Service Request ID: <b>{requestId}</b>
      </p>

      <form onSubmit={handleAssign} className="space-y-4">
        <input
          placeholder="Engineer Name"
          className="border p-2 w-full rounded"
          onChange={(e) => setEngineerName(e.target.value)}
        />

        <input
          placeholder="Engineer Phone"
          className="border p-2 w-full rounded"
          onChange={(e) => setEngineerPhone(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Assigning..." : "Assign Job"}
        </button>
      </form>
    </div>
  );
};

export default AssignJob;
