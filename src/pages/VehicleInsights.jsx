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

            <style>{`
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
