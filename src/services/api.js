// =========================================================
// IP-SAKTI Sahayak
// API Service
// =========================================================

const API_BASE_URL = "https://pushiness-jersey-pouch.ngrok-free.dev";

// =========================================================
// Helper Function
// =========================================================

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),

        // Ngrok free warning page bypass header
        "ngrok-skip-browser-warning": "true",

        ...(options.headers || {}),
      },
    });

    let data = null;

    try {
      data = await response.json();
    } catch {
      // Response has no JSON body
    }

    if (!response.ok) {
      const errorMessage =
        data?.detail ||
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`;

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// =========================================================
// Chat API
// =========================================================

export async function sendChatMessage(message) {
  return apiRequest("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      message: message,
    }),
  });
}

// =========================================================
// IP Analysis API
// =========================================================

export async function analyzeIP(data) {
  return apiRequest("/api/ip-analysis", {
    method: "POST",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      ipType: data.ipType,
      jurisdiction: data.jurisdiction,
      industry: data.industry,
      existingIP: data.existingIP,
    }),
  });
}

// =========================================================
// Regulatory Checklist API
// =========================================================

export async function getRegulatoryChecklist(data) {
  return apiRequest("/api/regulatory", {
    method: "POST",
    body: JSON.stringify({
      sector: data.sector,
      jurisdiction: data.jurisdiction,
      activity: data.activity,
    }),
  });
}

// =========================================================
// Jurisdiction Comparison API
// =========================================================

export async function compareJurisdictions(data) {
  return apiRequest("/api/comparison", {
    method: "POST",
    body: JSON.stringify({
      jurisdiction1: data.jurisdiction1,
      jurisdiction2: data.jurisdiction2,
      ipType: data.ipType,
    }),
  });
}

// =========================================================
// Sources API
// =========================================================

export async function getSources() {
  return apiRequest("/api/sources", {
    method: "GET",
  });
}

// =========================================================
// Health Check
// =========================================================

export async function checkBackendHealth() {
  return apiRequest("/api/health", {
    method: "GET",
  });
}