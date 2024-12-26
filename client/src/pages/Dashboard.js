import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  // Extract room number from the URL
  const { roomId } = useParams(); // This will extract the room number from the URL

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwt.decode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setUserName(decodedToken.name);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRoomLogout = () => {
    navigate('/room');
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div style={styles.outerContainer}>
      <header style={styles.header}>
        <h1 style={styles.username}>Hello, {userName}</h1>
        <div style={styles.roomDetails}>
          <h2 style={styles.roomNumber}>Room: {roomId}</h2> {/* Display the room number from URL */}
          <div style={styles.buttonsContainer}>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
            <button onClick={handleRoomLogout} style={styles.logoutButton}>Logout Room</button>
          </div>
        </div>
      </header>

      <main style={styles.content}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          placeholder="Start coding here..."
          style={styles.codeEditor}
        />
      </main>
    </div>
  );
};

const styles = {
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://th.bing.com/th/id/OIP.dFKTCIvk2j7rBjUQdzCJnAHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")', // URL to your background image
    backgroundSize: 'cover', // Ensure the image covers the entire background
    backgroundPosition: 'center center', // Center the background image
    padding: '20px',
    backgroundColor: '#f8f1f9',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '20px',
  },
  username: {
    fontSize: '2rem',
    color: '#9c27b0',
    fontFamily: 'Sacramento, cursive',
  },
  roomDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  roomNumber: {
    fontSize: '1.2rem',
    color: '#9c27b0',
    fontFamily: 'Sacramento, cursive',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  logoutButton: {
    padding: '8px 12px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#9c27b0',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
  },
  codeEditor: {
    width: '90%',
    height: '80vh',
    padding: '15px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontFamily: 'Courier New, monospace',
    backgroundColor: '#fff',
    resize: 'none',
  },
};

export default Dashboard;
