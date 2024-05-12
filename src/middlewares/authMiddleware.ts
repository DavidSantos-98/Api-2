import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export function checkRoles(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. No token provided!" })
    }

    try {
      const payload: any = jwt.verify(token, String(process.env.SECRET_KEY))

      if (!roles.includes(payload.role)) {
        return res.status(403).json(
          { error: "Forbidden access. User dosen't have the required role." })
      }
    } catch (error) {
      return res.status(403).json({ error: "Forbidden access. Invalid token." })
    }

    next();
  }
}
