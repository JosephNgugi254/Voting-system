function CandidateList({ candidates, position, title }) {
  return (
    <div className="position-container">
      <h3 className="position-title">{title}</h3>
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="candidate-box"
        >
          <img
            src={candidate.image}
            alt={candidate.name}
            className="candidate-image"
          />
          <span className="candidate-name">{candidate.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;