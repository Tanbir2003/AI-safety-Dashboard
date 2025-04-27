// src/components/IncidentForm/IncidentForm.tsx
import React, { useState } from 'react';
import { Incident, Severity } from '../../types';
import './IncidentForm.css';

interface IncidentFormProps {
  onAddIncident: (incident: Omit<Incident, 'id' | 'reported_at'>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onAddIncident }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<Severity>('Low');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim() || !description.trim()) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    onAddIncident({
      title,
      description,
      severity
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setValidationError('');
  };
  
  return (
    <div className="incident-form-container">
      <h2>Report New Incident</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            placeholder="Enter incident title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            placeholder="Provide detailed information about the incident"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Severity</label>
          <div className="radio-group">
            <label className="radio-label">
              <input 
                type="radio"
                name="severity"
                checked={severity === 'Low'}
                onChange={() => setSeverity('Low')}
              />
              Low
            </label>
            <label className="radio-label">
              <input 
                type="radio"
                name="severity"
                checked={severity === 'Medium'}
                onChange={() => setSeverity('Medium')}
              />
              Medium
            </label>
            <label className="radio-label">
              <input 
                type="radio"
                name="severity"
                checked={severity === 'High'}
                onChange={() => setSeverity('High')}
              />
              High
            </label>
          </div>
        </div>
        
        {validationError && <div className="error-message">{validationError}</div>}
        
        <button type="submit" className="submit-button">Submit Report</button>
      </form>
    </div>
  );
};

export default IncidentForm;