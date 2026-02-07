import api from "./axios"
const adminService = {
    async getAllServiceRequests() {
        const res = await api.get('/admin/service-requests')
        return res.data.data
    },
    verifyRequestOTP(requestId, otp) {
        return api.post("/admin/verify-request-otp", { requestId, otp })
    },
    assignJob(data) {
        return api.post("/admin/assignJob", data)
    },
    getJobById(jobId) {
        return api.get(`/admin/getJob/${jobId}`);
    },
    getJobByRequest(serviceRequestId) {
        return api.get(`/admin/job/by-request/${serviceRequestId}`)
    },
    sendJobClosingOTP(jobId) {
        return api.post(`/admin/sendClosingOTP/${jobId}`);
    },

    verifyJobOTP(jobId, otp) {
        return api.post("/admin/verify-job-otp", { jobId, otp });
    }



}

export default adminService