import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JwtPayload } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export function requireAuth(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.substring("Bearer ".length);

    try {
        const payload = verifyToken(token);
        req.user = payload;
        return next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}