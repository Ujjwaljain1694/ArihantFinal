import axiosInstance from "./axiosInstance";

// ── Auth Helpers ──────────────────────────────────────────────────────────────
export const saveAuthData = (token, manager) => {
  localStorage.setItem("connect_token", token);
  localStorage.setItem("connect_manager", JSON.stringify(manager));
};
export const clearAuthData = () => {
  localStorage.removeItem("connect_token");
  localStorage.removeItem("connect_manager");
};
export const getManager = () => {
  try { return JSON.parse(localStorage.getItem("connect_manager")) || null; }
  catch { return null; }
};
export const isLoggedIn = () => !!localStorage.getItem("connect_token");

// ── 🔐 AUTH APIs ──────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { manager_id: "BRAP21001" } — exactly 9 alphanumeric characters
// Response: { success, data: { manager_name, otp_dev_only } }
export const loginSendOTP = (manager_id) =>
  axiosInstance.post("/api/auth/login", { manager_id });

// POST /api/auth/verify-otp
// Body: { manager_id: "BRAP21001", otp: "123456" }
// Response: { success, data: { token, expires_in, manager: { manager_id, name, phone } } }
export const loginVerifyOTP = (manager_id, otp) =>
  axiosInstance.post("/api/auth/verify-otp", { manager_id, otp });

// POST /api/auth/resend-otp
// Body: { manager_id: "BRAP21001" }
// Error 429: { success: false, message: "Wait X seconds", remainingSeconds: 24 }
export const resendOTP = (manager_id) =>
  axiosInstance.post("/api/auth/resend-otp", { manager_id });

// POST /api/reports/brokerage/send-otp
export const brokerageSendOTP = (manager_id) =>
  axiosInstance.post("/api/reports/brokerage/send-otp", { manager_id });

// POST /api/reports/brokerage/verify-otp
export const brokerageVerifyOTP = (manager_id, otp) =>
  axiosInstance.post("/api/reports/brokerage/verify-otp", { manager_id, otp });

// ── 📊 DASHBOARD API ──────────────────────────────────────────────────────────
// GET /api/dashboard/stats
// Response: { totalClients, activeClients, newClients, inactiveClients, totalAppLogin }
export const getDashboardStats = () =>
  axiosInstance.get("/api/dashboard/stats");

// ── 👤 CLIENT APIs ────────────────────────────────────────────────────────────
// GET /api/clients?status=active|inactive|new|all
// Response: { total, clients: [{ clientCode, clientName, pan(masked), mobile(masked), email(masked), status, appLoginCount }] }
export const getClients = (params = {}) =>
  axiosInstance.get("/api/clients", { params });

// GET /api/reports/nominee-pending
export const getNomineePending = (params = {}) =>
  axiosInstance.get("/api/reports/nominee-pending", { params });

// GET /api/reports/inactive-clients
export const getInactiveClients = (params = {}) =>
  axiosInstance.get("/api/reports/inactive-clients", { params });

// ── 📈 HOLDINGS & POSITIONS APIs ──────────────────────────────────────────────
// GET /api/reports/holdings?client_code=AP2100001&date=2026-04-06
// Response: { total, holdings: [{ clientName, clientCode, scriptCode, scriptName, isin, pledgePOA, freePOA, mtfQty, netQty, stockValue, closeRate, date }] }
export const getHoldings = (params = {}) =>
  axiosInstance.get("/api/reports/holdings", { params });

// GET /api/reports/positions?type=open|global|fo_global&client_code=AP2100001
// Response: { total, positions: [{ clientName, clientCode, positionType, scriptName, exchange, product, buyQty, sellQty, netQty, buyAvg, sellAvg, ltp, value, pnl, date }] }
export const getOpenPositions = (params = {}) =>
  axiosInstance.get("/api/reports/positions", { params: { type: "open", ...params } });

export const getGlobalPositions = (params = {}) =>
  axiosInstance.get("/api/reports/positions", { params: { type: "global", ...params } });

export const getFOGlobalPositions = (params = {}) =>
  axiosInstance.get("/api/reports/positions", { params: { type: "fo_global", ...params } });

// ── 📊 BROKERAGE APIs ─────────────────────────────────────────────────────────
// All accept params: { datefrom, dateto, clientCode, pageNumber, size }
export const getBrokerageCapital = (params = {}) =>
  axiosInstance.get("/api/reports/brokerage/capital", { params });

