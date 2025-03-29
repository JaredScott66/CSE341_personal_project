const express = require('express');
const app = express();
const routes = require('./routes');
const mongodb = require('./db/database');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const { logError, isOperationalError, errorHandler } = require('./errors/errorHandler');


const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    //Express Session initialization
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))

    //Init passport for every route call
    .use(passport.initialize())

    //Allow passport to use express-session
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origen, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 
            'GET, POST, PUT, DELETE, OPTIONS');
        next()
    })
    .use(cors({methods: ['POST', 'GET', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
    .use(cors({origin: '*'}))

    .use('/', routes);
    
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({github.id}, function(err, user){
        return done(null, profile);
        //})    
    }
));
    
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) =>{
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'logged out')});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });
        
process.on('uncaughtException', (error, origin) => {
    console.error(`Caught exception: ${error.message}\nException origin: ${origin}`);
    process.exit(1); // Exit the process to prevent unpredictable behavior
});


app.use(errorHandler);

mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node is running on port ${port}`);
        })
    }
})