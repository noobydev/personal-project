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


app.get('/api/tent', ( req, res ) => {
    const db = req.app.get('db')
    db.get_all_tents( ).then( response => {
        res.send(response)
    } )
} )

app.get( '/api/tent/:id', ( req, res ) => {
    const db = req.app.get('db')
    const id = req.params.id
    db.get_tent([id]).then( response => {

        res.send(response)
} )})

// app.get SleepyBag db_get_backpacks


// app.get Backpack db_get_shoes


// app.get shoes db_get_sleeping_bags



// cart

// app.delete('/api/delete/item', function(req, res) {
//     let index = item.indexOf(req.params.item)
//     city.splice(index, 1)
//     res.status(200).send(item)
//  })

//  app.put('/api/update/', function(req, res) {
//     // console.log()
    
//     res.status(200).send()
// })

// app.post('/api/create', function(req, res) {
   
//    res.send(city).status(200) 
// } )


// app.get('/api/read', function(req, res) {
    
    
//     res.status(200).send()
//  })



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
    //   console.log(profile._json)

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
        successRedirect: 'http://localhost:3000#/cart'
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
         res.redirect( 'http://localhost:3000/#/home')
     } )




app.listen( SERVER_PORT, () =>{ 
    console.log ( `listening on: ${SERVER_PORT}` ) 
} )