// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')


// const initialize = (passport, getUserByUsername) => {
//   const authenticateUser = (username, password, done) => {
//     const user = getUserByUsername(username)
//     //if there is no user, we haven't yet accessed an error option,
//     //we return our own error(no user)
//     if (user == null) {
//       return done(null, false, {
//         message: "This username does not exist"
//       })
//     }

//     //this is an asynch function, creates promise-based behavior
//     //In an asynch function, your program can continue to run while this code runs
//     //reduces wait time for user

//     //try this...
//     // try {
//     //   if (await bcrypt.compare(password, user.password)) {
//     //     //successful user - return user
//     //     return done(null, user)
//     //   } else {
//     //     //user and password don't match
//     //     return done(null, false, {
//     //       message: 'Password incorrect'
//     //     })
//     //   }
//     //   //catch the error if above doesn't work
//     // } catch (error) {
//     //   return done(error)
//     // }
//   }

//   passport.use(new LocalStrategy({
//     usernameField: 'username'
//   }), authenticateUser)
//   passport.serializeUser((user, done) => {

//   })
//   passport.deserializeuser((id, done) => {})
// }

// //set module.exports to the initialize function, allowing us to call the function 
// //outside of the file
// module.exports = initialize;