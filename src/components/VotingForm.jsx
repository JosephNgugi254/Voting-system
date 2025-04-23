import { useState } from 'react';

function VotingForm({ voters, presidents, governors, womenReps, addVoter, updateCandidate }) {
  const [voterName, setVoterName] = useState('');
  const [voterId, setVoterId] = useState('');
  const [presidentVote, setPresidentVote] = useState('');
  const [governorVote, setGovernorVote] = useState('');
  const [womenRepVote, setWomenRepVote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!voterName || !voterId) {
      alert('Please enter voter name and ID.');
      return;
    }

    if (!presidentVote || !governorVote || !womenRepVote) {
      alert('Please select one candidate for each position.');
      return;
    }

    if (voters.some((voter) => voter.voterId === voterId)) {
      alert('You have already voted.');
      return;
    }

    try {
      // Post new voter
      const voterResponse = await fetch('http://localhost:3000/voters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: voterName, voterId }),
      });
      const newVoter = await voterResponse.json();
      addVoter(newVoter);

      // Update votes
      const positions = [
        { position: 'presidents', candidateId: presidentVote },
        { position: 'governors', candidateId: governorVote },
        { position: 'womenReps', candidateId: womenRepVote },
      ];

      for (const { position, candidateId } of positions) {
        const candidateResponse = await fetch(
          `http://localhost:3000/${position}/${candidateId}`
        );
        const candidate = await candidateResponse.json();
        const updatedCandidate = { ...candidate, votes: candidate.votes + 1 };

        await fetch(`http://localhost:3000/${position}/${candidateId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ votes: candidate.votes + 1 }),
        });

        updateCandidate(position, candidateId, updatedCandidate);
      }

      // Reset form
      setVoterName('');
      setVoterId('');
      setPresidentVote('');
      setGovernorVote('');
      setWomenRepVote('');
      alert('Vote submitted successfully!');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Error submitting vote. Please try again.');
    }
  };

  return (
    <div id="voting-form">
      <h2 className="form-title">Cast Your Vote</h2>
      <div className="form-group">
        <label htmlFor="voter-name" className="form-label">Voter Name:</label>
        <input
          type="text"
          id="voter-name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          className="form-input"
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="voter-id" className="form-label">Voter ID:</label>
        <input
          type="text"
          id="voter-id"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          className="form-input"
          placeholder="Enter your voter ID"
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">President:</label>
        <select
          value={presidentVote}
          onChange={(e) => setPresidentVote(e.target.value)}
          className="form-select"
        >
          <option value="">Select candidate</option>
          {presidents.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Governor:</label>
        <select
          value={governorVote}
          onChange={(e) => setGovernorVote(e.target.value)}
          className="form-select"
        >
          <option value="">Select candidate</option>
          {governors.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label className="form-label">Women Representative:</label>
        <select
          value={womenRepVote}
          onChange={(e) => setWomenRepVote(e.target.value)}
          className="form-select"
        >
          <option value="">Select candidate</option>
          {womenReps.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit Vote
      </button>
    </div>
  );
}

export default VotingForm;