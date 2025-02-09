import React from "react";
import "./DashboardUser.css";

function DashboardUser() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>My Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Home</li>
          <li>Analytics</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Welcome to the Dashboard</h1>
          <div className="user-info">
            <span>Alka</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="user-avatar"
            />
          </div>
        </header>

        {/* Content Area */}
        <section className="content">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="card">
            <h3>Monthly Revenue</h3>
            <p>$12,345</p>
          </div>
          <div className="card">
            <h3>Active Projects</h3>
            <p>45</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardUser;
