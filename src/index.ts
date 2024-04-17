import express, {Request, Response} from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import http from "http"
import dotenv from "dotenv"
import path from "path"
import { connectDB } from "./config/db.config"
import booksRouter from "./routes/v1/book"
import authRouter from "./routes/v1/auth"
import earningsRouter from "./routes/v1/earning"
import {fileURLToPath} from "url"
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const port = process.env.PORT || 3000

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	legacyHeaders: false,
})


app.use(limiter)
app.use(cors({ origin: "*"}))
app.use(helmet())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./views"))
//visit /static to access static files
app.use("/static",express.static(path.join(__dirname, 'public')))

app.get("/login", (req: Request, res: Response)=>{
    return res.render("login", {title: "login"})
})

app.get("/earnings", (req: Request, res: Response)=>{
    return res.render("earnings", {title: "earnings"})
})

app.get("/", (req: Request, res: Response)=>{
    return res.render("hello")
})

app.get("/hello", (req: Request, res: Response)=>{
    return res.render("hello")
})

app.use("/api/v1/books", booksRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/earnings", earningsRouter)


app.get("/api/v1/hello", (req: Request, res: Response)=>{
    return res.status(200).json({message: "Hello GDSC"})
})

app.use((req: Request, res: Response)=>{
    return res.status(404).json({message: "route not found"})
})

async function start(){
    const server = http.createServer(app)
    await connectDB()
    server.listen(port, ()=>{
        console.log(`server running ${process.env.NODE_ENV} mode on port ${(server.address() as {port: number}).port}...`)
    })
    
    return server
}

const server = start()

export default server