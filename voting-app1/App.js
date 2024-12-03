import React, { useState } from 'react';
import './App.css'; // Add your CSS for styling

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [votes, setVotes] = useState({ candidate1: 0, candidate2: 0, candidate3: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [isVotingComplete, setIsVotingComplete] = useState(false);
  const [winner, setWinner] = useState("");

  const handleVote = (candidate) => {
    if (totalVotes < 5) {
      setVotes((prevVotes) => {
        return { ...prevVotes, [candidate]: prevVotes[candidate] + 1 };
      });
      setTotalVotes((prevTotalVotes) => prevTotalVotes + 1);
      if (totalVotes + 1 === 5) {
        setIsVotingComplete(true);
        determineWinner();
      }
    }
  };

  const determineWinner = () => {
    const maxVotes = Math.max(votes.candidate1, votes.candidate2, votes.candidate3);
    if (votes.candidate1 === maxVotes) {
      setWinner("Candidate 1");
    } else if (votes.candidate2 === maxVotes) {
      setWinner("Candidate 2");
    } else if (votes.candidate3 === maxVotes) {
      setWinner("Candidate 3");
    }
  };

  const chartData = {
    labels: ['Candidate 1', 'Candidate 2', 'Candidate 3'],
    datasets: [
      {
        label: 'Votes',
        data: [votes.candidate1, votes.candidate2, votes.candidate3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Voting Application</h1>
      {!isVotingComplete ? (
        <div>
          {!hasVoted ? (
            <button className="vote-button" onClick={() => setHasVoted(true)}>
              Vote
            </button>
          ) : (
            <div className="vote-options">
              <h3>Choose your candidate:</h3>
              <button onClick={() => handleVote('candidate1')}>Vote for Candidate 1</button>
              <button onClick={() => handleVote('candidate2')}>Vote for Candidate 2</button>
              <button onClick={() => handleVote('candidate3')}>Vote for Candidate 3</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Voting Complete!</h2>
          <h3>Winner: {winner}</h3>
          <div className="chart-container">
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
