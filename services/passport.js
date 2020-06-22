const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const facebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
      });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})
            
        if(existingUser) {
              return  done(null, existingUser);
            }
          const user = await  new User({googleId: profile.id }).save()
           done(null, user)
    }
  )
);

// passport.use(new facebookStrategy({
//   clientID: keys.facebookClientID,
//   clientSecret: keys.facebookClientSecret,
//   callbackURL: "auth/facebook/callback"
// },
// (accessToken, refreshToken, profile, done) => {
//   console.log(profile);
//   User.findOne({facebookId: profile.id})
//         .then((existingUser) => {
//             if(existingUser) {
//                 done(null, existingUser);
//             } else {
//                 new User({
//                     facebookId: profile.id,
//                   }).save()
//                   .then((user) => done(null, user));
//             }
//         })
// }
// ));


