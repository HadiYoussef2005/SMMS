import express from 'express';
import UserAdapter from '../adapters/UserAdapter.js';
import Encryptor from '../services/Encryptor.js';
import JWTService from '../services/JWTService.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import EmailSender from '../services/EmailSender.js';
import VerificationToken from '../models/VerificationToken.js';
import VerificationTokenAdapter from '../adapters/VerificationTokenAdapter.js';
import {emailRateLimiter} from '../middleware/rateLimiter.js';

const router = express.Router();
const userAdapter = new UserAdapter();
const verificationTokenAdapter = new VerificationTokenAdapter();
const encryptor = new Encryptor();

/**
 * @route POST /api/auth/requestEmailVerification
 * @desc Stores user data temporarily and sends a verification code
 */
router.post('/requestEmailVerification', emailRateLimiter, async (req, res) => {
    const { email, firstName, lastName, password, isAdmin = false, section, isYearRep, role = 'User' } = req.body;

    const userExists = await userAdapter.userExistsByEmail(email);
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const userData = { firstName, lastName, password, isAdmin, section, isYearRep, role };
    const verificationToken = new VerificationToken(email, 'verifyEmail', userData);

    try {
        await verificationTokenAdapter.saveToken(verificationToken);
        await EmailSender.sendEmail(
            email,
            "Your Verification Code",
            `Your verification code is: ${verificationToken.code}`
        );
        res.status(200).json({ message: "Verification token sent to email" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route POST /api/auth/confirmEmailVerification
 * @desc Confirms the code and creates the user with stored data
 */
router.post('/confirmEmailVerification', async (req, res) => {
    const { email, code } = req.body;

    try {
        const token = await verificationTokenAdapter.findToken(email, code, 'verifyEmail');
        if (!token) return res.status(400).json({ message: 'Invalid or expired verification code' });

        const { firstName, lastName, password, isAdmin, section, isYearRep, role } = token.userData;

        let user;
        if (role === 'Student') {
            user = await Student.create(firstName, lastName, email, password, isAdmin, section, isYearRep);
        } else {
            user = await User.create(firstName, lastName, email, password, isAdmin);
        }

        await userAdapter.createUser(user);
        await verificationTokenAdapter.deleteSpecificToken(email, code, 'verifyEmail');

        const accessToken = JWTService.generateAccessToken({ userId: user.getId(), email });
        const refreshToken = JWTService.generateRefreshToken({ userId: user.getId(), email });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({ accessToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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
        });

        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route POST /api/auth/refresh
 * @desc Issues a new access token using the refresh token
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
 * @desc Clears the refresh token cookie
 */
router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * @route POST /api/auth/requestPasswordReset
 * @desc Sends a password reset token to the user's email
 */
router.post('/requestPasswordReset', emailRateLimiter, async (req, res) => {
    const { email } = req.body;
    const resetToken = new VerificationToken(email, 'resetPassword');

    try {
        await verificationTokenAdapter.saveToken(resetToken);
        await EmailSender.sendEmail(
            email,
            "Your Password Reset Code",
            `Your password reset code is: ${resetToken.code}`
        );
        res.status(200).json({ message: "Password reset code sent to email" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @route POST /api/auth/resetPassword
 * @desc Verifies the password reset code and updates the user's password
 */
router.post('/resetPassword', async (req, res) => {
    const { email, code, newPassword } = req.body;

    try {
        const token = await verificationTokenAdapter.findToken(email, code, 'resetPassword');
        if (!token) return res.status(400).json({ message: 'Invalid or expired reset code' });

        const user = await userAdapter.findUserByEmail(email, true);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.setPassword(newPassword);
        await userAdapter.updateUser(user);
        await verificationTokenAdapter.deleteSpecificToken(email, code, 'resetPassword');

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
