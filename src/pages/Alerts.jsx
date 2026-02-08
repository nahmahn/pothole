import React, { useEffect, useState } from 'react';
import { getAlerts } from '../data/mockService';
import { AlertCircle, CheckSquare, UserPlus, Clock } from 'lucide-react';

import { useToast } from '../components/ui/Toast';

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const { addToast } = useToast();

    useEffect(() => {
        setAlerts(getAlerts());
    }, []);

    const handleAction = (id, action) => {
        // In a real app, this would update the backend
        const actionText = action === 'acknowledge' ? 'Acknowledged' : 'Assigned';
        addToast(`Alert ${id} status updated to: ${actionText}`, 'success');

        setAlerts(alerts.map(a =>
            a.id === id ? { ...a, status: actionText } : a
        ));
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="text-xl">Priority Alerts & Actions</h1>
                <p>Review and valid high-severity detections requiring immediate intervention.</p>
            </div>

            <div className="card">
                <table className="gov-table full-width">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Risk Score</th>
                            <th>Location</th>
                            <th>Time Detected</th>
                            <th>Status</th>
                            <th>Recommendation</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map(alert => (
                            <tr key={alert.id} className={alert.riskScore > 90 ? 'row-critical' : ''}>
                                <td><span className="mono">{alert.id}</span></td>
                                <td>
                                    <div className="risk-indicator">
                                        <span className={`risk-score ${alert.riskScore > 90 ? 'score-high' : 'score-med'}`}>
                                            {alert.riskScore}
                                        </span>
                                    </div>
                                </td>
                                <td>{alert.location}</td>
                                <td><div className="flex-row"><Clock size={14} /> {alert.time}</div></td>
                                <td>
                                    <span className={`badge ${alert.status === 'Pending' ? 'badge-red' :
                                        alert.status === 'Acknowledged' ? 'badge-yellow' : 'badge-blue'
                                        }`}>
                                        {alert.status}
                                    </span>
                                </td>
                                <td>{alert.recommendation}</td>
                                <td>
                                    <div className="action-buttons">
                                        {alert.status === 'Pending' && (
                                            <button
                                                className="btn-small btn-secondary"
                                                onClick={() => handleAction(alert.id, 'acknowledge')}
                                            >
                                                <CheckSquare size={14} /> Ack
                                            </button>
                                        )}
                                        <button
                                            className="btn-small btn-primary"
                                            onClick={() => handleAction(alert.id, 'assign')}
                                        >
                                            <UserPlus size={14} /> Assign
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .full-width { width: 100%; }
        
        .row-critical {
          background-color: #fff0f0;
        }

        .mono {
          font-family: monospace;
          background: #eee;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .risk-score {
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 13px;
        }

        .score-high { background: var(--gov-uk-red); color: white; }
        .score-med { background: var(--gov-uk-yellow); color: black; }

        .btn-small {
          padding: 4px 8px;
          font-size: 13px;
          display: flex;
          gap: 5px;
          align-items: center;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
        }

        .btn-small:hover { background: #f0f0f0; }

        .action-buttons {
          display: flex;
          gap: 5px;
        }
      `}</style>
        </div>
    );
}
