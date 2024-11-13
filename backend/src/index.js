require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
const morgan = require('morgan') 
const cors = require('cors');
const cookieParser = require('cookie-parser');

const route = require('./routes')
const db  = require('./config/db');
const session = require('express-session');
const PORT = process.env.PORT || 3000
const redis = require('./config/redis')

db.connect();
redis.connect()

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}))

// app.use(session({
//     secret: 'dsadsa',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: false,
//         maxAge: 24 * 60 * 60 * 1000
//     }
// }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

route(app)
    
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})
