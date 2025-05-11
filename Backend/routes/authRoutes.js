import express from 'express';
import UserAdapter from '../adapters/UserAdapter';
import Encryptor from '../services/Encryptor';
import JWTService from '../services/JWTService.js';
import User from '../models/User.js';

const router = express.Router();
const userAdapter = new UserAdapter();
const encryptor = new Encryptor();

/**
 * @route POST /api/auth/register
 * @desc Register a new user or student
 */

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, isAdmin = false, section, isYearRep, role = 'User' } = req.body;
    try {
        const exists = await userAdapter.userExistsByEmail(email);
        if (exists) return res.status(400).json({ message: 'User already exists' });
        let user;
        if (role === 'Student'){
            user = await Student.create(firstName, lastName, email, password, isAdmin, section, isYearRep);
        } else {
            user = await User.create(firstName, lastName, email, password, isAdmin);
        }

        await userAdapter.createUser(user);
        
        const accessToken = JWTService.generateAccessToken({ userId: user.getId(), email });
        const refreshToken = JWTService.generateRefreshToken({ userId: user.getId(), email });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ accessToken });        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @route POST /api/auth/login
 * @desc Logs in a user or student
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userAdapter.findUserByEmail(email, true);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const validPassword = await encryptor.comparePasswords(password, user.getPassword());
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const accessToken = JWTService.generateAccessToken({ userId: user.getId(), email });
        const refreshToken = JWTService.generateRefreshToken({ userId: user.getId(), email });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({ accessToken });        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * @route POST /api/auth/refresh
 * @desc Handles logic to send a new access token if the user has a refresh token
 */
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.cookies;  
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    try {
        const payload = JWTService.verifyRefreshToken(refreshToken);

        const user = await userAdapter.findUserById(payload.userId);
        if (!user) return res.status(403).json({ message: 'User no longer exists' });

        const newAccessToken = JWTService.generateAccessToken({ userId: user.getId(), email: user.getEmail() });
        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
});

/**
 * @route POST /api/auth/logout
 * @desc handles the logic to clearing the cookie of the refresh token and logging the user out
 */

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
})