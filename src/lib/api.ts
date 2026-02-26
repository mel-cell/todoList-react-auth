const API_URL = "http://localhost:4444";

const api = {
    register: async (
        email: string,
        password: string
    )=> {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email, password})
        });
        return response.json();
    },

    login: async (
        email: string,
        password: string
    )=> {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email, password})
        });
        return response.json();
    }
}

export default api;