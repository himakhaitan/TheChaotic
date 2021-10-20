const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, null);
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtKEY;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    if (
      jwt_payload.id === process.env.ADMIN_ID &&
      jwt_payload.email === process.env.ADMIN_EMAIL
    ) {
      done(null, {
        id: jwt_payload.id,
        email: jwt_payload.email,
      });
    } else {
      done(null, false);
    }
  })
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       if (
//         profile.emails[0].verified &&
//         profile.id === process.env.ADMIN_ID &&
//         profile.emails[0].value === process.env.ADMIN_EMAIL
//       ) {
//         cb(null, profile);
//       } else {
//         cb(null, false);
//       }
//     }
//   )
// );
