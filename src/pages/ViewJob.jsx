import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import adminService from "../api/adminService";

const ViewJob = () => {
  const { state } = useLocation();
  const job = state?.job;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No job data found
      </div>
    );
  }

  const handleSendClosingOTP = async () => {
    try {
      setLoading(true);
      await adminService.sendJobClosingOTP(job.jobId);
      setOtpSent(true);
    } catch {
      alert("Failed to send closing OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyClosingOTP = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);
      await adminService.verifyJobOTP(job.jobId, otp);
      job.status = "closed";
    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Job #{job.jobId}
          </h1>
          <p className="text-gray-500 text-sm">
            Service job details & completion
          </p>
        </div>

        <span
          className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
            job.status === "closed"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {job.status === "closed" ? "Completed" : "In Progress"}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Job Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Client Name" value={job.clientName} />
          <Info label="Client Phone" value={job.clientPhone} />
          <Info label="City" value={job.city} />
          <Info label="Service" value={job.serviceName} />
          <Info label="Engineer" value={job.engineerName} />
          <Info label="Engineer Phone" value={job.engineerPhone} />
        </div>

        {/* Divider */}
        <hr />

        {/* OTP Section */}
        {job.status !== "closed" ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Job Completion Verification
            </h3>

            <p className="text-sm text-gray-500">
              Send OTP to client and verify before closing the job.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSendClosingOTP}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send Closing OTP"}
              </button>

              {otpSent && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="border rounded-lg px-4 py-2 w-40 focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    onClick={handleVerifyClosingOTP}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition disabled:opacity-60"
                  >
                    Verify & Close Job
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            ✅ This job has been successfully completed.
          </div>
        )}
      </div>
    </div>
  );
};

/* Reusable info row */
const Info = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-500">
      {label}
    </p>
    <p className="text-gray-800 font-semibold mt-1">{value}</p>
  </div>
);

export default ViewJob;
