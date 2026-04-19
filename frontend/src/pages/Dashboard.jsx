import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import api from '../api/axios';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

export default function Dashboard() {
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, inProgress: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/tasks/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="loader"></div>;

    const data = [
        { name: 'Completed', value: stats.completed },
        { name: 'In Progress', value: stats.inProgress },
        { name: 'Pending', value: stats.pending },
    ];

    return (
        <div>
            <h2 style={{marginBottom: '2rem'}}>Dashboard Overview</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <div className="value">{stats.total}</div>
                </div>
                <div className="stat-card">
                    <h3>Completed</h3>
                    <div className="value" style={{color: 'var(--secondary)'}}>{stats.completed}</div>
                </div>
                <div className="stat-card">
                    <h3>In Progress</h3>
                    <div className="value" style={{color: '#60a5fa'}}>{stats.inProgress}</div>
                </div>
                <div className="stat-card">
                    <h3>Pending</h3>
                    <div className="value" style={{color: '#f59e0b'}}>{stats.pending}</div>
                </div>
            </div>

            <div className="stat-card" style={{height: '400px', padding: '2rem'}}>
                <h3 style={{marginBottom: '1rem'}}>Task Status Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{background: 'var(--bg-dark)', border: '1px solid var(--border)'}} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
