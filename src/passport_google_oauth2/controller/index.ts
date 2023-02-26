import { Router, Request, Response } from "express";
import passport from "passport";
import { isLoggedIn } from "./../utils/index";

const router = Router()

// routing untuk click login dengan user
router.get('/', (req: Request, res: Response) => {
    res.send(`<a href="${process.env.ROUTE_LINK}/auth/google">Google Login</a>`)
})

// menuju ke halaman pilih email
router.get('/auth/google', passport.authenticate('google', {scope: ['email']}))

// memberikan callback apakah berhasil atau tidak
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/v1/api/home',
    failureRedirect: '/v1/api/auth/google/failure'
}))

// halaman home
router.get('/home', isLoggedIn, (req: Request, res: Response) => {
    const data: any = req.user
    res.send(`Hai ${data.displayName}`)
})

// halaman jika salah pada server
router.get('/auth/google/failure', (req: Request, res: Response) => {
    res.send('Failed to authenticate..');
})

export default router