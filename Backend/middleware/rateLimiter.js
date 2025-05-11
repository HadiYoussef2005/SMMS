import rateLimit from 'express-rate-limit';

export const emailRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    keyGenerator: (req) => req.body.email || req.ip, 
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,c
});
