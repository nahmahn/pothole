import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import { getPotholeDetections } from '../data/mockService';

const data = [
    { name: 'Jan', detected: 400, repaired: 240 },
    { name: 'Feb', detected: 300, repaired: 139 },
    { name: 'Mar', detected: 200, repaired: 980 }, // Big repair month
    { name: 'Apr', detected: 278, repaired: 390 },
    { name: 'May', detected: 189, repaired: 480 },
    { name: 'Jun', detected: 239, repaired: 380 },
    { name: 'Jul', detected: 349, repaired: 430 },
];

const HeatmapLayer = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (!points.length) return;

        const heat = L.heatLayer(points, {
            radius: 35,
            blur: 20,
            maxZoom: 18,
            max: 1.0,
            minOpacity: 0.5,
            gradient: { 0.2: 'blue', 0.4: 'cyan', 0.6: 'lime', 0.8: 'yellow', 1: 'red' }
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [map, points]);

    return null;
};

export default function Analytics() {
    const detections = getPotholeDetections();
    const heatmapPoints = detections.map(p => [
        p.lat,
        p.lng,
        p.severity === 'severe' ? 1 : p.severity === 'moderate' ? 0.6 : 0.3
    ]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="text-xl">Historical Analytics</h1>
                <p>Long-term trends in road quality and repair efficiency.</p>
            </div>

            <div className="card">
                <h3 className="section-title">Detection vs Repair Rate (2025)</h3>
                <div style={{ height: '400px', width: '100%' }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="detected" fill="#1d70b8" name="Defects Detected" />
                            <Bar dataKey="repaired" fill="#00703c" name="Defects Repaired" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-small" style={{ marginTop: '20px' }}>
                    *Data sourced from AI Vision Fleet and Council Maintenance Logs.
                </p>
            </div>

            <div className="grid-2">
                <div className="card">
                    <h3 className="section-title">Efficiency Metrics</h3>
                    <ul className="metrics-list">
                        <li>
                            <strong>Avg Time to Repair:</strong> 4.2 Days <span className="trend-down">↓ 12%</span>
                        </li>
                        <li>
                            <strong>Detection Accuracy:</strong> 96.5% <span className="trend-up">↑ 1%</span>
                        </li>
                        <li>
                            <strong>Cost per Defect:</strong> £45 <span className="trend-down">↓ 5%</span>
                        </li>
                    </ul>
                </div>

                <div className="card">
                    <h3 className="section-title">Defect Density Heatmap</h3>
                    <div className="mini-heatmap-container">
                        <MapContainer
                            center={[51.510, -0.125]}
                            zoom={13}
                            style={{ height: '200px', width: '100%' }}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            dragging={false}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <HeatmapLayer points={heatmapPoints} />
                        </MapContainer>
                    </div>
                    <p className="text-small" style={{ marginTop: '10px', color: '#666' }}>
                        Density visualization of all recorded defects.
                    </p>
                </div>
            </div>

            <style>{`
        .metrics-list {
          list-style: none;
          padding: 0;
        }
        .metrics-list li {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
        }
        .trend-down { color: green; font-weight: bold; }
        .trend-up { color: green; font-weight: bold; }
        .mini-heatmap-container {
          border: 1px solid var(--gov-uk-border);
          border-radius: 4px;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
}
