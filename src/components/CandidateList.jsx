import { Typography, Box } from '@mui/material';
import styles from '../styles/CandidatesList.module.css';

function CandidatesList({ chairpersons, dhCaptains, chairVote, dhVote, onCheckboxChange }) {
  return (
    <Box className={styles.candidates}>
      <Box className={styles.position}>
        <Typography variant="h6" color="primary">Chairperson</Typography>
        {chairpersons.map(candidate => (
          <Box key={candidate.id} className={styles.candidateBox}>
            <img src="/images/user-vector.jpg" alt={candidate.name} />
            <label>
              {candidate.name}
              <input
                type="checkbox"
                name="chairVote"
                value={candidate.id}
                checked={chairVote === candidate.id}
                onChange={() => onCheckboxChange('chairVote', candidate.id)}
              />
            </label>
          </Box>
        ))}
      </Box>
      <Box className={styles.position}>
        <Typography variant="h6" color="primary">DH Captain</Typography>
        {dhCaptains.map(candidate => (
          <Box key={candidate.id} className={styles.candidateBox}>
            <img src="/images/user-vector.jpg" alt={candidate.name} />
            <label>
              {candidate.name}
              <input
                type="checkbox"
                name="dhVote"
                value={candidate.id}
                checked={dhVote === candidate.id}
                onChange={() => onCheckboxChange('dhVote', candidate.id)}
              />
            </label>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CandidatesList;