import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import data from '../data/list.json';
import { Checkbox } from 'primereact/checkbox';
import { on } from 'events';


interface CoachCamperDropdownProps {
  setSelectCoach: (coach: any) => void;
  setSelectCamper: (camper: string | null) => void;
}

const CoachCamperDropdown: React.FC<CoachCamperDropdownProps> = ({ setSelectCoach, setSelectCamper }) => {
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [selectedCamper, setSelectedCamper] = useState<string | null>(null);

  const coaches = data.map((item: any) => ({ label: item.coach, value: item }));

  useEffect(() => {
    setSelectCoach(selectedCoach);
  }, [selectedCoach]);

  useEffect(() => {
    setSelectCamper(selectedCamper);
  }, [selectedCamper]);

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
      {selectedCoach && (
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