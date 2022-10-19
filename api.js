const express = require('express')
const app = express()
const sessions = require('express-session');
const path = require('path')


const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "folky",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const myusername = 'admin'
const mypassword = 'Web999'
const myusername2 = 'commu'
const mypassword2 = 'Cosci7749'

// a variable to save a session
var session;

app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/gallery', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.render('gallery.ejs',{isLogIn: true})
    } else{
        res.render('gallery.ejs',{isLogIn: false})
    }
})

app.get('/login', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.redirect('/')
    } else{
        res.render('login.ejs')
    }

})


app.get('/home', (req, res) => {

    session = req.session;
    if (session.userid) {
        res.render('index.ejs',{isLogIn: true})
    } else{
        res.render('index.ejs',{isLogIn: false})
    }
})

app.get('/movie', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.render('movie.ejs',{isLogIn: true})
    } else{
        res.redirect('/login')
    }
});



app.post('/login', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword || req.body.username == myusername2 && req.body.password == mypassword2 ) {
        session = req.session;
        session.userid = req.body.username;
        console.log(req.session)
        res.redirect('/movie')

    } else {
        res.send(`Page not found <a href=\'/views/login.ejs'>go back</a>`);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(req.session)
    res.redirect('/home');
});

app.listen(5005, () => {
    console.log('Application listening on port 5005!')
})