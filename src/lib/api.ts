const API_URL = "http://localhost:4444";
const token = localStorage.getItem("token");
const getAuthHeader = ()=> ({ "Authorization": `bearer ${token}`})
    

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
    },

    getTodo: async ()=> {
        const response = await fetch(`${API_URL}/todo`, {
            method: "GET",
            headers: getAuthHeader()
        });
        return response.json();
    },

    tambahTodo: async (title: string)=> {
        const response = await fetch(`${API_URL}/todo`, {
            method: "POST",
            headers: {
                "content-Type": "aplication-json",
                ...getAuthHeader()
            },
            body: JSON.stringify({title})
        });
        return response.json();
    },

    upadteTodo: async (id: number, title: string, completed: boolean)=> {
        const response = await fetch(`${API_URL}/todo/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                ...getAuthHeader()
            },
            body: JSON.stringify({title, completed})
        });
        return response.json();
    },

    hapusTodo: async (id: number)=> {
        const response = await fetch(`${API_URL}/todo/${id}`, {
            method: "DELETE",
            headers: getAuthHeader()
        });
        return response.json();
    }
}

export default api;