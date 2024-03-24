import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Papa from 'papaparse';

const CoachCamperDropdown = () => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [campers, setCampers] = useState([]);
  const [selectedCamper, setSelectedCamper] = useState(null);

  useEffect(() => {
    // Function to read and parse the CSV data
    const readCSV = async () => {
      const response = await fetch('/path-to-your/coaches-and-campers.csv');
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); // the csv text
      const parsedData = Papa.parse(csv, { header: true });

      const coachesData = parsedData.data.map((row) => ({
        name: row.Coach, // Assuming the CSV has 'Coach' column for coach names
        campers: Object.values(row).slice(1) // Assumes camper names are in subsequent columns
      }));

      setCoaches(coachesData);
    };

    readCSV();
  }, []);

  // Function to handle change on coach selection
  const onCoachChange = (e) => {
    setSelectedCoach(e.value);
    const selectedCoachData = coaches.find(coach => coach.name === e.value.name);
    setCampers(selectedCoachData ? selectedCoachData.campers : []);
  };

  return (
    <div>
      <h3>Select Coach and Camper</h3>
      <Dropdown
        value={selectedCoach}
        options={coaches}
        onChange={onCoachChange}
        optionLabel="name"
        placeholder="Select a Coach"
      />
      <Dropdown
        value={selectedCamper}
        options={campers}
        onChange={(e) => setSelectedCamper(e.value)}
        placeholder="Select a Camper"
        disabled={!selectedCoach}
      />
    </div>
  );
};

export default CoachCamperDropdown;