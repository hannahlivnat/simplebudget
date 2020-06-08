// //SET UP
// const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//     passReqToCallback: true
//   },
//   (username, password, done) => {
//     username.findOne({
//       username: username
//     }, (err, user) => {
//       if (err) {
//         return done(err)
//       } else if (!user) {
//         return done(null, false)
//       } else if (!user.verifyPassword(password)) {
//         return done(null, false)
//       } else {
//         return done(null, user);
//       }
//     })
//   }
// ));


// //RESOURCES USED: 
// //https://medium.com/silibrain/using-passport-bcrypt-for-full-stack-app-user-authentication-fe30a013604e
// //https://medium.com/gomycode/authentication-with-passport-js-73ca65b25feb
// //http://www.passportjs.org/packages/passport-local/
// //https://github.com/jaredhanson/passport-local