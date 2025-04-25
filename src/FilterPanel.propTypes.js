import PropTypes from 'prop-types';

export const FilterPanelPropTypes = {
  specialities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSpecialities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSpecialityChange: PropTypes.func.isRequired,
  consultationMode: PropTypes.oneOf(['video', 'clinic', 'all']).isRequired,
  onConsultationModeChange: PropTypes.func.isRequired,
};