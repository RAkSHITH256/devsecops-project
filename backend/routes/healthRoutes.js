const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running smoothly
 */
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

module.exports = router;
