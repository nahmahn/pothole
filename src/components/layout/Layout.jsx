import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Map, AlertTriangle, Activity, Database, LogOut } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="layout">
      {/* Header */}
      <header className="gov-header">
        <div className="header-container">
          <div className="logo-area">
            <img src="/uklogo.png" alt="UK Police Logo" className="gov-logo" />
            <div className="service-name">
              <span className="gov-title">GOV.UK</span>
              <span className="service-title">AI Pothole Detection System (Police Ops)</span>
            </div>
          </div>
          <div className="header-meta">
            <span className="date-display">{date}</span>
            <div className="user-profile">
              <Shield size={16} />
              <span>Officer J. DOE (Met Police)</span>
            </div>
            <button
              className="btn-text"
              onClick={() => {
                localStorage.removeItem('gov_auth_token');
                window.location.href = '/login';
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="gov-nav">
        <div className="nav-container">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Activity size={18} /> Dashboard
          </Link>
          <Link to="/map" className={`nav-link ${isActive('/map')}`}>
            <Map size={18} /> Live Map
          </Link>
          <Link to="/alerts" className={`nav-link ${isActive('/alerts')}`}>
            <AlertTriangle size={18} /> Priority Alerts
          </Link>
          <Link to="/roster" className={`nav-link ${isActive('/roster')}`}>
            <Shield size={18} /> Unit Roster
          </Link>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>
            <Database size={18} /> Historical Data
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="gov-footer">
        <div className="footer-container">
          <div className="footer-meta">
            <span className="footer-link">Help</span>
            <span className="footer-link">Privacy</span>
            <span className="footer-link">Cookies</span>
            <span className="footer-link">Accessibility statement</span>
            <span className="footer-link">Contact</span>
          </div>
          <div className="ogl-license">
            All content is available under the Open Government Licence v3.0, except where otherwise stated
          </div>
          <div className="crown-copyright">© Crown copyright</div>
        </div>
      </footer>

      {/* Styles inline for this component temporarily, until we reorganize */}
      <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .gov-header {
          background-color: var(--gov-uk-black);
          color: var(--gov-uk-white);
          padding: 10px 0;
        }
        
        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo-area {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .gov-logo {
          height: 40px;
          width: auto;
          /* User requested logo usage - displaying original */
        }
        
        .gov-title {
          font-weight: 700;
          font-size: 24px;
          margin-right: 15px;
          border-right: 1px solid var(--gov-uk-grey-1);
          padding-right: 15px;
        }
        
        .service-title {
          font-size: 20px;
          font-weight: 400;
        }
        
        .header-meta {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 14px;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #333;
          padding: 5px 10px;
          border-radius: 4px;
        }
        
        .btn-text {
          background: none;
          border: none;
          color: var(--gov-uk-white);
          text-decoration: underline;
          cursor: pointer;
        }
        
        .gov-nav {
          background-color: var(--gov-uk-blue);
          border-bottom: 4px solid #003078;
        }
        
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 5px;
        }
        
        .nav-link {
          color: var(--gov-uk-white);
          text-decoration: none;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
        }
        
        .nav-link:hover {
          background-color: #004f9e;
        }
        
        .nav-link.active {
          background-color: #003078;
          box-shadow: inset 0 4px 0 0 white; /* Top border indicator inside */
        }
        
        .main-content {
          flex: 1;
          padding: 30px 20px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          background-color: var(--bg-page);
        }
        
        .gov-footer {
          background-color: var(--gov-uk-grey-3);
          border-top: 1px solid var(--gov-uk-border);
          padding: 40px 0;
          margin-top: auto;
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .footer-meta {
          display: flex;
          gap: 20px;
        }
        
        .footer-link {
          color: var(--gov-uk-black);
          text-decoration: underline;
          cursor: pointer;
        }
        
        .ogl-license {
          font-size: 14px;
          color: var(--gov-uk-grey-1);
        }
      `}</style>
    </div>
  );
}
