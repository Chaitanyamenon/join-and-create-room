import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.status === 'ok' && data.user) {
        localStorage.setItem('token', data.user);
        alert('Login successful');
        navigate('/room');
      } else {
        alert(data.message || 'Please check your username and password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>LOGIN</h1>
        <form onSubmit={loginUser} style={styles.form}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            style={styles.input}
          /><br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={styles.input}
          /><br />
          <input type="submit" value="Login" style={styles.button} />
        </form>
        <p style={styles.signupText}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={styles.signupLink}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://th.bing.com/th/id/OIP.dFKTCIvk2j7rBjUQdzCJnAHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")', // URL to your background image
    backgroundSize: 'cover', // Ensure the image covers the entire background
    backgroundPosition: 'center center', // Center the background image
    fontFamily: 'Poppins, sans-serif',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for the form
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#9c27b0',
    fontFamily: 'Sacramento, cursive',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    padding: '12px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    border: '1px solid #ba68c8',
    backgroundColor: '#f3e5f5',
    fontFamily: 'Poppins, sans-serif',
  },
  button: {
    padding: '12px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ab47bc',
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  signupText: {
    marginTop: '20px',
    fontSize: '1rem',
    color: '#9c27b0',
    fontFamily: 'Lato, sans-serif',
  },
  signupLink: {
    color: '#ab47bc',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold',
    fontFamily: 'Quicksand, sans-serif',
  },
};

export default App;