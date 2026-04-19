import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, LogOut, Terminal } from 'lucide-react';

export default function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="sidebar-title">
                    <Terminal size={24} /> DevOps Hub
                </div>
                <nav>
                    <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} end>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                    <NavLink to="/tasks" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
                        <CheckSquare size={20} /> Tasks
                    </NavLink>
                </nav>
                <button className="btn logout-btn" onClick={handleLogout}>
                    <LogOut size={20} style={{marginRight: '0.5rem'}} /> Logout
                </button>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
