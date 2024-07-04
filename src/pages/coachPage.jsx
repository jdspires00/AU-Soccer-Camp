import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { CSVLink } from 'react-csv';

function CoachPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    };

    fetchData();
  }, []);

  const prepareCSVData = (submission) => {
    return [{
      selectedCamper: submission.selectedCamper,
      coachName: submission.coachName,
      goalkeeper: submission.goalkeeper,
      dribbling: submission.technicalSkills.dribbling,
      shooting: submission.technicalSkills.shooting,
      passing: submission.technicalSkills.passing,
      vision: submission.technicalSkills.vision,
      touch: submission.technicalSkills.touch,
      technicalComments: submission.technicalComments,
      communication: submission.nonTechnicalSkills.communication,
      workEthic: submission.nonTechnicalSkills.workEthic,
      teamPlayer: submission.nonTechnicalSkills.teamPlayer,
      sportsmanship: submission.nonTechnicalSkills.sportsmanship,
      nonTechnicalComments: submission.nonTechnicalcomments
    }];
  };

  return (
    <div>
      <Accordion>
        {submissions.map((submission, index) => (
          <AccordionTab key={index} header={`Submission for ${submission.selectedCamper}`}>
            <p>Camper Name: {submission.selectedCamper}</p>
            <p>Coach Name: {submission.coachName}</p>
            <p>Position: {submission.goalkeeper}</p>
            <p>Technical Skills:</p>
            <ul>
              <li>Dribbling: {submission.technicalSkills.dribbling}</li>
              <li>Shooting: {submission.technicalSkills.shooting}</li>
              <li>Passing: {submission.technicalSkills.passing}</li>
              <li>Vision: {submission.technicalSkills.vision}</li>
              <li>Touch: {submission.technicalSkills.touch}</li>
            </ul>
            <p>Technical Comments: {submission.technicalComments}</p>
            <p>Non-Technical Skills:</p>
            <ul>
              <li>Communication: {submission.nonTechnicalSkills.communication}</li>
              <li>Work Ethic: {submission.nonTechnicalSkills.workEthic}</li>
              <li>Team Player: {submission.nonTechnicalSkills.teamPlayer}</li>
              <li>Sportsmanship: {submission.nonTechnicalSkills.sportsmanship}</li>
            </ul>
            <p>Non-Technical Comments: {submission.nonTechnicalcomments}</p>
            <CSVLink data={prepareCSVData(submission)} filename={`submission_${submission.selectedCamper.replace(/\s/g,'')}.csv`}>
              Download CSV
            </CSVLink>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

export default CoachPage;