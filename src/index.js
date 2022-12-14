require('./mongoose/mongoose')
const express = require('express')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const todoRoutes = require('./routes/todo.routes')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

dotenv.config({ path: path.join(__dirname, '../config/.env') })

const app = express()

const PORT = process.env.PORT

app.use(cors())
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/todo', todoRoutes)

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`)
})
