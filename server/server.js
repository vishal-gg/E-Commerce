const express = require('express')
const app = express()
const connectDb = require('./config/dbConfig')

const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const color = require('cli-colors')

const userRouter = require('./routes/user')
const uploadRouter = require('./routes/add_Products')
const getRouter = require('./routes/get_Products')
const cartRouter = require('./routes/cart')
const stripeRouter = require('./routes/stripePayment')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//connection request
connectDb()

//neccessary middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "https://e-commerce-frontend-gamma-wheat.vercel.app" `${process.env.ADMIN_LOGIN}`]
}));
  
// Routes
app.get("/", (req, res) => {
    res.send('server is running')
});

app.use('/api/users', userRouter)
app.use('/upload', uploadRouter)
app.use('/get', getRouter)
app.use('/', cartRouter)
app.use('/', stripeRouter)

//error middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, (err)=>{
   err ? console.log(color.bgRed(err.message)) : 
   console.log(color.cyan(`listening on port ${PORT}`))
});