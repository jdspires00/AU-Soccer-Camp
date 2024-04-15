import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import data from '../data/list.json'; // Import JSON data

const CoachCamperDropdown = () => {
  const [selectedCoach, setSelectedCoach] = useState<any>(null); // Change type to any
  const [selectedCamper, setSelectedCamper] = useState<string | null>(null);

  const coaches = data.map((item: any) => ({ label: item.coach, value: item }));

  const onCoachChange = (e: any) => {
    setSelectedCoach(e.value);
    setSelectedCamper(null); // Reset selected camper
  };

  const onCamperChange = (e: any) => {
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
      {selectedCoach && ( // Check if selectedCoach is not null
        <Dropdown
          value={selectedCamper}
          options={selectedCoach.campers.map((camper: string) => ({ label: camper, value: camper }))}
          onChange={onCamperChange}
          placeholder="Select a Camper"
        />
      )}
    </div>
  );
};

export default CoachCamperDropdown;