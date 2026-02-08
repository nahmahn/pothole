import React, { useEffect, useState } from 'react';
import { getVehicleStats } from '../data/mockService';
import { Truck, Signal, Wifi, Battery } from 'lucide-react';

export default function VehicleInsights() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(getVehicleStats());
    }, []);

    if (!stats) return <div>Loading fleet data...</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="text-xl">Vehicle & Sensor Status</h1>
                <p>Operational effectiveness of the AI-equipped fleet.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid-3">
                <div className="card">
                    <div className="flex-row">
                        <Truck size={24} color="var(--gov-uk-blue)" />
                        <h3 className="section-title">Active Fleet</h3>
                    </div>
                    <div className="stat-big">{stats.activeVehicles} <span className="text-small">vehicles online</span></div>
                </div>

                <div className="card">
                    <div className="flex-row">
                        <Signal size={24} color="var(--gov-uk-green)" />
                        <h3 className="section-title">GPS Accuracy</h3>
                    </div>
                    <div className="stat-big">{stats.gpsReliability} <span className="text-small">mean precision</span></div>
                </div>

                <div className="card">
                    <div className="flex-row">
                        <Wifi size={24} color="var(--gov-uk-blue)" />
                        <h3 className="section-title">Data Uplink</h3>
                    </div>
                    <div className="stat-big" style={{ color: 'green' }}>Connected</div>
                </div>
            </div>

            <h2 className="text-large" style={{ marginTop: '30px' }}>Fleet Telemetry</h2>
            <div className="card">
                <table className="gov-table full-width">
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Sector</th>
                            <th>Sensor Status</th>
                            <th>Battery/Power</th>
                            <th>Last Uplink</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map(i => (
                            <tr key={i}>
                                <td className="mono">V-AI-{2000 + i}</td>
                                <td>Sector {['North', 'East', 'South', 'West', 'Central'][i - 1]}</td>
                                <td><span className="badge badge-green">OK</span></td>
                                <td>
                                    <div className="flex-row">
                                        <Battery size={16} /> {90 - i * 5}%
                                    </div>
                                </td>
                                <td>{i * 2} mins ago</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="text-large" style={{ marginTop: '30px' }}>Edge Unit Configuration</h2>
            <div className="card" style={{ marginTop: '15px' }}>
                <div className="edge-config-grid">
                    <div className="config-item">
                        <span className="label">Hardware</span>
                        <span className="value">Raspberry Pi 5 (8GB)</span>
                    </div>
                    <div className="config-item">
                        <span className="label">Model</span>
                        <span className="value">YOLOv8-S (Optimized)</span>
                    </div>
                    <div className="config-item">
                        <span className="label">Inference</span>
                        <span className="value">CPU / Reduced ROI</span>
                    </div>
                    <div className="config-item">
                        <span className="label">Latency</span>
                        <span className="value">&lt; 100ms (Edge-First)</span>
                    </div>
                </div>
                <div className="config-description" style={{ marginTop: '20px', fontSize: '14px', color: '#444', lineHeight: '1.6' }}>
                    <p>
                        <strong>Deployment Strategy:</strong> Mounted fixed forward-facing camera ensures stable geometry.
                        Inference runs locally avoiding network dependency. Detections are confirmed across consecutive frames (Temporal Consistency)
                        to suppress false positives. GPS data is attached asynchronously via Bluetooth to maintain alert prioritization.
                    </p>
                </div>
            </div>

            <style>{`
        .edge-config-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .config-item {
            display: flex;
            flex-direction: column;
        }
        .config-item .label {
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
            font-weight: 700;
            margin-bottom: 4px;
        }
        .config-item .value {
            font-size: 18px;
            font-weight: 500;
            color: var(--gov-uk-blue);
        }
        .stat-big {
          font-size: 36px;
          font-weight: 700;
          margin-top: 10px;
        }
        .full-width { width: 100%; }
        .mono { font-family: monospace; }
      `}</style>
        </div>
    );
}
