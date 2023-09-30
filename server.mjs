import express from 'express'
import path from 'path'
import postRouter from './routes/posts.mjs'
import authRouter from './routes/auth.mjs'
const __dirname = path.resolve()
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/mongoDB', authRouter)

app.use((req, res, next) => { // JWT
    console.log("cookies: ", req.cookies);

    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("decoded: ", decoded);

        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        };

        next();

    } catch (err) {
        res.status(401).send({ message: "invalid token" })
    }


})

app.use('/api/v1/mongoDB', postRouter)


app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})
