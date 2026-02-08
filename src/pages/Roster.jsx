import React, { useState, useEffect } from 'react';
import { getOfficers } from '../data/mockService';
import { useToast } from '../components/ui/Toast';
import { User, Shield, Radio, MapPin, Search } from 'lucide-react';

export default function Roster() {
    const [officers, setOfficers] = useState([]);
    const [filter, setFilter] = useState('All');
    const { addToast } = useToast();

    useEffect(() => {
        setOfficers(getOfficers());
    }, []);

    const filteredOfficers = filter === 'All'
        ? officers
        : officers.filter(o => o.status === filter);

    const handleStatusChange = (id, newStatus) => {
        setOfficers(officers.map(o =>
            o.id === id ? { ...o, status: newStatus } : o
        ));
        addToast(`Officer ${id} status changed to ${newStatus}`, 'info');
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="text-xl">Unit Roster & Status</h1>
                    <p>Live operational status of deployed units.</p>
                </div>
                <div className="filters">
                    <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                    <button className={`filter-btn ${filter === 'On Duty' ? 'active' : ''}`} onClick={() => setFilter('On Duty')}>On Duty</button>
                    <button className={`filter-btn ${filter === 'Busy' ? 'active' : ''}`} onClick={() => setFilter('Busy')}>Busy</button>
                    <button className={`filter-btn ${filter === 'Off Duty' ? 'active' : ''}`} onClick={() => setFilter('Off Duty')}>Off Duty</button>
                </div>
            </div>

            <div className="grid-responsive">
                {filteredOfficers.map(officer => (
                    <div key={officer.id} className={`card officer-card ${officer.status.toLowerCase().replace(' ', '-')}`}>
                        <div className="officer-header">
                            <div className="officer-identity">
                                <div className="avatar-placeholder">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="officer-name">{officer.name}</div>
                                    <div className="officer-meta">{officer.rank} • {officer.unit}</div>
                                </div>
                            </div>
                            <div className={`status-pill ${getBadgeClass(officer.status)}`}>
                                {officer.status}
                            </div>
                        </div>

                        <div className="officer-details">
                            <div className="detail-row">
                                <Shield size={14} /> <span>{officer.id}</span>
                            </div>
                            <div className="detail-row">
                                <MapPin size={14} /> <span>{officer.location}</span>
                            </div>
                        </div>

                        <div className="officer-actions">
                            {officer.status !== 'Off Duty' ? (
                                <button className="btn-small btn-secondary" onClick={() => handleStatusChange(officer.id, 'Off Duty')}>
                                    Go Off Duty
                                </button>
                            ) : (
                                <button className="btn-small btn-primary" onClick={() => handleStatusChange(officer.id, 'On Duty')}>
                                    Clock In
                                </button>
                            )}
                            {officer.status === 'On Duty' && (
                                <button className="btn-small btn-secondary" onClick={() => handleStatusChange(officer.id, 'Busy')}>
                                    Assign Task
                                </button>
                            )}
                            {officer.status === 'Busy' && (
                                <button className="btn-small btn-secondary" onClick={() => handleStatusChange(officer.id, 'On Duty')}>
                                    Clear Task
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .filters {
                    display: flex;
                    gap: 5px;
                    background: #f3f2f1;
                    padding: 5px;
                    border-radius: 4px;
                }
                .filter-btn {
                    border: none;
                    background: none;
                    padding: 8px 16px;
                    font-size: 14px;
                    cursor: pointer;
                    border-radius: 3px;
                    font-weight: 500;
                    color: var(--gov-uk-grey-1);
                }
                .filter-btn.active {
                    background: white;
                    color: var(--gov-uk-blue);
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .grid-responsive {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }

                .officer-card {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    border-top: 4px solid transparent;
                }
                .officer-card.on-duty { border-top-color: var(--gov-uk-green); }
                .officer-card.busy { border-top-color: var(--gov-uk-yellow); }
                .officer-card.off-duty { border-top-color: var(--gov-uk-grey-2); opacity: 0.8; }

                .officer-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .officer-identity {
                    display: flex;
                    gap: 12px;
                }
                .avatar-placeholder {
                    width: 40px;
                    height: 40px;
                    background: var(--gov-uk-grey-3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--gov-uk-grey-1);
                }
                .officer-name {
                    font-weight: 700;
                    font-size: 16px;
                }
                .officer-meta {
                    font-size: 13px;
                    color: var(--gov-uk-grey-1);
                }

                .status-pill {
                    font-size: 12px;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                .badge-green { background: #cce5d6; color: #00703c; }
                .badge-yellow { background: #fff7bf; color: #594d00; }
                .badge-grey { background: #e0e0e0; color: #505a5f; }

                .officer-details {
                    display: flex;
                    gap: 15px;
                    padding: 10px 0;
                    border-top: 1px solid #eee;
                    border-bottom: 1px solid #eee;
                }
                .detail-row {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 13px;
                    color: var(--gov-uk-grey-1);
                }

                .officer-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: auto;
                }
            `}</style>
        </div>
    );
}

function getBadgeClass(status) {
    switch (status) {
        case 'On Duty': return 'badge-green';
        case 'Busy': return 'badge-yellow';
        case 'Off Duty': return 'badge-grey';
        default: return 'badge-grey';
    }
}
