import passport from 'passport';
import LinkedinOAuth from 'passport-linkedin-oauth2'

const LinkedinStrategy=LinkedinOAuth.Strategy

export const CONSTANTS = {
    PORT: 5000,
    callbackUrlDomain: 'http://localhost:5000',
    callbackUrl: '/auth/linkedin/callback',
    authUrl: '/auth/linkedin',
    successUrl: '/',
    failureUrl: '/login',
    linkedInScopes: ["r_emailaddress", "r_liteprofile"],
    strategy: 'linkedin'
}

export const linkedinobj={
    clientID:'86djeigjsn20vz',
    clientSecret:'N7s40epfmLRc7Ec4',
    callbackURL:CONSTANTS.callbackUrl,
    scope:CONSTANTS.linkedInScopes
}
passport.use(
    new LinkedinStrategy(
      linkedinobj,
      (
        accessToken,     
      refreshToken,
      profile,
      done
      )=>{
        process.nextTick(()=>{
            // console.log(profile)
            return done(null,profile)
        })
      }  
    )
)
const passportlinkedin=passport

export default passportlinkedin;