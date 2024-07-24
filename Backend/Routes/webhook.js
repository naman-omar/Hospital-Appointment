import express from 'express';
import { handleWebhook } from '../Controllers/webhookController.js';

const router = express.Router();

// Use raw body parser for the webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;