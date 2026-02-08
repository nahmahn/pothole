import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { getPotholeDetections } from '../data/mockService';
import { X, AlertTriangle, Camera, Activity, Calendar, MapPin, ZoomIn } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not found (though we use CircleMarker primarily)
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

import { useToast } from '../components/ui/Toast';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet.heat';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

export default function LiveMap() {
  const { addToast } = useToast();
  const [detections, setDetections] = useState([]);
  const [selectedPothole, setSelectedPothole] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [filters, setFilters] = useState({
    severe: true,
    moderate: true,
    minor: true
  });

  useEffect(() => {
    setDetections(getPotholeDetections());
  }, []);

  const toggleFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredDetections = detections.filter(p => filters[p.severity]);

  // Prepare heatmap points: [lat, lng, intensity]
  // Intensity based on severity: severe=1, moderate=0.6, minor=0.3
  const heatmapPoints = detections.map(p => [
    p.lat,
    p.lng,
    p.severity === 'severe' ? 1 : p.severity === 'moderate' ? 0.6 : 0.3
  ]);

  const getColor = (severity) => {
    switch (severity) {
      case 'severe': return 'var(--gov-uk-red)';
      case 'moderate': return '#f47738'; // Orange
      case 'minor': return 'var(--gov-uk-yellow)';
      default: return 'gray';
    }
  };

  const handleMarkerClick = (pothole) => {
    setSelectedPothole(pothole);
  };

  const closePanel = () => {
    setSelectedPothole(null);
  };

  return (
    <div className="map-page">
      <div className="map-container">
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />

          {showHeatmap && <HeatmapLayer points={heatmapPoints} />}

          {!showHeatmap && (
            <MarkerClusterGroup chunkedLoading>
              {filteredDetections.map((pothole) => (
                <CircleMarker
                  key={pothole.id}
                  center={[pothole.lat, pothole.lng]}
                  pathOptions={{
                    color: 'white',
                    fillColor: getColor(pothole.severity),
                    fillOpacity: 0.8,
                    weight: 2
                  }}
                  radius={10}
                  eventHandlers={{
                    click: () => handleMarkerClick(pothole),
                  }}
                >
                </CircleMarker>
              ))}
            </MarkerClusterGroup>
          )}
        </MapContainer>

        {/* Map Controls / Legend Overlay */}
        <div className="map-legend">
          <div className="legend-title">Map Layers</div>
          <div className="legend-item" onClick={() => setShowHeatmap(!showHeatmap)}>
            <input type="checkbox" checked={showHeatmap} readOnly />
            <span className="dot" style={{ background: 'linear-gradient(90deg, blue, lime, red)' }}></span> Heatmap Density
          </div>

          <div className="section-divider" style={{ margin: '10px 0' }}></div>

          <div className="legend-title">Filter by Severity</div>
          <div className={`legend-item ${showHeatmap ? 'disabled' : ''}`} onClick={() => !showHeatmap && toggleFilter('severe')}>
            <input type="checkbox" checked={filters.severe} disabled={showHeatmap} readOnly />
            <span className="dot red"></span> Severe
          </div>
          <div className={`legend-item ${showHeatmap ? 'disabled' : ''}`} onClick={() => !showHeatmap && toggleFilter('moderate')}>
            <input type="checkbox" checked={filters.moderate} disabled={showHeatmap} readOnly />
            <span className="dot orange"></span> Moderate
          </div>
          <div className={`legend-item ${showHeatmap ? 'disabled' : ''}`} onClick={() => !showHeatmap && toggleFilter('minor')}>
            <input type="checkbox" checked={filters.minor} disabled={showHeatmap} readOnly />
            <span className="dot yellow"></span> Minor
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className={`side-panel ${selectedPothole ? 'open' : ''}`}>
        {selectedPothole ? (
          <>
            <div className="panel-header">
              <h2 className="text-large">Detection Details</h2>
              <button className="btn-close" onClick={closePanel}><X size={24} /></button>
            </div>

            <div className="panel-content">
              <div className="detection-snapshot">
                <img src={selectedPothole.snapshot} alt="Pothole Snapshot" className="snapshot-img" />
                <div className="overlay-box">
                  <span className="overlay-tag">AI Confidence: {selectedPothole.confidence}%</span>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="label">ID</span>
                  <span className="value mono">{selectedPothole.id}</span>
                </div>
                <div className="info-item">
                  <span className="label">Severity</span>
                  <span className={`badge badge-${selectedPothole.severity === 'severe' ? 'red' : selectedPothole.severity === 'moderate' ? 'yellow' : 'yellow'}`}>
                    {selectedPothole.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="section-divider"></div>

              <div className="info-row">
                <Calendar size={16} />
                <span className="text-small">Detected: {new Date(selectedPothole.detectedAt).toLocaleString()}</span>
              </div>
              <div className="info-row">
                <MapPin size={16} />
                <span className="text-small">{selectedPothole.location}</span>
              </div>

              <div className="explainability-box">
                <h3 className="exp-title"><Activity size={16} /> AI Explainability</h3>
                <p className="exp-text">
                  "{selectedPothole.explanation}"
                </p>
                <div className="exp-meta">
                  <span className="meta-tag">Model: {selectedPothole.model}</span>
                  <span className="meta-tag">Vehicles: {selectedPothole.vehicleCount}</span>
                </div>
                <div className="trust-warning">
                  <AlertTriangle size={14} />
                  Automated detection. Verify before dispatching repair crews.
                </div>
              </div>

              <div className="panel-actions">
                <button
                  className="btn btn-full"
                  onClick={() => {
                    addToast(`Work Order created for ${selectedPothole.id}`, 'success');
                    closePanel();
                  }}
                >
                  Create Work Order
                </button>
                <button
                  className="btn btn-secondary btn-full"
                  onClick={() => {
                    addToast(`Detection ${selectedPothole.id} marked as False Positive`, 'info');
                    closePanel();
                  }}
                >
                  Mark as False Positive
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-panel">
            <p>Select a detection on the map to view details.</p>
          </div>
        )}
      </div>

      <style>{`
        .map-page {
          height: calc(100vh - 160px); /* Adjust based on header/nav height */
          display: flex;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--gov-uk-border);
        }

        .map-container {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .map-legend {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: white;
          padding: 15px;
          border: 2px solid var(--gov-uk-grey-1);
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 4px;
        }

        .legend-title {
            font-weight: 700;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          margin-bottom: 8px;
          cursor: pointer;
        }

        .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
        .red { background: var(--gov-uk-red); }
        .orange { background: #f47738; }
        .yellow { background: var(--gov-uk-yellow); }

        .side-panel {
          width: 400px;
          background: white;
          border-left: 1px solid var(--gov-uk-border);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 1001;
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        }

        .side-panel.open {
          transform: translateX(0);
        }

        .panel-header {
          padding: 20px;
          border-bottom: 1px solid var(--gov-uk-grey-3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--gov-uk-grey-4);
        }

        .btn-close {
          background: none;
          border: none;
          cursor: pointer;
        }

        .panel-content {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }

        .detection-snapshot {
          width: 100%;
          height: 200px;
          background: #eee;
          margin-bottom: 20px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .snapshot-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay-box {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 5px 10px;
          font-size: 12px;
          display: flex;
          justify-content: space-between;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .label { font-size: 12px; color: var(--gov-uk-grey-1); text-transform: uppercase; font-weight: 700; }
        .value { font-size: 16px; font-weight: 500; }
        .mono { font-family: monospace; }
        
        .section-divider {
          height: 1px;
          background: var(--gov-uk-grey-3);
          margin: 15px 0;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: var(--gov-uk-grey-1);
        }

        .explainability-box {
          background: #eef6fc; /* Very light blue */
          border-left: 4px solid var(--gov-uk-blue);
          padding: 15px;
          margin-top: 20px;
        }

        .exp-title {
          font-size: 14px;
          color: var(--gov-uk-blue);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .exp-text {
          font-style: italic;
          font-size: 14px;
          color: var(--gov-uk-black);
          margin-bottom: 15px;
        }

        .exp-meta {
          display: flex;
          gap: 10px;
          font-size: 12px;
          color: var(--gov-uk-grey-1);
          margin-bottom: 10px;
        }

        .meta-tag {
          background: rgba(255,255,255,0.5);
          padding: 2px 5px;
          border-radius: 3px;
        }

        .trust-warning {
          font-size: 12px;
          color: #8a6d3b;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 10px;
        }

        .panel-actions {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-full { width: 100%; }

        .empty-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: var(--gov-uk-grey-1);
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
