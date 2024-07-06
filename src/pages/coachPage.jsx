import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Accordion, AccordionTab } from 'primereact/accordion';
import Dribbling from '../images/dribbling.jpg';
import Shooting from '../images/shooting.jpg';
import Passing from '../images/passing.png';
import Vision from '../images/vision.png';
import Touch from '../images/touch.jpeg';
import Communication from '../images/communication.jpg';
import WorkEthic from '../images/workethic.jpg';
import TeamPlayer from '../images/teamplayer.jpg';
import Sportsmanship from '../images/sportsmanship.jpg';
import AuSoccerCamp from '../images/au-soccer-camp.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from 'primereact/button';
import '../styles/coachPage.css';

function CoachPage() {
  const [submissions, setSubmissions] = useState([]);
  const submissionRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'submissions'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    };

    fetchData();
  }, []);

  const generatePDF = async (submissionId) => {
    const element = submissionRefs.current[submissionId];
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save(`submission_${submissionId}.pdf`);
  };

  const groupByCoach = (submissions) => {
    return submissions.reduce((grouped, submission) => {
      const coachName = submission.coachName;
      if (!grouped[coachName]) {
        grouped[coachName] = [];
      }
      grouped[coachName].push(submission);
      return grouped;
    }, {});
  };

  const groupedSubmissions = groupByCoach(submissions);

  return (
    <div>
      <Accordion>
        {Object.keys(groupedSubmissions).map((coachName, index) => (
          <AccordionTab key={index} header={`Coach ${coachName}`}>
            <Accordion>
              {groupedSubmissions[coachName].map((submission, subIndex) => (
                <AccordionTab key={subIndex} header={`Submission for ${submission.selectedCamper}`}>
                  <Button onClick={() => generatePDF(submission.id)} label='Download PDF' />
                  <div ref={el => submissionRefs.current[submission.id] = el}>
                  <div className="submission-header">
                    <img src={AuSoccerCamp} width='100' alt="AU Soccer Camp" />
                  </div>
                    <p style={{display:'inline-block'}}><strong>Camper Name:</strong> {submission.selectedCamper}</p>
                    <p style={{display:'inline-block', marginLeft: '24px'}}><strong>Coach Name:</strong> {submission.coachName}</p>
                    <p style={{display:'inline-block', marginLeft: '24px'}}><strong>Type of Player:</strong> {submission.goalkeeper}</p>
                    <p style={{fontWeight:'bold'}}>Technical Skills:</p>
                    <ul className="skills-list">
                      <li className="skill-item">Dribbling: {submission.technicalSkills.dribbling} <img src={Dribbling} width="60" height="60" alt="Dribbling" /></li>
                      <li className="skill-item">Shooting: {submission.technicalSkills.shooting} <img src={Shooting} width="60" height="60" alt="Shooting" /></li>
                      <li className="skill-item">Passing: {submission.technicalSkills.passing} <img src={Passing} width="60" height="60" alt="Passing" /></li>
                      <li className="skill-item">Vision: {submission.technicalSkills.vision} <img src={Vision} width="60" height="60" alt="Vision" /></li>
                      <li className="skill-item">Touch: {submission.technicalSkills.touch} <img src={Touch} width="60" height="60" alt="Touch" /></li>
                    </ul>
                    <p className="comment"><strong>Technical Comments:</strong> {submission.technicalComments}</p>
                    <br />
                    <p style={{fontWeight:'bold'}}>Non-Technical Skills:</p>
                    <ul className="skills-list">
                      <li className="skill-item">Communication: {submission.nonTechnicalSkills.communication} <img src={Communication} width="60" height="60" alt="Communication" /></li>
                      <li className="skill-item">Work Ethic: {submission.nonTechnicalSkills.workEthic} <img src={WorkEthic} width="60" height="60" alt="Work Ethic" /></li>
                      <li className="skill-item">Team Player: {submission.nonTechnicalSkills.teamPlayer} <img src={TeamPlayer} width="60" height="60" alt="Team Player" /></li>
                      <li className="skill-item">Sportsmanship: {submission.nonTechnicalSkills.sportsmanship} <img src={Sportsmanship} width="60" height="60" alt="Sportsmanship" /></li>
                    </ul>
                    <p className="comment"><strong>Non-Technical Comments:</strong> {submission.nonTechnicalcomments}</p>
                  </div>
                </AccordionTab>
              ))}
            </Accordion>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
}

export default CoachPage;