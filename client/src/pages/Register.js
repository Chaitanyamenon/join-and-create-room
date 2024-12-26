import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('') // State to store error messages
  const navigate = useNavigate()

  async function registerUser(event) {
    event.preventDefault()

    // Validate if fields are filled
    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await response.json()

    if (data.status === 'error') {
      // Show error if the user already exists
      setError(data.message || 'User already exists. Try logging in.')
    } else if (data.status === 'ok') {
      // Clear error and navigate to login
      setError('')
      navigate('/login')
    }
  }

  return (
    <div style={styles.outerContainer}>
      <div style={styles.formContainer}>
        <h1 style={styles.title}>REGISTER</h1>
        <form onSubmit={registerUser} style={styles.form}>
          {error && <p style={styles.errorText}>{error}</p>} {/* Display error messages */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            style={styles.input}
          /><br />
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
          <input type="submit" value="Register" style={styles.button} />
        </form>
        <p style={styles.loginText}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={styles.loginLink}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://th.bing.com/th/id/OIP.dFKTCIvk2j7rBjUQdzCJnAHaEK?w=296&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  errorText: {
    color: 'black',
    fontSize: '0.9rem',
    marginBottom: '10px',
  },
  loginText: {
    marginTop: '15px',
    fontSize: '1rem',
    color: '#6a1b9a',
  },
  loginLink: {
    color: '#ab47bc',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
}

export default App
