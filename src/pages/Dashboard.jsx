import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSummaryStats, getHistoricalData, getVehicleStats } from '../data/mockService';
import { AlertTriangle, CheckCircle, Activity, TrendingUp, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState([]);
    const [vehicleStats, setVehicleStats] = useState(null);

    useEffect(() => {
        setStats(getSummaryStats());
        setHistory(getHistoricalData());
        setVehicleStats(getVehicleStats());
    }, []);

    if (!stats) return <div>Loading operational data...</div>;

    return (
        <div className="dashboard-content">
            <div className="dashboard-header">
                <h1 className="text-xl">Operational Overview</h1>
                <div className="status-badge">
                    System Status: <span className="status-ok">● Nominal</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid-4">
                <div className="card summary-card">
                    <div className="card-label">Total Detections (Today)</div>
                    <div className="card-value">{stats.totalDetectedToday}</div>
                    <div className="card-trend positive">
                        <TrendingUp size={16} /> +12% vs yesterday
                    </div>
                </div>

                <div className="card summary-card alert-border">
                    <div className="card-label">Severe & Pending</div>
                    <div className="card-value text-red">{stats.severePending}</div>
                    <div className="card-sub text-red">
                        <AlertTriangle size={14} /> Action Required
                    </div>
                </div>

                <div className="card summary-card">
                    <div className="card-label">Multi-Vehicle Confirmations</div>
                    <div className="card-value">{stats.confirmedByMultiple}</div>
                    <div className="card-sub">
                        <CheckCircle size={14} /> High Certainty
                    </div>
                </div>

                <div className="card summary-card">
                    <div className="card-label">Avg. Confidence Score</div>
                    <div className="card-value">{stats.avgConfidence}%</div>
                    <div className="card-sub">
                        <Activity size={14} /> Vision Model v2.1
                    </div>
                </div>
            </div>

            {/* Charts & Map Teaser */}
            <div className="grid-2 main-grid">
                <div className="card chart-card">
                    <h3 className="section-title">Detection Trends (Last 5 Days)</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={history}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="detections" stroke="#1d70b8" fill="#dbeeff" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-small">
                        Spike on Wednesday correlates with heavy rainfall reports in North Sector.
                    </p>
                </div>

                <div className="card vehicle-status-card">
                    <h3 className="section-title">Fleet & Sensor Status</h3>
                    <div className="vehicle-stats-list">
                        <div className="stat-row">
                            <span className="stat-label">Active Monitoring Vehicles</span>
                            <span className="stat-val">{vehicleStats?.activeVehicles || '--'}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Avg Detection Freq</span>
                            <span className="stat-val">{vehicleStats?.detectionFrequency || '--'}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">GPS Precision (Mean)</span>
                            <span className="stat-val">{vehicleStats?.gpsReliability || '--'}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">Sensor Health</span>
                            <span className="stat-val status-ok">{vehicleStats?.cameraStatus || '--'}</span>
                        </div>
                    </div>
                    <Link to="/map" className="mini-map-link">
                        <MapPin size={20} />
                        <span>View Live Fleet Map</span>
                    </Link>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="card recent-alerts">
                <h3 className="section-title">Priority Areas (Repeated Alerts)</h3>
                <table className="gov-table">
                    <thead>
                        <tr>
                            <th>Area/Sector</th>
                            <th>Detections</th>
                            <th>Severity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Trafalgar Square, North</td>
                            <td>8 detections</td>
                            <td><span className="badge badge-red">Critical</span></td>
                            <td>Dispatch Assigned</td>
                        </tr>
                        <tr>
                            <td>A40 Westway (Eastbound)</td>
                            <td>12 detections</td>
                            <td><span className="badge badge-yellow">Moderate</span></td>
                            <td>Monitoring</td>
                        </tr>
                        <tr>
                            <td>High St, Kensington</td>
                            <td>5 detections</td>
                            <td><span className="badge badge-yellow">Moderate</span></td>
                            <td>Pending Review</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style>{`
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .status-badge {
          font-weight: 500;
          color: var(--gov-uk-grey-1);
        }

        .status-ok { color: var(--gov-uk-green); font-weight: 700; }

        .summary-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alert-border {
          border-left: 5px solid var(--gov-uk-red);
        }

        .card-label {
          font-size: 14px;
          color: var(--gov-uk-grey-1);
          font-weight: 600;
        }

        .card-value {
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
        }

        .card-sub {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
          color: var(--gov-uk-grey-1);
        }

        .text-red { color: var(--gov-uk-red); }

        .card-trend.positive {
          color: var(--gov-uk-green);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .main-grid {
          margin-bottom: 20px;
        }

        .chart-container {
          margin: 20px 0;
        }

        .vehicle-stats-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--gov-uk-grey-3);
          padding-bottom: 10px;
        }

        .stat-label { color: var(--gov-uk-grey-1); }
        .stat-val { font-weight: 700; }

        .mini-map-link {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background-color: var(--gov-uk-grey-3);
          color: var(--gov-uk-blue);
          text-decoration: none;
          font-weight: 700;
          border: 1px solid var(--gov-uk-border);
          width: 100%;
          transition: background-color 0.2s;
        }

        .mini-map-link:hover {
          background-color: var(--gov-uk-grey-2);
          color: var(--gov-uk-black);
        }

        .gov-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .gov-table th {
          text-align: left;
          border-bottom: 1px solid var(--gov-uk-grey-2);
          padding: 10px 5px;
          font-weight: 700;
        }

        .gov-table td {
          padding: 10px 5px;
          border-bottom: 1px solid var(--gov-uk-grey-3);
        }
      `}</style>
        </div >
    );
}
