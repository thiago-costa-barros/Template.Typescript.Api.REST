import express from 'express'
import { dependencies } from "../../dependencies";

const router = express.Router();

router.post('/', async (req, res) => {
    const response = await dependencies.externalWebhookReceiverController.CreateExternalWebhookReceiverHotmart(req);
    res.status(response.statusCode).json(response.body);
})

export default router;