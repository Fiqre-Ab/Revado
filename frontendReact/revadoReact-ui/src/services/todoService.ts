const API_BASE_URL = "http://localhost:8080/users";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };
};

export function getUserIdFromToken(): number {
    const token = localStorage.getItem("token");
    if (!token) return 0;

    try {
        const payloadPart = token.split(".")[1];
        const payload = JSON.parse(window.atob(payloadPart));
        return Number(payload.sub) || 0;
    } catch (error) {
        console.error("Token parsing failed:", error);
        return 0;
    }
}

/* --- Todo  --- */

export async function getTodos(uid: number) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos`, {
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
}

export async function createTodo(uid: number, todo: any) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
}

export async function toggleTodo(uid: number, tid: number) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}/complete`, {
        method: "PATCH",
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Failed to toggle todo");
    return response;
}

export async function updateTodo(uid: number, tid: number, todo: any) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
}

export async function deleteTodo(uid: number, tid: number) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}`, {
        method: "DELETE",
        headers: getHeaders() 
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return response;
}

/* --- Subtask --- */

export async function createSubtask(uid: number, tid: number, sub: any) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}/subtasks`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sub),
    });
    if (!response.ok) throw new Error("Failed to create subtask");
    return response.json();
}

export async function toggleSubtask(uid: number, tid: number, sid: number) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}/subtasks/${sid}/complete`, {
        method: "PATCH",
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Failed to toggle subtask");
    return response;
}

export async function updateSubtask(uid: number, tid: number, sid: number, sub: any) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}/subtasks/${sid}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(sub),
    });
    if (!response.ok) throw new Error("Failed to update subtask");
    return response.json();
}

export async function deleteSubtask(uid: number, tid: number, sid: number) {
    const response = await fetch(`${API_BASE_URL}/${uid}/todos/${tid}/subtasks/${sid}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Failed to delete subtask");
    return response;
}