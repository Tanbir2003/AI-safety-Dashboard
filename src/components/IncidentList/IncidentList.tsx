// src/components/IncidentList/IncidentList.tsx
import React from 'react';
import { Incident } from '../../types';
import IncidentItem from '../IncidentItem/IncidentItem';
import './IncidentList.css';

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  return (
    <div className="incident-list">
      <h2>Incident Reports</h2>
      {incidents.length === 0 ? (
        <p>No incidents match your filters.</p>
      ) : (
        <div className="incidents-container">
          {incidents.map(incident => (
            <IncidentItem key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncidentList;