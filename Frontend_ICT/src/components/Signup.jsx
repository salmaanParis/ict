import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const checkExitExamPass = async (email) => {
    try {
      const response = await axios.post('http://localhost:3001/check-exit-exam', { email });
      return response.data.passed;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required');
      return;
    }

    if (!email || !validateEmail(email)) {
      setError('A valid email is required');
      return;
    }

    if (!password || !validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!phone || !validatePhone(phone)) {
      setError('A valid phone number is required');
      return;
    }

    if (!batch) {
      setError('Batch name is required');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    const passedExitExam = await checkExitExamPass(email);
    if (!passedExitExam) {
      setError('Cannot register: failed in exit exam');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3001/Signup', { name, email, password, phone, batch });
      console.log(result);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError('Signup failed. Please try again.');
    }

    // Reset form fields and error
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setBatch('');
    setAgreeTerms(false);
    setError('');
  };

  return (
    <div className="signup-container">
      <style jsx="true">{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
        }
        .signup-box {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }
        .signup-box h2 {
          margin-bottom: 10px;
          font-size: 24px;
        }
        .signup-box p {
          margin-bottom: 20px;
          color: #666;
        }
        .signup-box input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .signup-box button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .signup-box button:hover {
          background-color: #0056b3;
        }
        .signup-box .link {
          display: block;
          text-align: center;
          margin-top: 10px;
          color: #007bff;
          text-decoration: none;
          cursor: pointer;
        }
        .signup-box .link:hover {
          text-decoration: underline;
        }
        .signup-box .terms {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .signup-box .terms input {
          margin-right: 10px;
        }
        .signup-box .terms span {
          font-size: 14px;
        }
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          background-color: #ccc;
          border-radius: 3px;
        }
      `}</style>
      <div className="signup-box">
        <h2>Student Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Batch Name"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
          />
          <div className="terms">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <span className="checkmark"></span>
            </label>
            <span className="terms-text">Agree to our terms and conditions</span>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Continue</button>
        </form>
        <Link to="/login" className="link">Already registered? Login</Link>
      </div>
    </div>
  );
};

export default Signup;






