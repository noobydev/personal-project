require( 'dotenv' ).config( )

const express = require( 'express' ),
session = require( 'express-session' ),
passport = require( 'passport' ),
Auth0Strategy = require( 'passport-auth0' ),
massive = require( 'massive' );


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express( );

app.use( session( {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  } ) );

  app.use( passport.initialize( ) )
  app.use( passport.session( ) )

  massive( CONNECTION_STRING ).then( db => {
    console.log( 'db connected' )
    app.set( 'db', db )
} ).catch(console.log)

passport.use( new Auth0Strategy( { 
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
  }, function( accessToken, refreshToken, extraParams, profile, done ) {
      //database calls
      const db = app.get( 'db' )

      const { sub, given_name, family_name } = profile._json
      console.log(profile._json)

      db.get_user( [ sub ] ).then( response => {
          if ( response[ 0 ] ) {
              done( null, response[ 0 ].id )
          } else {
              db.create_user( [ sub, given_name, family_name  ] ).then( response => { 
                  done( null, response[ 0 ].id )
              } ).catch(console.log)
          }
      } ).catch(console.log)
     } ) )

     passport.serializeUser( ( id, done ) => {
        done( null, id )
    } )

    passport.deserializeUser( ( id, done ) => { // whatever is on the done in deser. is the user info
        const db = app.get( 'db' )
        db.find_logged_in_user( [ id ] ).then( res => { 
            done( null, res[ 0 ] )
         } ).catch(console.log)
    } )


    app.get( '/auth', passport.authenticate( 'auth0' ) )
    app.get( '/auth/callback', passport.authenticate( 'auth0', {
        successRedirect: 'http://localhost:3000#/'
    } ) )

    app.get( '/auth/me', ( req, res ) => { 
        if ( !req.user ) {
            res.status( 404 ).send( 'You aint logged in' )
        } else {
            res.status( 200 ).send( req.user ) // when we want the user info we use req.user
        }
     } )

     app.get( '/logout', ( req, res ) => {
         req.logOut( );
         res.redirect( 'http://localhost:3000/#/')
     } )




app.listen( SERVER_PORT, () =>{ 
    console.log ( `listening on: ${SERVER_PORT}` ) 
} )