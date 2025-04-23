import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import VotingForm from './components/VotingForm';
import Results from './components/Results';
import CandidateList from './components/CandidateList';

function App() {
  const [voters, setVoters] = useState([]);
  const [presidents, setPresidents] = useState([]);
  const [governors, setGovernors] = useState([]);
  const [womenReps, setWomenReps] = useState([]);

  useEffect(() => {
    fetchVoters();
    fetchCandidates();
  }, []);

  const fetchVoters = async () => {
    try {
      const response = await fetch('http://localhost:3000/voters');
      const data = await response.json();
      setVoters(data);
    } catch (error) {
      console.error('Error fetching voters:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const [presResponse, govResponse, wrResponse] = await Promise.all([
        fetch('http://localhost:3000/presidents'),
        fetch('http://localhost:3000/governors'),
        fetch('http://localhost:3000/womenReps'),
      ]);
      const [presData, govData, wrData] = await Promise.all([
        presResponse.json(),
        govResponse.json(),
        wrResponse.json(),
      ]);
      setPresidents(presData);
      setGovernors(govData);
      setWomenReps(wrData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const addVoter = (newVoter) => {
    setVoters([...voters, newVoter]);
  };

  const updateCandidate = (position, candidateId, updatedCandidate) => {
    if (position === 'presidents') {
      setPresidents(
        presidents.map((c) => (c.id === candidateId ? updatedCandidate : c))
      );
    } else if (position === 'governors') {
      setGovernors(
        governors.map((c) => (c.id === candidateId ? updatedCandidate : c))
      );
    } else if (position === 'womenReps') {
      setWomenReps(
        womenReps.map((c) => (c.id === candidateId ? updatedCandidate : c))
      );
    }
  };

  return (
    <div id="app-container">
      <nav id="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/vote" className="nav-link">Vote</Link>
          </li>
          <li>
            <Link to="/results" className="nav-link">Results</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/vote"
          element={
            <div id="vote-container">
              <VotingForm
                voters={voters}
                presidents={presidents}
                governors={governors}
                womenReps={womenReps}
                addVoter={addVoter}
                updateCandidate={updateCandidate}
              />
              <div id="candidates">
                <CandidateList
                  candidates={presidents}
                  position="presidents"
                  title="President"
                />
                <CandidateList
                  candidates={governors}
                  position="governors"
                  title="Governor"
                />
                <CandidateList
                  candidates={womenReps}
                  position="womenReps"
                  title="Women Representative"
                />
              </div>
            </div>
          }
        />
        <Route
          path="/results"
          element={
            <Results
              presidents={presidents}
              governors={governors}
              womenReps={womenReps}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;