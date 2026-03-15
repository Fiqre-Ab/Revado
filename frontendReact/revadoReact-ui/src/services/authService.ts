const API_BASE_URL = 'http://localhost:8080';

export async function loginUser(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
}

export async function registerUser(fullName: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
    });

    const text = await response.text();

    if (!response.ok) {
        throw new Error(`Registration failed: ${response.status} - ${text}`);
    }

    return text ? JSON.parse(text) : {};
}