import express from 'express';
import uaparserjs from 'ua-parser-js'
const app = express();
app.use(express.json());
const PORT = 5000;
app.get('/',(req,res,next) => {
  var ua = uaparserjs(req.headers['user-agent']);
  res.status(200).json({
        'message': ua
    });
});
app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});