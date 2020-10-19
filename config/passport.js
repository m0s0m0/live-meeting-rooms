const bcrypt= require('bcryptjs')
const connection = require('../database/connect.js')
const runQuery = connection.runQuery;

var LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username,email, password, done) {
        loginUser()
        async function loginUser() {
            try {
                let password = req.body.password;
                let query = `select * from public.users where email='${req.body.email}'`
                let result = await runQuery(query);
                console.log("result", result);
                    if (result.err) {
                        return done(err)
                    }

                    if (result.data.length == 0) {
					    return done(null, false, req.flash('message', "Incorrect email"))
                    } else {
                        let userInfo = result.data[0]
                        bcrypt.compare(password, userInfo.password, (err, valid) => {
                            if (err) {
                                console.log("Error on password validation")
                                return done(err)
                            }
                            if (valid) {
                                console.log('User [' + req.body.email + '] has logged in.')
                                return done(null, {username: userInfo.email})
                            } else {
                                return done(null, false, req.flash('message', "Incorrect email Or Password"))
                            }
                        })
                    }
            }
            catch(e) {
                throw (e)

            }
        }
    }))

    passport.use('register', new LocalStrategy({
        usernameField : 'username',
        emailField    :  'email', 
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username,email, password, done) {
        registerUser()
        async function registerUser() {
            
            try {
                console.log("username", req.body.username);
                console.log("email",req.body.email);
                console.log("password", req.body.password);
                let passHash = await bcrypt.hash(req.body.password, 100)
                console.log("passhash", passHash);

                let query = `select * from public.users where email = '${email}'`
                let result = await runQuery(query);
                if (result.data.length == 0){
                    query = `insert into public.users (username,email, password) values ('${req.body.username}','${req.body.email}', '${passHash}')`
                    result = await runQuery(query)
                    if (result.err){
                        return done(null, false, req.flash('message', 'Something went wrong'))
                    }
                    else{
                        return done(null, {email: req.body.email})
                    }
                }
                else{
                    return done(null, false, req.flash('message', 'Email Already Exist'))
                }
            }
            catch(e) {
                throw (e)
            }
        }
    }))

    passport.use('updatePassword', new LocalStrategy({
        usernameField : 'password',
        passwordField : 'newpass',
        passReqToCallback : true
    },
    function(req, password, newpass, done) {
        let username = (req.user.username).toLowerCase()
        updatePassword()
        async function updatePassword() {
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                let newPassHash = await bcrypt.hash(req.body.newpass, 8)
                var accData = await JSON.stringify(client.query('SELECT id, "username", "password" FROM "users" WHERE "username"=$1', [req.user.username.toLowerCase()], (err, result) => {
                    if (err) {
                        return done(err)
                    }

                    if (!testPass(req.body.password) ) {
                        return done(null, false, req.flash('message', 'Please provide a valid password'))
                    } else if (!testPass(req.body.newpass)) {
                        return done(null, false, req.flash('message', 'Please provide a valid password'))
                    } else {
                        if(result.rows[0] == null) {
                            return done(null, false, req.flash('message', 'Error on changing password. Please try again'))
                        } else {
                            bcrypt.compare(req.body.password, result.rows[0].password, (err, valid) => {
                                if (err) {
                                    console.log("Error on current password validation")
                                    return done(err)
                                }
                                if (valid) {
                                    client.query('UPDATE users SET password=($1) WHERE username=($2)', [newPassHash, req.user.username], (err, result) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                        else {
                                            client.query('COMMIT')
                                            console.log('User [' + req.user.username + '] has updated their password.')
                                            //console.log(result)
                                            return done(null, {username: req.user.username}, req.flash('message', 'Your password has been updated.'))
                                        }
                                    });
                                } else {
                                    req.flash('message', "Incorrect current password entered")
                                    return done(null, false)
                                }
                            })
                        }
                    }
                }))
            }
            catch(e) {
                throw (e)
            }
        }
    }))
}

function testUser(input) {
    if (input === '' || input === null || input === undefined){
        return false
    }
    return true
    }
function testPass(input) {
    if (input === '' || input === null || input === undefined){
        return false
    }
    return true
    }