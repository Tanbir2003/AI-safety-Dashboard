// src/components/IncidentItem/IncidentItem.tsx
import React, { useState } from 'react';
import { Incident } from '../../types';
import './IncidentItem.css';

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem: React.FC<IncidentItemProps> = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format the date
  const formattedDate = new Date(incident.reported_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="incident-item">
      <div className="incident-header">
        <h3>{incident.title}</h3>
        <div className="incident-meta">
          <span className={`severity-badge ${incident.severity.toLowerCase()}`}>
            {incident.severity}
          </span>
          <span className="date">{formattedDate}</span>
        </div>
        <button 
          className="toggle-details-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="incident-details">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;