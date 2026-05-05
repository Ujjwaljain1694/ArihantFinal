# OTP Login System

A complete OTP-based authentication system using React.js frontend and Node.js backend with MongoDB database.

## Features

- **Mobile Number Input**: 10-digit mobile number validation
- **OTP Generation**: 6-digit random OTP with 5-minute expiry
- **OTP Verification**: Secure verification with expiry check
- **Database Storage**: MongoDB for OTP records
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Mobile-first responsive UI
- **Professional UI**: Arihant Capital themed design

## Project Structure

```
arihant/
├── server.js              # Node.js/Express backend
├── src/
│   ├── OTPLogin.jsx      # React OTP login component
│   ├── OTPLogin.css     # OTP login styles
│   ├── Dashboard.jsx      # Dashboard component
│   ├── Dashboard.css     # Dashboard styles
│   └── App.jsx          # Main App component
├── package.json          # Dependencies and scripts
└── .env               # Environment variables
```

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start MongoDB**:
   ```bash
   mongod
   ```

3. **Start Backend Server**:
   ```bash
   npm run server
   ```

4. **Start Frontend**:
   ```bash
   npm start
   ```

## API Endpoints

### Send OTP
- **URL**: `POST /api/send-otp`
- **Request Body**:
  ```json
  {
    "mobile": "8959928800"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully",
    "otp": "123456"
  }
  ```

### Verify OTP
- **URL**: `POST /api/verify-otp`
- **Request Body**:
  ```json
  {
    "mobile": "8959928800",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP verified successfully",
    "redirectUrl": "/dashboard"
  }
  ```

## Database Schema

### OTP Collection
```javascript
{
  mobile: String,      // User mobile number
  otp: String,        // Generated OTP
  expiresAt: Date,    // OTP expiry time
  createdAt: Date,    // Record creation time
  updatedAt: Date     // Record update time
}
```

## Usage

1. **Enter Mobile Number**: User enters 10-digit mobile number
2. **Send OTP**: Click "Send OTP" button
3. **Receive OTP**: OTP is generated and stored (printed in console for demo)
4. **Enter OTP**: User enters 6-digit OTP
5. **Verify OTP**: Backend validates OTP and expiry
6. **Redirect**: On success, redirect to dashboard

## Features

### Security
- **OTP Expiry**: 5-minute automatic expiry
- **Rate Limiting**: One OTP per mobile at a time
- **Input Validation**: Only numeric input allowed
- **Error Handling**: Comprehensive error messages

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear error display
- **Success Messages**: Confirmation on success
- **Mobile Change**: Option to change mobile number
- **Responsive Design**: Works on all devices

### Development Features
- **Console Logging**: OTP printed in console (demo mode)
- **Environment Variables**: Secure configuration
- **Hot Reload**: Nodemon for development
- **Clean Code**: Well-structured and commented

## Testing

### Test with Your Mobile Number
1. Enter: `8959928800`
2. Click "Send OTP"
3. Check console for OTP
4. Enter OTP and verify

### Test API with curl
```bash
# Send OTP
curl -X POST http://localhost:5000/api/send-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"8959928800"}'

# Verify OTP
curl -X POST http://localhost:5000/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"mobile":"8959928800","otp":"123456"}'
```

## Production Deployment

1. **Environment Setup**:
   - Set `MONGODB_URI` to production MongoDB URL
   - Remove OTP from response in production
   - Implement actual SMS gateway

2. **Security Considerations**:
   - Use HTTPS
   - Implement rate limiting
   - Add input sanitization
   - Use environment variables for secrets

## Technologies Used

- **Frontend**: React.js, CSS3, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Development**: Nodemon, CORS, dotenv

## License

MIT License
