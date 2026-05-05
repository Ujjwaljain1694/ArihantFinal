import React, { useState } from 'react';
import axios from 'axios';
import './OTPLogin.css';

const OTPLogin = () => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/send-otp', {
                mobile: mobile
            });

            if (response.data.success) {
                setShowOTP(true);
                setSuccess('OTP sent successfully!');
                console.log('OTP:', response.data.otp); // For demo purposes
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
            console.error('Send OTP Error:', error);
        }

        setLoading(false);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/verify-otp', {
                mobile: mobile,
                otp: otp
            });

            if (response.data.success) {
                setSuccess('OTP verified successfully!');
                // Redirect to dashboard
                window.location.href = response.data.redirectUrl;
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again.');
            console.error('Verify OTP Error:', error);
        }

        setLoading(false);
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (/^\d*$/.test(value)) {
            setMobile(value);
        }
    };

    const handleOTPChange = (e) => {
        const value = e.target.value;
        // Only allow numbers, max 6 digits
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
        }
    };

    const resetForm = () => {
        setShowOTP(false);
        setOtp('');
        setError('');
        setSuccess('');
    };

    return (
        <div className="otp-login-container">
            <div className="otp-login-card">
                <div className="login-header">
                    <h1 className="login-title">Arihant Capital</h1>
                    <p className="login-subtitle">Secure OTP Login</p>
                </div>

                {!showOTP ? (
                    <form onSubmit={handleSendOTP} className="otp-form">
                        <div className="form-group">
                            <label htmlFor="mobile" className="form-label">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                value={mobile}
                                onChange={handleMobileChange}
                                placeholder="Enter your mobile number"
                                className="form-input"
                                maxLength={10}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading || mobile.length !== 10}
                        >
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="otp-form">
                        <div className="mobile-display">
                            <span className="mobile-label">Mobile:</span>
                            <span className="mobile-value">{mobile}</span>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="change-mobile-btn"
                            >
                                Change
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="otp" className="form-label">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={handleOTPChange}
                                placeholder="Enter 6-digit OTP"
                                className="form-input otp-input"
                                maxLength={6}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading || otp.length !== 6}
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="login-footer">
                    <p className="help-text">
                        Need assistance? Call us on 0731-4217208
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPLogin;
