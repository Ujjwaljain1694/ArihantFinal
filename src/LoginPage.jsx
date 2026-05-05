import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import banner from './left-banner.svg';
import logo from './logo-arihant-capital.png';
import smartphone from './smartphone.svg';

const LoginPage = () => {
  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  
  // Resend timer states
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // Start resend timer
  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(120);
    
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // STEP 1: Branch Code Verification API Call
  const handleBranchCodeSubmit = async (e) => {
    e.preventDefault();
    
    // Handle empty branch code
    if (!branchCode.trim()) {
      setError('Please enter your branch code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'https://connectarihant.onrender.com/api/auth/login',
        {
          manager_id: branchCode.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Branch Code API Response:', response.data);
      
      // STEP 2: Show OTP card on success
      setShowOTP(true);
      startResendTimer();
      
    } catch (error) {
      console.error('Branch Code API Error:', error);
      
      // STEP 5: Error handling
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || 'Invalid branch code. Please try again.');
      } else if (error.request) {
        // Network error
        setError('Network error. Please check your connection and try again.');
      } else {
        // Other error
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Simple OTP functions (without Firebase)
  const sendOTP = (mobile) => {
    setLoading(true);
    setError('');
    
    console.log(' Simulating OTP to:', mobile);
    
    // Simulate OTP sending
    setTimeout(() => {
      setShowOTP(true);
      setLoading(false);
      console.log(' OTP simulated to:', mobile);
      alert('OTP sent! (For demo: 123456)');
      // Start timer when OTP is sent
      startResendTimer();
    }, 2000);
  };

  const verifyOTP = () => {
    setLoading(true);
    setOTPError('');
    
    // Simple OTP verification
    if (otp === '123456') {
      console.log('✅ OTP verified successfully');
      alert('Login Successful! 🎉 Welcome to Arihant Capital!');
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      setOTPError('Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  // STEP 3: OTP Verification API Call
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    // Handle empty OTP
    if (!otp.trim()) {
      setOTPError('Please enter your OTP');
      return;
    }
    
    setLoading(true);
    setOTPError('');
    
    try {
      const response = await axios.post(
        'https://connectarihant.onrender.com/api/auth/verify-otp',
        {
          manager_id: branchCode.trim(),
          otp: otp.trim()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('OTP Verification API Response:', response.data);
      
      // STEP 4: Store token and show main content
      const authToken = response.data.token || response.data.access_token;
      if (authToken) {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('branchCode', branchCode.trim());
        localStorage.setItem('isLoggedIn', 'true');
        setToken(authToken);
        setIsAuthenticated(true);
        setShowOTP(false);
        console.log('Login Successful! Token stored.');
      } else {
        setOTPError('Login successful but no token received. Please try again.');
      }
      
    } catch (error) {
      console.error('OTP Verification API Error:', error);
      
      // STEP 5: Error handling
      if (error.response) {
        // Server responded with error status
        setOTPError(error.response.data.message || 'Invalid OTP. Please try again.');
      } else if (error.request) {
        // Network error
        setOTPError('Network error. Please check your connection and try again.');
      } else {
        // Other error
        setOTPError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const resendOTP = () => {
    if (!canResend) return;
    
    console.log('📱 Resending OTP...');
    alert('OTP resent! (For demo: 123456)');
    
    // Restart timer
    startResendTimer();
  };

  const handleBranchSubmit = (e) => {
    e.preventDefault();
    
    if (!branchCode.trim()) {
      setError('Branch code is required');
      return;
    }
    
    const formatted = branchCode.replace(/\s+/g, '').toUpperCase();
    
    if (formatted === "MP21") {
      setError('');
      console.log('Branch Code Verified:', formatted);
      
      // Show loader
      setShowLoader(true);
      
      // Send OTP to phone number
      sendOTP("+918349509911");
      
      // Switch to OTP card after starting OTP send
      setTimeout(() => {
        setShowLoader(false);
        setShowOTP(true);
      }, 2000); // 2 seconds
    } else { 
      setError('Invalid branch code');
    }
  };

  
  return (
    <div className="login-container">
      {/* Loading Overlay */}
      {showLoader && (
        <div className="loading-overlay">
          <div className="loader-content">
            <div className="dots-container">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
              <div className="dot dot-4"></div>
            </div>
            <p className="loader-text">Good things take time... Hold on...</p>
          </div>
        </div>
      )}
      
      {/* reCAPTCHA Container (invisible) */}
      <div id="recaptcha-container"></div>
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="Arihant Capital" className="header-logo" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Side - Illustration */}
        <section className="illustration-section">
          <div className="illustration-container">
            <img
              src={banner}
              alt="Fintech analytics banner"
              className="analytics-illustration"
            />
          </div>
        </section>

        {/* Right Side - Login Card */}
        <section className="login-section">
          {isAuthenticated ? (
            // STEP 4: Show main content after successful authentication
            <div className="login-card success-card">
              <div className="card-header">
                <h2 className="card-title">Welcome to Arihant Capital</h2>
                <p className="card-subtitle">Login Successful! Redirecting to dashboard...</p>
              </div>
              
              <div className="success-content">
                <div className="success-icon">â</div>
                <p className="success-message">
                  You have successfully logged in with Branch Code: <strong>{branchCode}</strong>
                </p>
                <p className="token-info">
                  Authentication token stored in localStorage.
                </p>
              </div>
              
              <div className="card-footer">
                <button 
                  className="submit-button" 
                  onClick={() => window.location.href = '/dashboard'}
                >
                  GO TO DASHBOARD
                </button>
              </div>
            </div>
          ) : !showOTP ? (
            // First card - Branch Code
            <div className="login-card">
              <div className="card-header">
                <h2 className="card-title">Backoffice login</h2>
                <p className="card-subtitle">Get access to detailed reports</p>
              </div>
              
              <form className="login-form" onSubmit={handleBranchCodeSubmit}>
                <div className="form-group">
                  <label htmlFor="branchCode" className="form-label">
                    Enter Your Branch Code *
                  </label>
                  <input
                    type="text"
                    id="branchCode"
                    className={`form-input ${error ? 'error' : ''}`}
                    placeholder="Enter Your Branch Code *"
                    value={branchCode}
                    onChange={(e) => {
                      setBranchCode(e.target.value);
                      if (error) setError('');
                    }}
                  />
                  {error && <span className="error-message">{error}</span>}
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'VERIFYING...' : 'VERIFY'}
                </button>
              </form>

              <div className="card-footer">
                <p className="footer-text">
                  Need assistance? Call us on <strong>0731-4217208</strong>
                </p>
                <p className="footer-note">
                  <strong>Note:</strong> Never share your login credentials with anyone. Any mishandling of the account would be dealt seriously.
                </p>
              </div>
            </div>
          ) : (
            // Second card - OTP Verification
            <div className="login-card otp-card">
              <div className="card-header">
                <h2 className="otp-title">Verify Access</h2>
                <p className="otp-subtext">OTP Sent on +91******911</p>
              </div>
              
              <img src={smartphone} alt="Smartphone" className="otp-icon" />
              
              <form className="otp-form" onSubmit={handleOTPSubmit}>
                <div className="form-group">
                  <label htmlFor="otp" className="otp-label">Enter OTP</label>
                  <input
                    type="text"
                    id="otp"
                    className={`otp-input ${otpError ? 'error' : ''}`}
                    placeholder="Enter your 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      setOTP(e.target.value);
                      if (otpError) setOTPError('');
                    }}
                    maxLength={6}
                  />
                  {otpError && <span className="error-message">{otpError}</span>}
                </div>
              </form>
            
            <div className="resend-section">
              {canResend ? (
                <button 
                  type="button" 
                  className="resend-button" 
                  onClick={resendOTP}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Resend OTP'}
                </button>
              ) : (
                <p className="resend-text">
                  Resend OTP in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
            </div>
          )}
        </section>
      </main>
      
          </div>
  );
};

export default LoginPage;
