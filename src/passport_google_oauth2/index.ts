import express from 'express'
import passport from 'passport'
import exsession from 'express-session'
import dotenv from 'dotenv'
import controller from './controller'

dotenv.config()
require('./strategies/index')

const app = express()

// session
app.use(exsession({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(process.env.ROUTE_LINK!, controller)

app.listen(3000, () => console.log('local'))