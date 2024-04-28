import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import data from '../data/list.json';
import { Checkbox } from 'primereact/checkbox';


interface CoachCamperDropdownProps {
  setSelectedCoach: (coach: any) => void;
  setSelectedCamper: (camper: string | null) => void;
  setIsGoalie: (isGoalie: boolean) => void;
}

const CoachCamperDropdown = ({}:CoachCamperDropdownProps) => {
  const [selectedCoach, setSelectedCoach] = useState<any>(null); // Change type to any
  const [selectedCamper, setSelectedCamper] = useState<string | null>(null);
  const [isGoalie, setIsGoalie] = useState(false);

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
      {selectedCoach && (
        <Dropdown
          value={selectedCamper}
          options={selectedCoach.campers.map((camper: string) => ({ label: camper, value: camper }))}
          onChange={onCamperChange}
          placeholder="Select a Camper"
        />
      )}
      {selectedCamper && (
        <div>
          <h4>Goalkeeper?</h4>
          <Checkbox
            checked={isGoalie}
            onChange={(e) => setIsGoalie(e.checked || false)}
          />
        </div>
      )}
    </div>
  );
};

export default CoachCamperDropdown;