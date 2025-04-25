import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({
  specialities,
  selectedSpecialities,
  onSpecialityChange,
  consultationMode,
  onConsultationModeChange,
}) => {
  // Safe function to generate test IDs
  const getSpecialityTestId = (speciality) => {
    if (!speciality) return '';
    return `filter-specialty-${speciality.replace(/\s+/g, '-').replace(/\//g, '-')}`;
  };

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc" className="filter-header">
          Mode of consultation
        </h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              data-testid="filter-video-consult"
              type="radio"
              name="consultationMode"
              checked={consultationMode === 'video'}
              onChange={() => onConsultationModeChange('video')}
              className="filter-input"
            />
            Video Consultation
          </label>
          <label className="filter-option">
            <input
              data-testid="filter-in-clinic"
              type="radio"
              name="consultationMode"
              checked={consultationMode === 'clinic'}
              onChange={() => onConsultationModeChange('clinic')}
              className="filter-input"
            />
            In-clinic Consultation
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="consultationMode"
              checked={consultationMode === 'all'}
              onChange={() => onConsultationModeChange('all')}
              className="filter-input"
            />
            All
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality" className="filter-header">
          Specialities
        </h3>
        <div className="specialities-list">
          {specialities && specialities.map((speciality) => (
            <label key={speciality} className="filter-option">
              <input
                data-testid={getSpecialityTestId(speciality)}
                type="checkbox"
                checked={selectedSpecialities.includes(speciality)}
                onChange={() => onSpecialityChange(speciality)}
                className="filter-input"
              />
              {speciality}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;