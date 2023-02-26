import express from 'express'
import multer from 'multer'
import path from 'path'

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, 'src/multers/assets')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('multer/index')
})

app.post('/upload', upload.single('image') , (req, res) => {
    res.send('image upload')
})

app.listen(3000, () => console.log(`Run in http://localhost/${3000}`))


