import express from 'express'
import exsession from 'express-session'

const app = express()
app.use(express.json())
const PORT: number | null = 5000

app.use(exsession({
    secret: "123",
    resave: false, // jika menggunakan expires atau maxage maka ubah ke false
    saveUninitialized: true,
    cookie: {
        secure: false, // mengizikan http
        expires: new Date(Date.now() + 16400), // jika menggunakan ini cookie akan hilang setelah expire
        httpOnly: true,
        maxAge: 16400 // jika menggunakan ini cookie bisa refresh 
    },
    name: "cookie-1", // nama cookie,
    rolling: true, // rolling sendiri digunakan memperharui session setiap ada response
    unset: 'destroy'
}))

declare module 'express-session' {
    interface Session {
      user?: { name?: string, email?: string };
    }
  }

app.get('/login', (req: express.Request, res: express.Response) => {
    req.session.user = { name: 'John Doe', email: 'john@example.com' } as {name:string, email:string};
    res.send("logged in")
})

app.get('/profile', (req, res) => {
    const user = req.session.user;
    console.log(user)
    if (user) {
      res.send(`Welcome, ${user.name} (${user.email})`);
    } else {
        req.session.user = { name: 'John Doe', email: 'john@example.com' } as {name:string, email:string};
        res.send(`Again, ${req.session.user?.name} (${req.session.user?.email})`);
    }
  });

  app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});

// kesimpulan: 
// Gunakan expires karena akan destroy session