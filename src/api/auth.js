const API_BASE = "http://localhost:4000/api";

export const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json(); // { token, user }
};

export const registerUser = async (username, email, password) => {
    const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
};

// Helper za authenticated pozive
export const authFetch = (url, options = {}) => {
    const token = localStorage.getItem("auth_token");
    return fetch(`${API_BASE}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });
};