import express from 'express';
import { dependencies } from './dependencies';

const router = express.Router();

router.get('/users', async (req, res) => {
    const response = await dependencies.getUserController.handle();
    res.status(response.statusCode).json(response.body);
});

export default router;