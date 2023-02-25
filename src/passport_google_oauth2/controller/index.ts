import { Router, Request, Response } from "express";
import passport from "passport";
import { isLoggedIn } from "./../utils/index";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send(`<a href="${process.env.ROUTE_LINK}/auth/google">Google Login</a>`)
})

router.get('/auth/google', passport.authenticate('google', {scope: ['email']}))

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/v1/api/home',
    failureRedirect: '/v1/api/auth/google/failure'
}))

router.get('/home', isLoggedIn, (req: Request, res: Response) => {
    const data: any = req.user
    res.send(`Hai ${data.displayName}`)
})

router.get('/auth/google/failure', (req: Request, res: Response) => {
    res.send('Failed to authenticate..');
})

export default router