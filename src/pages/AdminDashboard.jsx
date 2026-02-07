import React, { useEffect, useState } from "react";
import adminService from "../api/adminService";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GetJobById from "./GetJobById"; // ✅ IMPORT

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otpMap, setOtpMap] = useState({});
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await adminService.getAllServiceRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("SERVICE REQUEST ERROR:", err);
      setError("Failed to load service requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleVerifyOtp = async (requestId) => {
    const otp = otpMap[requestId];
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      await adminService.verifyRequestOTP(requestId, otp);
      alert("Request marked as completed");
      fetchRequests();
    } catch {
      alert("Invalid OTP");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading service requests…
      </div>
    );
  }

const downloadPendingJobs = async () => {
  try {
    const res = await adminService.downloadPendingJobs();
    const blob = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pending_jobs_report.xlsx";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url); // 🔥 important
  } catch (err) {
    alert("Failed to download report");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <button
          onClick={fetchRequests}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Refresh
        </button>
      </div>
      <button
  onClick={downloadPendingJobs}
  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
>
  📥 Download Pending Jobs Report
</button>


      {/* ✅ GET JOB BY ID MOUNTED HERE */}
      <GetJobById />

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 font-medium">
          {error}
        </div>
      )}

      {/* Service Requests Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Requested At</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    <span className="font-semibold">{req.name}</span>
                  </div>
                </td>

                <td className="p-4 font-medium text-indigo-600">
                  📍 {req.city}
                </td>

                <td className="p-4">{req.serviceName}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-green-600" />
                    {req.phoneNumber}
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  {new Date(req.createdAt).toLocaleString()}
                </td>

                <td className="p-4">
                  {req.status === "contacted" ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-600">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-4 space-y-2">
                  {req.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="OTP"
                        className="border px-3 py-1.5 rounded-lg w-24 focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) =>
                          setOtpMap({
                            ...otpMap,
                            [req._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => handleVerifyOtp(req._id)}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                      >
                        Verify
                      </button>
                    </div>
                  )}

                  {req.status === "contacted" && !req.jobAssigned && (
                    <button
                      onClick={() => navigate(`/assign-job/${req._id}`)}
                      className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                    >
                      Assign Job
                    </button>
                  )}

                  {req.jobAssigned && (
                    <button
                      onClick={async () => {
                        const res = await adminService.getJobByRequest(req._id);
                        navigate("/job/view", {
                          state: { job: res.data.job },
                        });
                      }}
                      className="border border-green-600 text-green-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-green-50 transition"
                    >
                      View Job
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && !error && (
          <div className="p-8 text-center text-gray-500">
            No service requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
