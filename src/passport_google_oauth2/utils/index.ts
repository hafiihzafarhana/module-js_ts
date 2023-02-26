import {Request, Response, NextFunction} from "express";

// middleware untuk pengguna yang telah login
export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
  }