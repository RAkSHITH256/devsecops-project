import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../api/axios';

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', status: 'pending' });

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const openModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setForm({ title: task.title, description: task.description, status: task.status });
        } else {
            setCurrentTask(null);
            setForm({ title: '', description: '', status: 'pending' });
        }
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await api.put(`/tasks/${currentTask._id}`, form);
            } else {
                await api.post('/tasks', form);
            }
            closeModal();
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loader"></div>;

    return (
        <div>
            <div className="task-header">
                <h2>Manage Tasks</h2>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={16} style={{marginRight: '0.5rem'}} /> New Task
                </button>
            </div>

            <div className="tasks-grid">
                {tasks.map(task => (
                    <div key={task._id} className="task-item">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <div className="task-footer">
                            <span className={`status-badge status-${task.status}`}>{task.status.replace('-', ' ')}</span>
                            <div className="task-actions">
                                <button className="icon-btn" onClick={() => openModal(task)}><Edit2 size={16} /></button>
                                <button className="icon-btn delete" onClick={() => handleDelete(task._id)}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{currentTask ? 'Edit Task' : 'Create Task'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="input-field" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="input-field" rows="3" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required></textarea>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select className="input-field" value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn" style={{background: 'var(--bg-dark)'}} onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{currentTask ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