export const getBrokerageThirdParty = (params = {}) =>
  axiosInstance.get("/api/reports/brokerage/third-party", { params });

export const getBrokerageResearch = (params = {}) =>
  axiosInstance.get("/api/reports/brokerage/research", { params });

export const getBrokerageLedger = (params = {}) =>
  axiosInstance.get("/api/reports/brokerage/ledger", { params });

export const getBrokerageSummary = (params = {}) =>
  axiosInstance.get("/api/reports/brokerage/summary", { params });

// ── 📉 REPORTS APIs ───────────────────────────────────────────────────────────
// All accept params: { datefrom, dateto, search, pageNumber, size }
export const getMobileLoginReport = (params = {}) =>
  axiosInstance.get("/api/reports/mobile-login-report", { params });

export const getBranchPerformance = (params = {}) =>
  axiosInstance.get("/api/reports/branch-performance", { params });

export const getReactivationReport = (params = {}) =>
  axiosInstance.get("/api/reports/reactivation-report", { params });

export const getSamparkReport = (params = {}) =>
  axiosInstance.get("/api/reports/sampark-report", { params });

export const getKRAStatus = (params = {}) =>
  axiosInstance.get("/api/reports/kra-status", { params });

export const getHoldKRA = (params = {}) =>
  axiosInstance.get("/api/reports/hold-kra", { params });

export const getModificationReport = (params = {}) =>
  axiosInstance.get("/api/reports/modification", { params });

export const getPhysicalAccountReport = (params = {}) =>
  axiosInstance.get("/api/reports/physical-account", { params });

export const getFollowupReport = (params = {}) =>
  axiosInstance.get("/api/reports/followup-report", { params });

// ── 📜 FILES APIs ─────────────────────────────────────────────────────────────
export const getComplianceCircular = (params = {}) =>
  axiosInstance.get("/api/reports/compliance-circular", { params });

export const getCertificate = (params = {}) =>
  axiosInstance.get("/api/reports/certificate", { params });

export const getDownloadFiles = (params = {}) =>
  axiosInstance.get("/api/reports/download-files", { params });

export const getMarketingMaterial = (params = {}) =>
  axiosInstance.get("/api/reports/marketing-material", { params });

// POST /api/reports/upload-certificate — multipart/form-data
export const uploadCertificate = (formData) =>
  axiosInstance.post("/api/reports/upload-certificate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── 💰 FINANCIAL APIs ─────────────────────────────────────────────────────────
export const getMTFBalance = (params = {}) =>
  axiosInstance.get("/api/reports/mtf-balance", { params });

export const getDPSlip = (params = {}) =>
  axiosInstance.get("/api/reports/dp-slip", { params });

export const getClientBalance = (params = {}) =>
  axiosInstance.get("/api/payout/client-balance", { params });

// ── 🔍 MF & RESEARCH APIs ─────────────────────────────────────────────────────
export const getResearchCall = (params = {}) =>
  axiosInstance.get("/api/reports/research-call", { params });

export const getMutualFundReport = (params = {}) =>
  axiosInstance.get("/api/reports/mutual-fund-report", { params });

export const getMFRejectionReport = (params = {}) =>
  axiosInstance.get("/api/reports/mf-rejection-report", { params });

export const getMFMandateReport = (params = {}) =>
  axiosInstance.get("/api/reports/mf-mandate-report", { params });

export const getMFStructure = (params = {}) =>
  axiosInstance.get("/api/reports/mf-structure", { params });

// ── 🧾 OTHER APIs ─────────────────────────────────────────────────────────────
export const getContestData = (params = {}) =>
  axiosInstance.get("/api/reports/contest-data", { params });

// ── 💸 PAYOUT APIs ────────────────────────────────────────────────────────────
export const getPayoutReport = (params = {}) =>
  axiosInstance.get("/api/payout/payout-report", { params });

export const getCancelRequest = (params = {}) =>
  axiosInstance.get("/api/payout/cancel-request", { params });

// POST /api/payout/bulk-upload — multipart/form-data
export const bulkUploadPayout = (formData) =>
  axiosInstance.post("/api/payout/bulk-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── 📝 TAT APIs ───────────────────────────────────────────────────────────────
export const getEkycReport = (params = {}) =>
  axiosInstance.get("/api/reports/ekyc-report", { params });

export const getRekycReport = (params = {}) =>
  axiosInstance.get("/api/reports/rekyc-report", { params });
