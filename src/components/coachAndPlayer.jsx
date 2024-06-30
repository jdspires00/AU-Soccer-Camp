import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import data from '../data/list.json';

const CoachCamperDropdown = ({ setSelectCoach, setSelectCamper }) => {
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedCamper, setSelectedCamper] = useState(null);

  const coaches = data.map((item) => ({ label: item.coach, value: item }));

  useEffect(() => {
    setSelectCoach(selectedCoach);
  }, [selectedCoach]);

  useEffect(() => {
    setSelectCamper(selectedCamper);
  }, [selectedCamper]);

  const onCoachChange = (e) => {
    setSelectedCoach(e.value);
    setSelectedCamper(null); // Reset selected camper
  };

  const onCamperChange = (e) => {
    setSelectedCamper(e.value);
  };

  return (
    <div>
      <h3>Select Coach and Camper</h3>
      <Dropdown
        value={selectedCoach}
        options={coaches}
        onChange={onCoachChange}
        optionLabel="label"
        placeholder="Select a Coach"
      />
      {selectedCoach && (
        <Dropdown
          value={selectedCamper}
          options={selectedCoach.campers.map((camper) => ({ label: camper, value: camper }))}
          onChange={onCamperChange}
          placeholder="Select a Camper"
        />
      )}
    </div>
  );
};

export default CoachCamperDropdown;