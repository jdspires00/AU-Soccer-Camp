import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import CoachCamperDropdown from './coachAndPlayer';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function PlayerSkillEval() {
  const [skills, setSkills] = useState({
    dribbling: null,
    shooting: null,
    passing: null,
    vision: null,
    touch: null,
    communication: null,
    workEthic: null,
    teamPlayer: null,
    sportsmanship: null,
  });

  const [comments, setComments] = useState('');
  const [techComments, setTechComments] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [isGoalie, setIsGoalie] = useState(false);

  const handleSkillChange = (e, skill) => {
    setSkills({ ...skills, [skill]: e.value });
  };

  const handleSubmit = async () => {
    if (!skills.dribbling || !skills.shooting || !skills.passing || !skills.vision || !skills.touch || !skills.communication || !skills.workEthic || !skills.teamPlayer || !skills.sportsmanship) {
      alert('Please fill in all skill levels');
      return;
    } else if (!comments || !techComments) {
      alert('Please fill in all comments');
      return;
    } else {
      console.log('Submitting evaluation for:', selectedCamper);
      try {
        console.log('Submitting evaluation for camper in try:', selectedCamper);
        const submission = {
          selectedCamper,
          coachName: selectedCoach ? selectedCoach.coach : null,
          goalkeeper: isGoalie ? 'Goalkeeper' : 'Field Player',
          skills,
          comments,
          techComments,
        };
        
        console.log('Preparing to submit:', submission);
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        });
        console.log("Document written with ID: ", docRef.id);
        await addDoc(collection(db, 'PlayerSkillEvaluations'), submission);
        console.log('Submission successful');
        alert('Submission successful!');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  const skillLevels = ["1 - Needs Attention", "2 - Average", "3 - Good", "4 - Very Good", "5 - Outstanding"];

  return (
    <div>
      <div style={{alignItems:'center'}}>
        <Button 
          label="Coach Fridley/Coach Derrick" 
          style={{left:"85%"}}
          onClick={() => window.location.href = '/coachPage'}
        />
        <div style={{textAlign:'center'}}>
          <CoachCamperDropdown
            setSelectCoach={setSelectedCoach}
            setSelectCamper={setSelectedCamper}
          />
        </div>
        <div style={{textAlign:'center'}}>
          <h3>Is the player a Goalie?</h3>
          <RadioButton
            inputId="goalie-yes"
            name="goalie"
            value={true}
            onChange={(e) => setIsGoalie(e.value)}
            checked={isGoalie === true}
            className='ml-8'
          />
          <label htmlFor="goalie-yes" className='yes-label'>Yes</label>
          <RadioButton
            inputId="goalie-no"
            name="goalie"
            value={false}
            onChange={(e) => setIsGoalie(e.value)}
            checked={isGoalie === false}
            className='ml-8'
          />
          <label htmlFor="goalie-no" className="no-label">No</label>
        </div>
      </div>
      <h3 className='separator' style={{textAlign:'center'}}>Player Technical Skill Evaluation</h3>
      <div className="skill-evaluation">
        <div className="skill">
          <h4 style={{textAlign:'center'}}>DRIBBLING</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`dribbling-${level}`}
                name="dribbling"
                value={level}
                onChange={(e) => handleSkillChange(e, 'dribbling')}
                checked={skills.dribbling === level}
              />
              <label htmlFor={`dribbling-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>SHOOTING</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`shooting-${level}`}
                name="shooting"
                value={level}
                onChange={(e) => handleSkillChange(e, 'shooting')}
                checked={skills.shooting === level}
              />
              <label htmlFor={`shooting-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>PASSING</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`passing-${level}`}
                name="passing"
                value={level}
                onChange={(e) => handleSkillChange(e, 'passing')}
                checked={skills.passing === level}
              />
              <label htmlFor={`passing-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>VISION</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`vision-${level}`}
                name="vision"
                value={level}
                onChange={(e) => handleSkillChange(e, 'vision')}
                checked={skills.vision === level}
              />
              <label htmlFor={`vision-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>TOUCH</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`touch-${level}`}
                name="touch"
                value={level}
                onChange={(e) => handleSkillChange(e, 'touch')}
                checked={skills.touch === level}
              />
              <label htmlFor={`touch-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className='commentField'>
          <h4 style={{textAlign:'center'}}>Recommendations from the coach on what to work on at home to improve your Technical Skills</h4>
          <InputTextarea
            value={techComments}
            onChange={(e) => setTechComments(e.target.value)}
            rows={5}
            cols={30}
            style={{marginLeft:'41%'}}
          />
        </div>
      </div>
      <h3 className='separator' style={{textAlign:'center'}}>Non-Technical Skill Evaluation</h3>
      <div className="skill-evaluation">
        <div className="skill">
          <h4 style={{textAlign:'center'}}>COMMUNICATION</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`communication-${level}`}
                name="communication"
                value={level}
                onChange={(e) => handleSkillChange(e, 'communication')}
                checked={skills.communication === level}
              />
              <label htmlFor={`communication-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>WORK ETHIC</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`workEthic-${level}`}
                name="workEthic"
                value={level}
                onChange={(e) => handleSkillChange(e, 'workEthic')}
                checked={skills.workEthic === level}
              />
              <label htmlFor={`workEthic-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>TEAM PLAYER</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`teamPlayer-${level}`}
                name="teamPlayer"
                value={level}
                onChange={(e) => handleSkillChange(e, 'teamPlayer')}
                checked={skills.teamPlayer === level}
              />
              <label htmlFor={`teamPlayer-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className="skill">
          <h4 style={{textAlign:'center'}}>SPORTSMANSHIP</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton radList">
              <RadioButton
                inputId={`sportsmanship-${level}`}
                name="sportsmanship"
                value={level}
                onChange={(e) => handleSkillChange(e, 'sportsmanship')}
                checked={skills.sportsmanship === level}
              />
              <label htmlFor={`sportsmanship-${level}`}>{level}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='commentField'>
          <h4 style={{textAlign:'center'}}>Recommendations from the coach on what to work on at home to improve your Non-Technical Skills</h4>
          <InputTextarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            cols={30}
            style={{marginLeft:'41%'}}
          />
        </div>
      <Button label="Submit" onClick={handleSubmit} style={{marginLeft: '47%'}} />
    </div>
  );
};

export default PlayerSkillEval;