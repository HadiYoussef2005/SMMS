import cron from 'node-cron';
import VerificationTokenAdapter from '../adapters/VerificationTokenAdapter.js';

const verificationTokenAdapter = new VerificationTokenAdapter();

export const startTokenCleanupScheduler = () => {
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled token cleanup...');
        try {
            await verificationTokenAdapter.cleanUpExpiredTokens();
            console.log('Expired tokens cleaned up successfully.');
        } catch (err) {
            console.error('Error during token cleanup:', err.message);
        }
    });
};
