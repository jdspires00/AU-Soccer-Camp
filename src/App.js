import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import PlayerSkillEval from './components/playerSkillEval';
import CoachPage from './pages/coachPage';
import Footer from './components/footer';
import './styles/projStyles.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<PlayerSkillEval />} />
            <Route path="/coachPage" element={<CoachPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
};

export default App;