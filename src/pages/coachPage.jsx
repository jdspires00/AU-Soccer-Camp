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
import Angles from '../images/angles.jpg';
import BallLinePositioning from '../images/ballLinePositioning.jpg';
import BoxNumbers from '../images/boxNumbers.png';
import Distribution from '../images/distribution.jpg';
import Diving from '../images/diving.jpg';
import Footwork from '../images/footwork.jpg';
import HighBalls from '../images/highBalls.jpg';
import ShotStopping from '../images/shotStopping.jpg';
import TippingAndPunching from '../images/tippingAndPunching.png';
import AuSoccerCamp from '../images/au-soccer-camp.png';
import jsPDF from 'jspdf';
import { Button } from 'primereact/button';
import '../styles/coachPage.css';

const technicalSkillsMap = {
  dribbling: { label: 'Dribbling', img: Dribbling },
  shooting: { label: 'Shooting', img: Shooting },
  passing: { label: 'Passing', img: Passing },
  vision: { label: 'Vision', img: Vision },
  touch: { label: 'Touch', img: Touch },
  distribution: { label: 'Distribution', img: Distribution },
  shotStopping: { label: 'Shot Stopping', img: ShotStopping },
  highBalls: { label: 'High Balls', img: HighBalls },
  tippingAndPunching: { label: 'Tipping and Punching', img: TippingAndPunching },
  angles: { label: 'Angles', img: Angles },
  ballLinePositioning: { label: 'Ball Line Positioning', img: BallLinePositioning },
  diving: { label: 'Diving', img: Diving },
  footwork: { label: 'Footwork', img: Footwork },
  boxNumbers: { label: 'Box Numbers', img: BoxNumbers }
};

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

  const generatePDF = (submission) => {
    const doc = new jsPDF();

    // Add the AU Soccer Camp image at the top center
    doc.addImage(AuSoccerCamp, 'PNG', 175, 3, 22, 22);

    // Add the title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Player Evaluation for ' + submission.selectedCamper, 10, 10);

    // Add the camper, coach, and player type on one line
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Coach Name: ' + submission.coachName, 10, 20);
    doc.text('Type of Player: ' + submission.goalkeeper, 90, 20);
    
    let yOffset = 30;

    // Add technical skills
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Skills:', 10, yOffset);
    yOffset += 8;

    const skills = Object.keys(submission.technicalSkills).map(skill => {
      return { label: technicalSkillsMap[skill].label, value: submission.technicalSkills[skill], img: technicalSkillsMap[skill].img };
    });

    skills.forEach(skill => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`${skill.label}: ${skill.value}`, 10, yOffset);
      doc.addImage(skill.img, 'JPEG', 150, yOffset - 10, 18, 18);
      yOffset += 19;
    });

    // Add technical comments
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Technical Comments:', 10, yOffset);
    yOffset += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(submission.technicalComments, 10, yOffset, { maxWidth: 180 });

    yOffset += 20;

    // Add a page break if the non-technical skills and comments don't fit on the first page
    if (yOffset > 230) {
      doc.addPage();
      yOffset = 10;
    }
    // Add non-technical skills
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Non-Technical Skills:', 10, yOffset);
    yOffset += 8;

    const nonTechSkills = [
      { label: 'Communication', value: submission.nonTechnicalSkills.communication, img: Communication },
      { label: 'Work Ethic', value: submission.nonTechnicalSkills.workEthic, img: WorkEthic },
      { label: 'Team Player', value: submission.nonTechnicalSkills.teamPlayer, img: TeamPlayer },
      { label: 'Sportsmanship', value: submission.nonTechnicalSkills.sportsmanship, img: Sportsmanship }
    ];

    nonTechSkills.forEach(skill => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`${skill.label}: ${skill.value}`, 10, yOffset);
      doc.addImage(skill.img, 'JPEG', 150, yOffset - 10, 18, 18);
      yOffset += 19;
    });

    // Add non-technical comments
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Non-Technical Comments:', 10, yOffset);
    yOffset += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(submission.nonTechnicalcomments, 10, yOffset, { maxWidth: 180 });

    // Save the PDF
    doc.save(`submission_${submission.selectedCamper.replace(/\s/g, '_')}.pdf`);
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
                  <Button onClick={() => generatePDF(submission)} label='Download PDF' />
                  <div ref={el => submissionRefs.current[submission.id] = el}>
                    <div className="submission-header">
                      <img src={AuSoccerCamp} width='100' alt="AU Soccer Camp" />
                    </div>
                    <p style={{display:'inline-block'}}><strong>Camper Name:</strong> {submission.selectedCamper}</p>
                    <p style={{display:'inline-block', marginLeft: '24px'}}><strong>Coach Name:</strong> {submission.coachName}</p>
                    <p style={{display:'inline-block', marginLeft: '24px'}}><strong>Type of Player:</strong> {submission.goalkeeper}</p>
                    <p style={{fontWeight:'bold'}}>Technical Skills:</p>
                    <ul className="skills-list">
                      {Object.keys(submission.technicalSkills).map(skill => (
                        <li className="skill-item" key={skill}>{technicalSkillsMap[skill].label}: {submission.technicalSkills[skill]} <img src={technicalSkillsMap[skill].img} width="60" height="60" alt={technicalSkillsMap[skill].label} /></li>
                      ))}
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