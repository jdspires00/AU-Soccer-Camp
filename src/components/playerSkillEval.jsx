import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import CoachCamperDropdown from './coachAndPlayer';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function PlayerSkillEval() {
  const [technicalSkills, setTechnicalSkills] = useState({
    dribbling: null,
    shooting: null,
    passing: null,
    vision: null,
    touch: null,
  });
  const [nonTechnicalSkills, setNonTechnicalSkills] = useState({
    communication: null,
    workEthic: null,
    teamPlayer: null,
    sportsmanship: null,
  });

  const [nonTechnicalComments, setNonTechnicalComments] = useState('');
  const [technicalComments, setTechnicalComments] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [isGoalie, setIsGoalie] = useState(false);

  const handleTechSkillChange = (e, skill) => {
    setTechnicalSkills({ ...technicalSkills, [skill]: e.value });
  };

  const handleNonTechSkillChange = (e, skill) => {
    setNonTechnicalSkills({ ...nonTechnicalSkills, [skill]: e.value });
  };

  const submittableSelectedCamper = selectedCamper ? selectedCamper.replace(/\s/g, '') : null;

  const handleSubmit = async () => {
    if (!selectedCamper) {
      alert('Please select a camper');
      return;
    } else if (!selectedCoach) {
      alert('Please select a coach');
      return;
    } else if (!technicalSkills.dribbling || !technicalSkills.shooting || !technicalSkills.passing || !technicalSkills.vision || !technicalSkills.touch || !nonTechnicalSkills.communication || !nonTechnicalSkills.workEthic || !nonTechnicalSkills.teamPlayer || !nonTechnicalSkills.sportsmanship) {
      alert('Please fill in all skill levels');
      return;
    } else if (!nonTechnicalComments || !technicalComments) {
      alert('Please fill in all comments');
      return;
    } else {
      try {
        const docRef = doc(db, "submissions", `PlayerSkillEvaluationFor${submittableSelectedCamper}`);

        await setDoc(docRef, {
          selectedCamper: selectedCamper,
          coachName: selectedCoach.coach,
          goalkeeper: isGoalie ? 'Goalie' : 'Field Player',
          technicalSkills: technicalSkills,
          technicalComments: technicalComments,
          nonTechnicalSkills: nonTechnicalSkills,
          nonTechnicalcomments: nonTechnicalComments,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      //refresh the page
      window.location.reload();
    }
  };

  const handleSaveProgress = async () => {
    if (!selectedCoach) {
      alert('Please select a coach');
      return;
    } else if (!selectedCamper) {
      alert('Please select a camper');
      return;
    } else {
      try {
        const docRef = doc(db, "InProgressForms", `InProgressSubmssionFor${submittableSelectedCamper}`);

        await setDoc(docRef, {
          selectedCamper: selectedCamper,
          coachName: selectedCoach.coach,
          goalkeeper: isGoalie ? 'Goalie' : 'Field Player',
          technicalSkills: technicalSkills,
          technicalComments: technicalComments,
          nonTechnicalSkills: nonTechnicalSkills,
          nonTechnicalcomments: nonTechnicalComments,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      //refresh the page
      window.location.reload();
    }
  };

  const fetchInProgressSubmission = async (camper) => {
    if (!camper) return;

    const docRef = doc(db, "InProgressForms", `InProgressSubmssionFor${camper.replace(/\s/g, '')}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setSelectedCoach({ coach: data.coachName });
      setIsGoalie(data.goalkeeper === 'Goalie');
      setTechnicalSkills(data.technicalSkills);
      setTechnicalComments(data.technicalComments);
      setNonTechnicalSkills(data.nonTechnicalSkills);
      setNonTechnicalComments(data.nonTechnicalcomments);
    } else {
      // Clear the form if no in-progress submission is found
      setTechnicalSkills({
        dribbling: null,
        shooting: null,
        passing: null,
        vision: null,
        touch: null,
      });
      setNonTechnicalSkills({
        communication: null,
        workEthic: null,
        teamPlayer: null,
        sportsmanship: null,
      });
      setTechnicalComments('');
      setNonTechnicalComments('');
    }
  };

  useEffect(() => {
    fetchInProgressSubmission(selectedCamper);
  }, [selectedCamper]);

  const skillLevels = ["1 - Needs Attention", "2 - Average", "3 - Good", "4 - Very Good", "5 - Outstanding"];

  return (
    <div>
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button 
          label="Coach Fridley/Coach Derrick" 
          onClick={() => window.location.hash = '/coachPage'}
        />
      </div>
      <div>
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
                checked={technicalSkills.dribbling === level}
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
                checked={technicalSkills.shooting === level}
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
                checked={technicalSkills.passing === level}
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
                checked={technicalSkills.vision === level}
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
                checked={technicalSkills.touch === level}
              />
              <label htmlFor={`touch-${level}`}>{level}</label>
            </div>
          ))}
        </div>
        <div className='commentField'>
          <h4 style={{textAlign:'center'}}>Recommendations from the coach on what to work on at home to improve your Technical Skills</h4>
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px'}}>
            <InputTextarea
              value={technicalComments}
              onChange={(e) => setTechnicalComments(e.target.value)}
              rows={5}
              cols={30}
              style={{alignContent:'center'}}
            />
          </div>
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
                checked={nonTechnicalSkills.communication === level}
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
                checked={nonTechnicalSkills.workEthic === level}
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
                checked={nonTechnicalSkills.teamPlayer === level}
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
                checked={nonTechnicalSkills.sportsmanship === level}
              />
              <label htmlFor={`sportsmanship-${level}`}>{level}</label>
            </div>
          ))}
        </div>
      </div>
      <div className='commentField'>
        <h4 style={{textAlign:'center'}}>Recommendations from the coach on what to work on at home to improve your Non-Technical Skills</h4>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <InputTextarea
            value={nonTechnicalComments}
            onChange={(e) => setNonTechnicalComments(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
      </div>
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button label="Submit" onClick={handleSubmit} style={{ marginTop: '16px', marginBottom:'16px', marginRight:"24px", marginLeft:"-8px"}} />
        <Button label="Save Progress" onClick={handleSaveProgress} style={{ marginTop: '16px', marginBottom:'16px'}} />
      </div>
    </div>
  );
};

export default PlayerSkillEval;