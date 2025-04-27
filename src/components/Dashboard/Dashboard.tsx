// src/components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { Incident, Severity, SortOrder } from '../../types';
import { initialIncidents } from '../../data/mockData';
import IncidentForm from '../IncidentForm/IncidentForm';
import IncidentList from '../IncidentList/IncidentList';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('Newest First');

  // Filter incidents based on selected severity
  const filteredIncidents = selectedSeverity === 'All' 
    ? incidents 
    : incidents.filter(incident => incident.severity === selectedSeverity);

  // Sort incidents based on sort order
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'Newest First' ? dateB - dateA : dateA - dateB;
  });

  // Add new incident
  const handleAddIncident = (newIncident: Omit<Incident, 'id' | 'reported_at'>) => {
    const incident: Incident = {
      ...newIncident,
      id: incidents.length + 1,
      reported_at: new Date().toISOString()
    };
    setIncidents([...incidents, incident]);
  };

  return (
    <div className="dashboard">
      <h1>AI Safety Incident Dashboard</h1>
      <p>Monitor and report AI safety incidents</p>

      <div className="filters">
        <div className="filter-group">
          <label>Severity:</label>
          <select 
            value={selectedSeverity} 
            onChange={(e) => setSelectedSeverity(e.target.value as Severity | 'All')}
          >
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      <IncidentForm onAddIncident={handleAddIncident} />
      <IncidentList incidents={sortedIncidents} />
    </div>
  );
};

export default Dashboard;