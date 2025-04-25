import axios from 'axios';

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(
      'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json'
    );
    
    // Validate and normalize the data
    return response.data.map(doctor => ({
      id: doctor.id || Math.random().toString(36).substring(2, 9),
      name: doctor.name || 'Unknown Doctor',
      speciality: Array.isArray(doctor.speciality) ? doctor.speciality : [],
      experience: Number(doctor.experience) || 0,
      fee: Number(doctor.fee) || 0,
      video_consultation: Boolean(doctor.video_consultation),
      in_clinic_consultation: Boolean(doctor.in_clinic_consultation),
      // Add any other required fields with defaults
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};