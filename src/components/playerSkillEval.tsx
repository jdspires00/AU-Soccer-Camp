import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import CoachCamperDropdown from './coachAndPlayer';

//Need to get the Coach, Player, and is Goalie form the coach camper dropdown


const PlayerSkillEval = () => {
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

  // Add new states for coach, camper, and goalie
  const [selectedCoach, setSelectedCoach] = useState<any>(null);
  const [selectedCamper, setSelectedCamper] = useState<string | null>(null);
  const [isGoalie, setIsGoalie] = useState(false);


  const handleSkillChange = (e: any, skill: any) => {
    setSkills({ ...skills, [skill]: e.value });
  };

  const handleSubmit = () => {
    // You would handle form submission here
    if (!skills.dribbling || !skills.shooting || !skills.passing || !skills.vision || !skills.touch || !skills.communication || !skills.workEthic || !skills.teamPlayer || !skills.sportsmanship) {
      alert('Please fill in all skill levels');
      return;
    } else if (!comments || !techComments) {
      alert('Please fill in all comments');
      return;
    } else {
      if(isGoalie == true) {
        let Goalkeeper = 'Goalkeeper';

      } else{
      console.log(skills, comments, techComments);
      }
    }
  };

  const skillLevels = ["1 - Needs Attention", "2 - Average", "3 - Good", "4 - Very Good", "5 - Outstanding"]; // Skill levels from 1 to 5

  return (
    <div>
      <CoachCamperDropdown
        setSelectedCoach={setSelectedCoach}
        setSelectedCamper={setSelectedCamper}
        setIsGoalie={setIsGoalie}
      />
      <h3 className='separator'>Player Technical Skill Evaluation</h3>
      <div className="skill-evaluation">
        <div className="skill">
          <h4>DRIBBLING</h4>
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
          <h4>SHOOTING</h4>
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
          <h4>PASSING</h4>
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
          <h4>VISION</h4>
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
          <h4>TOUCH</h4>
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
          <h4>Recommendations from the coach on what to work on at home to improve your Technical Skills</h4>
          <InputTextarea
            value={techComments}
            onChange={(e) => setTechComments(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
      </div>
      <h3 className='separator'>Non-Technical Skill Evaluation</h3>
      <div className="skill-evaluation">
        <div className="skill">
          <h4>COMMUNICATION</h4>
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
          <h4>WORK ETHIC</h4>
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
          <h4>TEAM PLAYER</h4>
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
          <h4>SPORTSMANSHIP</h4>
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
          <h4>Recommendations from the coach on what to work on at home to improve your Non-Technical Skills</h4>
          <InputTextarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default PlayerSkillEval;
