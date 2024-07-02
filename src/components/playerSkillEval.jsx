import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import CoachCamperDropdown from './coachAndPlayer';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

function PlayerSkillEval() {
  const [techSkills, setTechSkills] = useState({
    dribbling: null,
    shooting: null,
    passing: null,
    vision: null,
    touch: null,
  });
  const [nonTechSkills, setNonTechSkills] = useState({
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

  const handleTechSkillChange = (e, skill) => {
    setTechSkills({ ...techSkills, [skill]: e.value });
  };

  const handleNonTechSkillChange = (e, skill) => {
    setNonTechSkills({ ...nonTechSkills, [skill]: e.value });
  };

  const handleSubmit = async () => {
    if (!selectedCamper) {
      alert('Please select a camper');
      return;
    } else if (!selectedCoach) {
      alert('Please select a coach');
      return;
    } else if (!techSkills.dribbling || !techSkills.shooting || !techSkills.passing || !techSkills.vision || !techSkills.touch || !nonTechSkills.communication || !nonTechSkills.workEthic || !nonTechSkills.teamPlayer || !nonTechSkills.sportsmanship) {
      alert('Please fill in all skill levels');
      return;
    } else if (!comments || !techComments) {
      alert('Please fill in all comments');
      return;
    } else {
      console.log('Submitting evaluation for:', selectedCamper);

      const submittableSelectedCamper = selectedCamper.replace(/ /g, '');
      
      //console log the url we are sending to in firebase
      console.log('collection(db, PlayerSkillEvaluations)', doc(db, 'PlayerSkillEvaluations', 'submissions'))
      const submissions = doc(db, 'PlayerSkillEvaluations', 'submissions');

      await updateDoc(submissions, {
        selectedCamper: selectedCamper,
        coachName: selectedCoach,
        goalkeeper: isGoalie ? 'Goalie' : 'Field Player',
        techSkills: techSkills,
        techComments: techComments,
        nonTechSkills: nonTechSkills,
        comments: comments,
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        //refresh the page
        window.location.reload();
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
                onChange={(e) => handleTechSkillChange(e, 'dribbling')}
                checked={techSkills.dribbling === level}
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
                onChange={(e) => handleTechSkillChange(e, 'shooting')}
                checked={techSkills.shooting === level}
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
                onChange={(e) => handleTechSkillChange(e, 'passing')}
                checked={techSkills.passing === level}
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
                onChange={(e) => handleTechSkillChange(e, 'vision')}
                checked={techSkills.vision === level}
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
                onChange={(e) => handleTechSkillChange(e, 'touch')}
                checked={techSkills.touch === level}
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
                onChange={(e) => handleNonTechSkillChange(e, 'communication')}
                checked={nonTechSkills.communication === level}
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
                onChange={(e) => handleNonTechSkillChange(e, 'workEthic')}
                checked={nonTechSkills.workEthic === level}
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
                onChange={(e) => handleNonTechSkillChange(e, 'teamPlayer')}
                checked={nonTechSkills.teamPlayer === level}
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
                onChange={(e) => handleNonTechSkillChange(e, 'sportsmanship')}
                checked={nonTechSkills.sportsmanship === level}
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