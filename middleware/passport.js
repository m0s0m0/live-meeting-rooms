// let userDatabase = require('../database/user');
// var LocalStrategy   = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');

// module.exports = function(passport) {

//     // passport.use(
//     //     'local-signup',
//     //     new LocalStrategy({
//     //         // by default, local strategy uses username and password, we will override with email
//     //         usernameField : 'username',
//     //         passwordField : 'password',
//     //         passReqToCallback : true // allows us to pass back the entire request to the callback
//     //     },
//     //     function(req, username, password, done) {
//     //         // find a user whose email is the same as the forms email
//     //         // we are checking to see if the user trying to login already exists
//     //         connection.connect();
//     //         connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
//     //             if (err)
//     //                 return done(err);
//     //             if (rows.length) {
//     //                 return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
//     //             } else {
//     //                 // if there is no user with that username
//     //                 // create the user
//     //                 const salt = "rihwehehfeuegegfu"
//     //                 const hash = bcrypt.hashSync(myPlaintextPassword, salt);
//     //                 var newUserMysql = {
//     //                     username: username,
//     //                     password: bcrypt.hashSync(password, salt, null)  // use the generateHash function in our user model
//     //                 };

//     //                 var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";
//     //                 connection.connect();
//     //                 connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
//     //                     newUserMysql.id = rows.insertId;

//     //                     return done(null, newUserMysql);
//     //                 });
//     //                 connection.end();
//     //             }
//     //         });
//     //         connection.end();
//     //     })
//     // );

//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'

//     passport.use(
//         'local-login',
//         new LocalStrategy({
//             // by default, local strategy uses username and password, we will override with email
//             usernameField : 'username',
//             passwordField : 'password',
//             passReqToCallback : true // allows us to pass back the entire request to the callback
//         },
//         async function(req, username, password, done) {
//             console.log("in login passport"); // callback with email and password from our form
//             let user = await userDatabase.getUserByEmail(email)
//             if (!user){
//                 return done(user.err)
//             }
            
//         })
//     );
// };