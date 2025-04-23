import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Vote</Link>
      <Link to="/results">Results</Link>
    </nav>
  );
}

function VotingForm() {
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes"));
    if (storedVotes) setVotes(storedVotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
  };

  return (
    <div className="voting-form">
      <h2>Cast Your Vote</h2>
      <button onClick={() => handleVote("optionA")}>Vote for Option A</button>
      <button onClick={() => handleVote("optionB")}>Vote for Option B</button>
    </div>
  );
}

function Results() {
  const [votes, setVotes] = useState({ optionA: 0, optionB: 0 });

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes"));
    if (storedVotes) setVotes(storedVotes);
  }, []);

  return (
    <div className="results">
      <h2>Voting Results</h2>
      <p>Option A: {votes.optionA}</p>
      <p>Option B: {votes.optionB}</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<VotingForm />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
