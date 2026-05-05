const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/otp-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// OTP Schema
const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const OTP = mongoose.model('OTP', otpSchema);

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP API
app.post('/api/send-otp', async (req, res) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ success: false, message: 'Mobile number is required' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        // Save to MongoDB
        await OTP.findOneAndUpdate(
            { mobile },
            { mobile, otp, expiresAt },
            { upsert: true, new: true }
        );

        // Print OTP in console (for demo purposes)
        console.log(`OTP for ${mobile}: ${otp}`);

        res.json({ 
            success: true, 
            message: 'OTP sent successfully',
            otp: otp // Only for demo, remove in production
        });

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify OTP API
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });
        }

        // Find OTP in database
        const otpRecord = await OTP.findOne({ mobile, otp });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (new Date() > otpRecord.expiresAt) {
            await OTP.deleteOne({ mobile, otp });
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        // OTP is valid, delete it
        await OTP.deleteOne({ mobile, otp });

        res.json({ 
            success: true, 
            message: 'OTP verified successfully',
            redirectUrl: '/dashboard'
        });

    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
