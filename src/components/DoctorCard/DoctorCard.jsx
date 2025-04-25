import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div data-testid="doctor-card" className="doctor-card">
      <h3 data-testid="doctor-name" className="doctor-name">
        {doctor.name}
      </h3>
      <p data-testid="doctor-specialty" className="doctor-specialty">
        {doctor.speciality.join(', ')}
      </p>
      <div className="doctor-info">
        <span data-testid="doctor-experience" className="doctor-experience">
          Exp: {doctor.experience} years
        </span>
        <span data-testid="doctor-fee" className="doctor-fee">
          Fee: ₹{doctor.fee}
        </span>
      </div>
    </div>
  );
};

export default DoctorCard;