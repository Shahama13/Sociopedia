import express from "express"
import { config } from "dotenv"
import postRouter from "./routes/post.js"
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";

config({
    path: "./config/config.env"
})

const app = express();
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, './frontend/build')))

app.use(express.json({limit:"50mb"}));
app.use(bodyParser.json());
app.use(express.urlencoded({limit:"50mb", extended: true }))
app.use(cookieParser())
app.use("/api/v1", postRouter)
app.use("/api/v1", userRouter)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
});

export default app;