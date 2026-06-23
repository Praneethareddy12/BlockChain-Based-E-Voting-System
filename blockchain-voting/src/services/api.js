const BASE_URL = "http://localhost:5000/api";

/* =========================
   AUTHENTICATION
========================= */
export const verifyVoterAPI = async (voterId) => {
  const res = await fetch(`${BASE_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ voterId })
  });

  return res.json();
};

/* =========================
   VOTING
========================= */
export const castVoteAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/vote/cast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

/* =========================
   BLOCKCHAIN
========================= */
export const getBlockchainAPI = async () => {
  const res = await fetch(`${BASE_URL}/blockchain`);
  return res.json();
};

/* =========================
   VERIFY TRANSACTION
========================= */
export const verifyTransactionAPI = async (transactionId) => {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ transactionId })
  });

  return res.json();
};

/* =========================
   AI SECURITY
========================= */
export const getAISecurityStatsAPI = async () => {
  const res = await fetch(`${BASE_URL}/ai`);
  return res.json();
};
/* =========================
   ADMIN
========================= */
export const getAdminStatsAPI = async () => {
  const res = await fetch(`${BASE_URL}/admin/stats`);
  return res.json();
};

export const toggleVotingAPI = async () => {
  const res = await fetch(`${BASE_URL}/admin/toggle`, {
    method: "POST"
  });
  return res.json();
};

export const getCandidatesAPI = async () => {
  const res = await fetch(`${BASE_URL}/admin/candidates`);
  return res.json();
};

export const addCandidateAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/candidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteCandidateAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/admin/candidate/${id}`, {
    method: "DELETE"
  });
  return res.json();
};
