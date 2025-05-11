import Id from '../services/Id.js';
class VerificationToken {
    constructor(email, type, userData, expiresInMinutes = 10) {
        this.email = email;
        this.code = new Id(6).getId();
        this.type = type;
        this.expiresAt = new Date(Date.now() + expiresInMinutes * 60000);
        this.userData = userData;
    }

    toObject() {
        return {
            email: this.email,
            code: this.code,
            type: this.type,
            expiresAt: this.expiresAt,
            userData: this.userData
        };
    }
}

export default VerificationToken;
