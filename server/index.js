require("dotenv").config();

const express = require("express"),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  stripe = require('stripe'),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive"), 
  app =  module.exports = express();

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING,
  STRIPE_SECRET_KEY
} = process.env;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/payment', function(req, res, next){
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function(err, charge) {
      if (err) return res.sendStatus(500)
      return res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
  });

// const app = module.exports = express();
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use((req, res, next) => {
  console.log(req.url);
  //console.log(req.session);
  next();
});
app.use(passport.initialize());
app.use(passport.session());

massive(CONNECTION_STRING)
  .then(db => {
    console.log("db connected");
    app.set("db", db);
  })
  .catch(console.log);

app.get("/api/tent", (req, res) => {
  const db = req.app.get("db");
  db.get_all_tents().then(response => {
    res.send(response);
  });
});

app.get("/api/tent/:id", (req, res) => {
  const db = req.app.get("db");
  const id = req.params.id;
  db.get_tent([id]).then(response => {
    res.send(response);
  });
});

// app.get SleepyBag db_get_backpacks

// app.get Backpack db_get_shoes

// app.get shoes db_get_sleeping_bags

// cart

// post layaway
app.post("/api/layaway", function(req, res) {
  let { itemId } = req.body;
  req.session.layaway = itemId;
  //   console.log("fdsa");
  console.log(req.sessionID);
  console.log(req.session);
  res.sendStatus(200);
});

// get layaway
app.get("/api/cart", function(req, res) {
  let db = req.app.get("db");
  console.log(req.sessionID);
  console.log(req.session);
  if (req.session.layaway) {
    db
      .add_to_cart(req.user.id, req.session.layaway, 1)
      .then(resp => {
        req.session.layaway = null;
        console.log(resp);
        db
          .get_user_cart(req.user.id)
          .then(resp => {
            console.log(resp);
            res.status(200).send(resp);
          })
          .catch(console.log);
      })
      .catch(console.log);
  } else {
    db
      .get_user_cart(resp => {
        res.status(200).send(resp);
      })
      .catch(console.log);
  }
  //   console.log("fdsa");
});

// app.post('/api/create', function(req, res) {

//    res.send().status(200)
// } )

// app.get('/api/read', function(req, res) {

//     res.status(200).send()
//  })

//  app.put('/api/update/', function(req, res) {
//     // console.log()

//     res.status(200).send()
// })

app.delete("/api/delete/:id", function(req, res) {
  let db = req.app.get("db");
  const id = req.params.id;
  db.delete_from_cart([id]).then(response => {
      res.send(response);
    }).catch(console.log);
});

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      //database calls
      const db = app.get("db");

      const { sub, given_name, family_name } = profile._json;
      //   console.log(profile._json)

      db
        .get_user([sub])
        .then(response => {
          if (response[0]) {
            done(null, response[0].id);
          } else {
            db
              .create_user([sub, given_name, family_name])
              .then(response => {
                done(null, response[0].id);
              })
              .catch(console.log);
          }
        })
        .catch(console.log);
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  // whatever is on the done in deser. is the user info
  const db = app.get("db");
  db
    .find_logged_in_user([id])
    .then(res => {
      done(null, res[0]);
    })
    .catch(console.log);
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000#/cart"
  })
);

app.get("/auth/me", (req, res) => {
  if (!req.user) {
    res.status(404).send("You aint logged in");
  } else {
    res.status(200).send(req.user); // when we want the user info we use req.user
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("http://localhost:3000/#/home");
});

app.listen(SERVER_PORT, () => {
  console.log(`listening on: ${SERVER_PORT}`);
});
