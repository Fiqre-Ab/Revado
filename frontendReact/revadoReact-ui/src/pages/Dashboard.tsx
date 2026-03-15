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

    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editTodoTitle, setEditTodoTitle] = useState("");
    const [editTodoDesc, setEditTodoDesc] = useState("");

    const [editingSubtaskId, setEditingSubtaskId] = useState<number | null>(null);
    const [editSubtaskTitle, setEditSubtaskTitle] = useState("");

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
            console.error("Failed to create todo:", err);
            alert("Error creating todo");
        }
    };

    const handleDeleteTodo = async (tid: number) => {
        try {
            await api.deleteTodo(userId, tid);
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to delete todo:", err);
        }
    };

    const handleToggleTodo = async (tid: number) => {
        try {
            await api.toggleTodo(userId, tid);
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to toggle todo:", err);
        }
    };

    const startEditTodo = (todo: any) => {
        setEditingTodoId(todo.id);
        setEditTodoTitle(todo.title || "");
        setEditTodoDesc(todo.description || "");
    };

    const cancelEditTodo = () => {
        setEditingTodoId(null);
        setEditTodoTitle("");
        setEditTodoDesc("");
    };

    const handleUpdateTodo = async (todo: any) => {
        try {
            await api.updateTodo(userId, todo.id, {
                title: editTodoTitle,
                description: editTodoDesc,
                completed: todo.completed
            });

            cancelEditTodo();
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to update todo:", err);
        }
    };

    const handleAddSubtask = async (tid: number, title: string) => {
        if (!title.trim()) return;

        try {
            await api.createSubtask(userId, tid, {
                title,
                completed: false
            });
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to create subtask:", err);
        }
    };

    const handleToggleSubtask = async (tid: number, sid: number) => {
        try {
            await api.toggleSubtask(userId, tid, sid);
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to toggle subtask:", err);
        }
    };

    const handleDeleteSubtask = async (tid: number, sid: number) => {
        try {
            await api.deleteSubtask(userId, tid, sid);
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to delete subtask:", err);
        }
    };

    const startEditSubtask = (sub: any) => {
        setEditingSubtaskId(sub.id);
        setEditSubtaskTitle(sub.title || "");
    };

    const cancelEditSubtask = () => {
        setEditingSubtaskId(null);
        setEditSubtaskTitle("");
    };

    const handleUpdateSubtask = async (todoId: number, sub: any) => {
        try {
            await api.updateSubtask(userId, todoId, sub.id, {
                title: editSubtaskTitle,
                completed: sub.completed
            });

            cancelEditSubtask();
            loadTodos(userId);
        } catch (err) {
            console.error("Failed to update subtask:", err);
        }
    };

    if (loading) return <div className="loader">Loading RevaDo...</div>;

    return (
        <div className="dashboard-wrapper">
            <nav className="navbar">
                <div className="nav-brand">
                    RevaDo <span>App</span>
                </div>
                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                >
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
                                onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
                            />
                        </div>
                        <button className="add-task-btn" onClick={handleAddTodo}>
                            Add
                        </button>
                    </div>
                </header>

                <div className="todo-list">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className={`todo-item ${todo.completed ? "is-done" : ""}`}
                        >
                            <div className="todo-main">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                />

                                <div className="todo-info">
                                    {editingTodoId === todo.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editTodoTitle}
                                                onChange={(e) => setEditTodoTitle(e.target.value)}
                                                placeholder="Edit title"
                                            />
                                            <input
                                                type="text"
                                                value={editTodoDesc}
                                                onChange={(e) => setEditTodoDesc(e.target.value)}
                                                placeholder="Edit description"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h3>{todo.title}</h3>
                                            {todo.description && (
                                                <p className="todo-desc-text">{todo.description}</p>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="todo-actions">
                                    {editingTodoId === todo.id ? (
                                        <>
                                            <button onClick={() => handleUpdateTodo(todo)}>Save</button>
                                            <button onClick={cancelEditTodo}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEditTodo(todo)}>Edit</button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteTodo(todo.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="subtask-section">
                                {todo.subtasks?.map((sub: any) => (
                                    <div key={sub.id} className="subtask-item">
                                        <input
                                            type="checkbox"
                                            checked={sub.completed}
                                            onChange={() => handleToggleSubtask(todo.id, sub.id)}
                                        />

                                        {editingSubtaskId === sub.id ? (
                                            <input
                                                type="text"
                                                value={editSubtaskTitle}
                                                onChange={(e) => setEditSubtaskTitle(e.target.value)}
                                                placeholder="Edit subtask"
                                            />
                                        ) : (
                                            <span className={sub.completed ? "sub-done" : ""}>
                                                {sub.title}
                                            </span>
                                        )}

                                        <div className="subtask-actions">
                                            {editingSubtaskId === sub.id ? (
                                                <>
                                                    <button onClick={() => handleUpdateSubtask(todo.id, sub)}>
                                                        Save
                                                    </button>
                                                    <button onClick={cancelEditSubtask}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => startEditSubtask(sub)}>Edit</button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteSubtask(todo.id, sub.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <input
                                    className="subtask-input"
                                    type="text"
                                    placeholder="+ New subtask"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleAddSubtask(
                                                todo.id,
                                                (e.target as HTMLInputElement).value
                                            );
                                            (e.target as HTMLInputElement).value = "";
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