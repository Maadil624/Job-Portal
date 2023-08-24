import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors' 
import helmet from 'helmet'
import connectDB from './database/database.js'
import route from './router/route.js'
import jobRoute from './router/jobRoute.js'
import http from 'http'
import {Server} from 'socket.io'
import passport from 'passport'
import session from 'express-session'

import LinkedInStrategyy from 'passport-linkedin-oauth2'
const LinkedInStrategy=LinkedInStrategyy.Strategy;

const app=express()

app.set('view engine','ejs')
app.use(
  session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
  })
)
// initializing dont env
dotenv.config()

// middlewares
app.use(express.json())
app.use(express.urlencoded())
// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({origin:"*"}))
app.use(route)
app.use(helmet())
app.use(jobRoute)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// using session fro fb login 
// const ses=Session({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
//fb middlewares
// socket middleware


//connecting to Monogo DB
connectDB()

export const CONSTANTS = {
  PORT: 5000,
  callbackUrlDomain: 'http://localhost:5000',
  callbackUrl: 'http://127.0.0.1:5000/auth/linkedin/callback',
  authUrl: '/auth/linkedin',
  successUrl: '/',
  failureUrl: '/login',
  linkedInScopes: ['r_emailaddress', 'r_liteprofile'],
  state:true
}

export const linkedinobj={
  clientID:'86vhffcj7ahnn3',
  clientSecret:'Z31FbQ3ZmtEDH43b',
  callbackURL:CONSTANTS.callbackUrl,
  scope:CONSTANTS.linkedInScopes
}

passport.use(new LinkedInStrategy({
  clientID: linkedinobj.clientID,
  clientSecret: linkedinobj.clientSecret,
  callbackURL: linkedinobj.callbackURL,
  scope: [ 'email'],
}, function (token, tokenSecret, profile, done) {
  console.log(profile)
  return done(null, profile);
}
));


// we socketsv implementation
const httpserver = http.createServer(app);
export const io = new Server(httpserver, { cors: { origin: '*' } });
httpserver.listen(5000,()=>{
        console.log("server started")
    })
// getting route from router folder
// app.listen(5000,()=>{
//     console.log("server started")
// })