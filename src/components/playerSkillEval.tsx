import React, { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

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
    // Add more skills as needed
  });

  const [comments, setComments] = useState('');

  const handleSkillChange = (e: any, skill: any) => {
    setSkills({ ...skills, [skill]: e.value });
  };

  const handleSubmit = () => {
    // You would handle form submission here
    console.log(skills, comments);
  };

  const skillLevels = ["1 - Needs Attention", "2 - Average", "3 - Good", "4 - Very Good", "5 - Outstanding"]; // Skill levels from 1 to 5

  return (
    <div>
      <h3>Non-Technical Skill Evaluation</h3>
      <div className="skill-evaluation">
        <div className="skill">
          <h4>COMMUNICATION</h4>
          {skillLevels.map((level) => (
            <div key={level} className="p-field-radiobutton ">
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
        {/* Repeat for other skills */}
      </div>

      <h4>Comments</h4>
      <InputTextarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        rows={5}
        cols={30}
      />

      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default PlayerSkillEval;
