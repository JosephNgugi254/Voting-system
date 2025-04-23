import { useEffect, useRef } from 'react';
 import Chart from 'chart.js/auto';

function Results({ presidents, governors, womenReps }) {
  const presidentChartRef = useRef(null);
  const governorChartRef = useRef(null);
  const womenRepChartRef = useRef(null);
  const presidentChartInstance = useRef(null);
  const governorChartInstance = useRef(null);
  const womenRepChartInstance = useRef(null);

  useEffect(() => {
    if (presidentChartInstance.current) {
      presidentChartInstance.current.destroy();
    }
    if (governorChartInstance.current) {
      governorChartInstance.current.destroy();
    }
    if (womenRepChartInstance.current) {
      womenRepChartInstance.current.destroy();
    }

    presidentChartInstance.current = new Chart(presidentChartRef.current, {
      type: 'bar',
      data: {
        labels: presidents.map((c) => c.name),
        datasets: [
          {
            label: 'President Votes',
            data: presidents.map((c) => c.votes),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    governorChartInstance.current = new Chart(governorChartRef.current, {
      type: 'bar',
      data: {
        labels: governors.map((c) => c.name),
        datasets: [
          {
            label: 'Governor Votes',
            data: governors.map((c) => c.votes),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    womenRepChartInstance.current = new Chart(womenRepChartRef.current, {
      type: 'bar',
      data: {
        labels: womenReps.map((c) => c.name),
        datasets: [
          {
            label: 'Women Representative Votes',
            data: womenReps.map((c) => c.votes),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (presidentChartInstance.current) {
        presidentChartInstance.current.destroy();
      }
      if (governorChartInstance.current) {
        governorChartInstance.current.destroy();
      }
      if (womenRepChartInstance.current) {
        womenRepChartInstance.current.destroy();
      }
    };
  }, [presidents, governors, womenReps]);

  return (
    <div id="results-container">
      <h2 className="results-title">Election Results</h2>
      <div id="charts">
        <div className="chart-box">
          <h3 className="chart-title">President</h3>
          <canvas ref={presidentChartRef}></canvas>
        </div>
        <div className="chart-box">
          <h3 className="chart-title">Governor</h3>
          <canvas ref={governorChartRef}></canvas>
        </div>
        <div className="chart-box">
          <h3 className="chart-title">Women Representative</h3>
          <canvas ref={womenRepChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Results;