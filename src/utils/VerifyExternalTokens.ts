import dotenv from 'dotenv'
import { Request } from "express"

dotenv.config()

export const VerifyHotmartToken = (req: Request): boolean => {
    const token = process.env.SECRET_TOKEN_HOTMART as string;
    const receivedToken = req.headers['x-hotmart-hottok'];
    return token === receivedToken;
}