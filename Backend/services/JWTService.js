import jwt from 'jsonwebtoken';

class JWTService {
    constructor() {
        this.accessSecret = process.env.JWT_ACCESS_SECRET || 'accessSecret';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshSecret';
        this.accessExpiresIn = '15m';
        this.refreshExpiresIn = '7d';
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn });
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
    }

    verifyAccessToken(token) {
        return jwt.verify(token, this.accessSecret);
    }

    verifyRefreshToken(token) {
        return jwt.verify(token, this.refreshSecret);
    }

    decodeToken(token) {
        return jwt.decode(token);
    }
}

export default new JWTService();
