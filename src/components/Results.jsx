import { Container, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../styles/Results.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Results({ chairpersons, dhCaptains }) {
  const chairData = {
    labels: chairpersons.map(c => c.name),
    datasets: [{
      label: 'Chairperson Votes',
      data: chairpersons.map(c => c.votes),
      backgroundColor: '#4790ad',
    }],
  };

  const dhData = {
    labels: dhCaptains.map(c => c.name),
    datasets: [{
      label: 'DH Captain Votes',
      data: dhCaptains.map(c => c.votes),
      backgroundColor: '#4790ad',
    }],
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Container className={styles.results}>
      <Box className={styles.chart}>
        <Typography variant="h6" gutterBottom>Chairperson Results</Typography>
        <Bar data={chairData} options={options} />
      </Box>
      <Box className={styles.chart}>
        <Typography variant="h6" gutterBottom>DH Captain Results</Typography>
        <Bar data={dhData} options={options} />
      </Box>
    </Container>
  );
}

export default Results;