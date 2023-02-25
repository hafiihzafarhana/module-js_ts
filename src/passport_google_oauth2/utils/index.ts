import {Request, Response, NextFunction} from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
  }