import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import connectDB from './db.js'
import VersionRoutes from "./routes/VersionRoutes.js"
import AlienRoutes from "./routes/AlienRoutes.js"

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/ben10/versions', VersionRoutes)
app.use('/api/ben10/aliens', AlienRoutes)

app.listen(port, () => {
    console.log(`successfully running on ${port}`)
})
export default app