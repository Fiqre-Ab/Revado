import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/todoService";
import "./Dashboard.css";

export default function Dashboard() {
    const [todos, setTodos] = useState<any[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState(""); 
    const [userId, setUserId] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadTodos = useCallback(async (uid: number) => {
        try {
            const data = await api.getTodos(uid);
            setTodos(data);
        } catch (err) {
            console.error("Failed to load todos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const uid = api.getUserIdFromToken();
        if (uid === 0) {
            navigate("/login");
        } else {
            setUserId(uid);
            loadTodos(uid);
        }
    }, [navigate, loadTodos]);

    const handleAddTodo = async () => {
        if (!newTodoTitle.trim()) return;
        try {
            await api.createTodo(userId, {
                title: newTodoTitle,
                description: newTodoDesc, 
                completed: false
            });
            setNewTodoTitle("");
            setNewTodoDesc("");
            loadTodos(userId);
        } catch (err) {
            alert("Error: Check if backend is running");
        }
    };

    const handleDeleteTodo = async (tid: number) => {
        await api.deleteTodo(userId, tid);
        loadTodos(userId);
    };

    const handleToggleTodo = async (tid: number) => {
        await api.toggleTodo(userId, tid);
        loadTodos(userId);
    };

    const handleAddSubtask = async (tid: number, content: string) => {
        if (!content.trim()) return;
        try {
            await api.createSubtask(userId, tid, { content, completed: false });
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to create subtask. Ensure backend endpoint exists.");
        }
    };

    const handleToggleSubtask = async (tid: number, sid: number) => {
        await api.toggleSubtask(userId, tid, sid);
        loadTodos(userId);
    };

    if (loading) return <div className="loader">Loading RevaDo...</div>;

    return (
        <div className="dashboard-wrapper">
            <nav className="navbar">
                <div className="nav-brand">RevaDo <span>App</span></div>
                <button className="logout-btn" onClick={() => { localStorage.clear(); navigate("/login"); }}>
                    Logout
                </button>
            </nav>

            <div className="main-content">
                <header className="dashboard-header">
                    <h1>Productivity Hub</h1>
                    <div className="input-section">
                        <div className="input-group-vertical">
                            <input
                                type="text"
                                className="title-input"
                                placeholder="Task Title"
                                value={newTodoTitle}
                                onChange={(e) => setNewTodoTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                className="desc-input"
                                placeholder="Add a description..."
                                value={newTodoDesc}
                                onChange={(e) => setNewTodoDesc(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                            />
                        </div>
                        <button className="add-task-btn" onClick={handleAddTodo}>Add</button>
                    </div>
                </header>

                <div className="todo-list">
                    {todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'is-done' : ''}`}>
                            <div className="todo-main">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                />
                                <div className="todo-info">
                                    <h3>{todo.title}</h3>
                                    {todo.description && <p className="todo-desc-text">{todo.description}</p>}
                                </div>
                                <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </div>

                            <div className="subtask-section">
                                {todo.subtasks?.map((sub: any) => (
                                    <div key={sub.id} className="subtask-item">
                                        <input
                                            type="checkbox"
                                            checked={sub.completed}
                                            onChange={() => handleToggleSubtask(todo.id, sub.id)}
                                        />
                                        <span className={sub.completed ? 'sub-done' : ''}>{sub.content}</span>
                                    </div>
                                ))}
                                <input
                                    className="subtask-input"
                                    type="text"
                                    placeholder="+ New subtask"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddSubtask(todo.id, (e.target as HTMLInputElement).value);
                                            (e.target as HTMLInputElement).value = '';
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}