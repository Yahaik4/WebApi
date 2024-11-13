require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }))
app.use(cookieParser());

app.use(session({
    secret: 'dsadsa',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}))

const route = require('./routes')
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')))

app.engine('hbs', 
    handlebars.engine({
        extname: '.hbs',
        helpers:{
            includes: function(str, substring) {
                return str.includes(substring);
            },
            eq: (a, b) => a === b,
            sum: (a, b) => a + b,
        }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/css') || 
    req.originalUrl.startsWith('/js') || 
    req.originalUrl.startsWith('/public')) {
        return next();
    }

    res.locals.currentURL = req.originalUrl
    next()
})

route(app)

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})
