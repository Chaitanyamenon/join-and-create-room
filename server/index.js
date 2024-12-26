const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Connect to the User database
mongoose.connect('mongodb://127.0.0.1:27017/User')
    .then(() => console.log('MongoDB (User) connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Define Room database connection using `createConnection`
const roomConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/Room', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

roomConnection.once('open', () => {
    console.log('MongoDB (Room) connected successfully!');
});

// Define Room model using the Room connection
const roomSchema = new mongoose.Schema({
    roomCode: { type: String, unique: true },
});
const Room = roomConnection.model('Room', roomSchema);

// User registration endpoint with password hashing
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        // Generate a hashed password
        const saltRounds = 10; // Higher value for better security
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Save the user with hashed password
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, // Store hashed password
        });

        res.json({ status: 'ok' });
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

// User login endpoint with password verification
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (user) {
        // Compare the hashed password with the input password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
            );
            return res.json({ status: 'ok', user: token });
        } else {
            return res.json({ status: 'error', error: 'Invalid password' });
        }
    } else {
        return res.json({ status: 'error', error: 'User not found' });
    }
});

// Room endpoints
app.get('/api/rooms/:roomCode', async (req, res) => {
    const { roomCode } = req.params;
    const roomExists = await Room.findOne({ roomCode });
    res.json({ exists: !!roomExists });
});

app.post('/api/rooms', async (req, res) => {
    const { roomCode } = req.body;
    try {
        const newRoom = new Room({ roomCode });
        await newRoom.save();
        res.status(201).send('Room created successfully');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error creating room');
    }
});

app.listen(1337, () => {
    console.log('Server is running on port 1337');
});
