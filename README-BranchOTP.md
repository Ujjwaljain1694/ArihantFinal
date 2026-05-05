# Arihant Capital Branch OTP Login System

A complete branch code-based OTP authentication system using React.js frontend and Node.js backend with MongoDB database.

## Features

- **Branch Code Input**: Alphanumeric validation
- **Mobile Number Fetch**: Automatic mobile number retrieval from database
- **OTP Generation**: 6-digit random OTP with 5-minute expiry
- **OTP Verification**: Secure verification with expiry check
- **Database Storage**: MongoDB for branch and OTP records
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Mobile-first responsive UI
- **Professional UI**: Arihant Capital themed design

## Project Structure

```
arihant/
├── backend/
│   ├── server.js              # Node.js/Express backend
│   ├── package.json          # Backend dependencies
│   └── .env                 # Environment variables
├── src/
│   ├── BranchOTPLogin.jsx   # React branch OTP login component
│   ├── BranchOTPLogin.css   # Branch OTP login styles
│   ├── Dashboard.jsx         # Dashboard component
│   ├── Dashboard.css        # Dashboard styles
│   └── App.jsx              # Main App component
└── README-BranchOTP.md     # This file
```

## Installation

1. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install axios
   ```

3. **Start MongoDB**:
   ```bash
   mongod
   ```

4. **Start Backend Server**:
   ```bash
   cd backend
   npm run dev
   ```

5. **Start Frontend**:
   ```bash
   npm start
   ```

## API Endpoints

### Send OTP
- **URL**: `POST /api/send-otp`
- **Request Body**:
  ```json
  {
    "branchCode": "BR001"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "OTP sent successfully",
    "mobile": "8959928800",
    "branchCode": "BR001",
    "otp": "123456"
  }
  ```

### Verify OTP
- **URL**: `POST /api/verify-otp`
- **Request Body**:
  ```json
  {
    "branchCode": "BR001",
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

### Add Branch (Demo)
- **URL**: `POST /api/add-branch`
- **Request Body**:
  ```json
  {
    "branchCode": "BR001",
    "mobile": "8959928800"
  }
  ```

### Get All Branches (Demo)
- **URL**: `GET /api/branches`
- **Response**:
  ```json
  {
    "success": true,
    "branches": [
      {
        "_id": "...",
        "branchCode": "BR001",
        "mobile": "8959928800",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

## Database Schema

### Branches Collection
```javascript
{
  branchCode: String,    // Unique branch code
  mobile: String,       // Associated mobile number
  createdAt: Date,      // Record creation time
  updatedAt: Date       // Record update time
}
```

### OTPs Collection
```javascript
{
  branchCode: String,    // Branch code
  otp: String,          // Generated OTP
  expiresAt: Date,      // OTP expiry time
  createdAt: Date,      // Record creation time
  updatedAt: Date       // Record update time
}
```

## Usage

1. **Add Sample Branch** (for demo):
   ```bash
   curl -X POST http://localhost:5000/api/add-branch \
     -H "Content-Type: application/json" \
     -d '{"branchCode":"BR001","mobile":"8959928800"}'
   ```

2. **Enter Branch Code**: User enters branch code (e.g., "BR001")
3. **Send OTP**: Click "Send OTP" button
4. **Mobile Retrieval**: Backend fetches mobile number from database
5. **OTP Generation**: 6-digit OTP generated and stored
6. **Console Log**: OTP and mobile number printed in console
7. **Enter OTP**: User enters 6-digit OTP
8. **Verify OTP**: Backend validates OTP and expiry
9. **Redirect**: On success, redirect to `/dashboard`

## Features

### Security
- **Branch Validation**: Validates branch code against database
- **OTP Expiry**: 5-minute automatic expiry
- **Input Validation**: Alphanumeric for branch, numbers only for OTP
- **Error Handling**: Comprehensive error messages
- **Rate Limiting**: One OTP per branch at a time

### User Experience
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear error display
- **Success Messages**: Confirmation on success
- **Branch Change**: Option to change branch code
- **Mobile Display**: Shows associated mobile number
- **Responsive Design**: Works on all devices

### Development Features
- **Console Logging**: OTP and mobile printed in console
- **Environment Variables**: Secure configuration
- **Hot Reload**: Nodemon for development
- **Clean Code**: Well-structured and commented
- **Demo Endpoints**: Easy testing with sample data

## Testing

### Test with Sample Branch
1. **Add Branch**: Use API to add sample branch
2. **Enter Branch**: Enter "BR001" in the form
3. **Send OTP**: Click "Send OTP" button
4. **Check Console**: Look for OTP and mobile number
5. **Enter OTP**: Use the OTP from console
6. **Verify**: Click "Verify OTP" button

### Test API with curl
```bash
# Add branch
curl -X POST http://localhost:5000/api/add-branch \
  -H "Content-Type: application/json" \
  -d '{"branchCode":"BR001","mobile":"8959928800"}'

# Send OTP
curl -X POST http://localhost:5000/api/send-otp \
  -H "Content-Type: application/json" \
  -d '{"branchCode":"BR001"}'

# Verify OTP
curl -X POST http://localhost:5000/api/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"branchCode":"BR001","otp":"123456"}'
```

## Production Deployment

1. **Environment Setup**:
   - Set `MONGODB_URI` to production MongoDB URL
   - Remove OTP from response in production
   - Implement actual SMS gateway
   - Add authentication middleware

2. **Security Considerations**:
   - Use HTTPS
   - Implement rate limiting
   - Add input sanitization
   - Use environment variables for secrets
   - Add logging and monitoring

## Technologies Used

- **Frontend**: React.js, CSS3, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Development**: Nodemon, CORS, dotenv

## License

MIT License
