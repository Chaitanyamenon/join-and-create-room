import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinCreateRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    try {
      if (roomCode.trim() === '') {
        alert('Please enter a valid room code.');
        return;
      }

      const response = await fetch(`http://localhost:1337/api/rooms/${roomCode}`);
      if (!response.ok) {
        alert('Room does not exist. Please check the code or create a new room.');
        return;
      }

      const data = await response.json();
      if (data.exists) {
        navigate(`/dashboard/${roomCode}`);
      } else {
        alert('Room does not exist. Please check the code or create a new room.');
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('An error occurred while trying to join the room.');
    }
  };

  const handleCreateRoom = async () => {
    try {
      const newRoomCode = Math.random().toString(36).substring(2, 9).toUpperCase();

      await fetch('http://localhost:1337/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomCode: newRoomCode }),
      });

      navigate(`/dashboard/${newRoomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('An error occurred while trying to create the room.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>ALGOARENA</h1>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleJoinRoom} style={styles.joinButton}>
            Join Room
          </button>
        </div>
        <button onClick={handleCreateRoom} style={styles.createButton}>
          Create New Room
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://th.bing.com/th/id/OIP.dFKTCIvk2j7rBjUQdzCJnAHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Poppins, sans-serif', 
  },
  card: {
    background: '#fff',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '2.5rem', // Slightly larger font size for emphasis
    color: '#4a004e',
    marginBottom: '20px',
    fontFamily: 'Poppins, sans-serif'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '15px', // Slightly larger padding for better usability
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif', // Explicitly set for input
  },
  joinButton: {
    width: '100%',
    padding: '15px', // Increased padding
    backgroundColor: '#4a004e',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '10px',
    fontFamily: 'Poppins, sans-serif', // Explicitly set for button
  },
  createButton: {
    width: '100%',
    padding: '15px', // Increased padding
    backgroundColor: '#00695c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', // Explicitly set for button
  },
};

export default JoinCreateRoom;
