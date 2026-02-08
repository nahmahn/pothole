import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      sessionStorage.setItem('gov_auth_token', 'active_session');
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src="/uklogo.png" alt="UK Police" className="login-logo" />
          <h1 className="text-xl">AI Pothole Detection System</h1>
          <p className="text-small">Restricted Access: Authorised Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Officer ID / Email</label>
            <input
              type="text"
              id="username"
              className="gov-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. PC-4829"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="gov-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-indicator">
            <Shield size={16} color="var(--gov-uk-green)" />
            <span>2FA via Smartcard / Token Required</span>
          </div>

          <button type="submit" className="btn btn-full">Sign In</button>
        </form>

        <div className="login-footer">
          <div className="alert-box">
            <AlertCircle size={18} className="alert-icon" />
            <p>
              <strong>Security Warning:</strong> This system is monitored.
              Unauthorised access attempts are a criminal offence.
            </p>
          </div>

          <div className="links">
            <a href="#">Forgot password?</a>
            <a href="#">Help logging in</a>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--gov-uk-grey-3);
          padding: 10px;
        }

        .login-container {
          background: white;
          padding: 24px !important; /* Significantly reduced */
          border: 1px solid var(--gov-uk-border);
          width: 100%;
          max-width: 420px; /* Reduced width */
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-radius: 4px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .login-logo {
          height: auto;
          max-height: 60px; /* Reduced height */
          margin-bottom: 15px;
          margin-top: 0;
          max-width: 100%;
          object-fit: contain;
        }

        .text-xl {
            font-size: 20px;
            font-weight: bold;
            line-height: 1.2;
            margin-bottom: 5px;
        }
        
        .text-small {
            font-size: 14px;
            color: #666;
        }

        .form-group {
          margin-bottom: 15px; /* Reduced space */
        }

        .form-group label {
          display: block;
          font-weight: 700;
          margin-bottom: 5px;
          color: var(--gov-uk-black);
          font-size: 15px;
        }

        .gov-input {
          width: 100%;
          padding: 8px 12px; /* Smaller padding */
          border: 2px solid var(--gov-uk-black);
          font-size: 15px;
        }

        .gov-input:focus {
          outline: 3px solid var(--gov-uk-yellow);
          border-color: var(--gov-uk-black);
        }

        .auth-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--gov-uk-grey-4);
          padding: 10px; /* Reduced */
          margin-bottom: 20px;
          font-size: 13px;
          border-left: 4px solid var(--gov-uk-green);
        }

        .btn-full {
          width: 100%;
          padding: 10px; /* Reduced */
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          background-color: #00703c;
          color: white;
          border: none;
          box-shadow: 0 2px 0 #002d18;
        }
        
        .btn-full:hover {
            background-color: #005a30;
        }

        .alert-box {
          display: flex;
          gap: 10px;
          background: #fff8e1;
          padding: 12px;
          margin-top: 20px;
          border: 1px solid #ffe57f;
          font-size: 13px;
          line-height: 1.4;
        }

        .alert-icon {
          color: #f57c00;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .links {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
        
        .links a {
          color: #1d70b8;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
