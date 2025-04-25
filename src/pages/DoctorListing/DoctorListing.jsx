import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from '../../utils/api';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SortOptions from '../../components/SortOptions/SortOptions';
import './DoctorListing.css';

const DoctorListing = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [consultationMode, setConsultationMode] = useState('all');
  const [sortBy, setSortBy] = useState(null);

  // Extract all unique specialities with null check
  const allSpecialities = React.useMemo(() => {
    if (!doctors || doctors.length === 0) return [];
    const specialties = new Set();
    doctors.forEach(doctor => {
      if (Array.isArray(doctor.speciality)) {
        doctor.speciality.forEach(spec => specialties.add(spec));
      }
    });
    return Array.from(specialties).sort();
  }, [doctors]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
        
        // Initialize filters from URL params if they exist
        const query = searchParams.get('search') || '';
        const specialities = searchParams.get('specialities')?.split(',') || [];
        const mode = searchParams.get('mode') || 'all';
        const sort = searchParams.get('sort') || null;

        setSearchQuery(query);
        setSelectedSpecialities(specialities.filter(Boolean));
        setConsultationMode(mode);
        setSortBy(sort);
      } catch (err) {
        console.error('Failed to load doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length === 0) return;

    let result = [...doctors];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply speciality filter
    if (selectedSpecialities.length > 0) {
      result = result.filter(doctor =>
        doctor.speciality && doctor.speciality.some(spec => selectedSpecialities.includes(spec))
      );
    }

    // Apply consultation mode filter
    if (consultationMode !== 'all') {
      result = result.filter(doctor =>
        consultationMode === 'video' 
          ? doctor.video_consultation 
          : doctor.in_clinic_consultation
      );
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'fee') {
          return a.fee - b.fee;
        } else if (sortBy === 'experience') {
          return b.experience - a.experience;
        }
        return 0;
      });
    }

    setFilteredDoctors(result);

    // Update URL params
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (selectedSpecialities.length > 0) params.specialities = selectedSpecialities.join(',');
    if (consultationMode !== 'all') params.mode = consultationMode;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [doctors, searchQuery, selectedSpecialities, consultationMode, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSpecialityChange = (speciality) => {
    setSelectedSpecialities(prev =>
      prev.includes(speciality)
        ? prev.filter(s => s !== speciality)
        : [...prev, speciality]
    );
  };

  const handleConsultationModeChange = (mode) => {
    setConsultationMode(mode);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-listing-container">
      <h1 className="page-title">Find Doctors</h1>
      
      <SearchBar onSearch={handleSearch} doctors={doctors} />

      <div className="listing-content">
        <div className="filters-column">
          <FilterPanel
            specialities={allSpecialities}
            selectedSpecialities={selectedSpecialities}
            onSpecialityChange={handleSpecialityChange}
            consultationMode={consultationMode}
            onConsultationModeChange={handleConsultationModeChange}
          />
          <SortOptions onSortChange={handleSortChange} />
        </div>

        <div className="doctors-list">
          {filteredDoctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorListing;