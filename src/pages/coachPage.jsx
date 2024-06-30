import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Accordion, AccordionTab } from 'primereact/accordion';

function CoachPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'PlayerSkillEvaluations'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Accordion>
        {submissions.map((submission, index) => (
          <AccordionTab key={index} header={`Submission for ${submission.selectedCamper}`}>
            <p>Selected Camper: {submission.selectedCamper}</p>
            <p>Coach Name: {submission.coachName}</p>
            <p>Goalkeeper: {submission.goalkeeper}</p>
            <p>Skills:</p>
            <ul>
              <li>Dribbling: {submission.skills.dribbling}</li>
              <li>Shooting: {submission.skills.shooting}</li>
              <li>Passing: {submission.skills.passing}</li>
              <li>Vision: {submission.skills.vision}</li>
              <li>Touch: {submission.skills.touch}</li>
            </ul>
            <p>Technical Comments: {submission.techComments}</p>
            <ul>
              <li>Communication: {submission.skills.communication}</li>
              <li>Work Ethic: {submission.skills.workEthic}</li>
              <li>Team Player: {submission.skills.teamPlayer}</li>
              <li>Sportsmanship: {submission.skills.sportsmanship}</li>
            </ul>
            <p>Non-Technical Comments: {submission.comments}</p>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default CoachPage;