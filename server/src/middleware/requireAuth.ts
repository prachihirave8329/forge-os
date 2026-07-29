import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
/* 
interface JwtPayload & declare global: This tells the system exactly what information is printed on the ticket
 (User ID and Role) so the application remembers it.
 req.headers.authorization: This is the pocket where the visitor carries their ticket.
 startsWith("Bearer "): Standard tickets always start with the word "Bearer" followed by a space.
 authHeader.split(" ")[1]: This cuts off the word "Bearer " and grabs just the secret ticket code itself.
 jwt.verify(): The scanner that validates the ticket.
 req.user = decoded: The guard writes down who the user is so the rest of the app knows who is inside.
 next(): The guard opens the door and lets the user pass to the next page.
 catch (error): If the ticket scanner sounds an alarm (broken or expired ticket), this instantly blocks the user and says "Invalid token".
 
*/