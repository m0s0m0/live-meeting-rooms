  const{pool} = require("./dbConfig");
        app.use(express.urlencoded({extended: false}));

        app.post("/user/register", async function(req,res){
            let{username, email, password }= req.body;
            console.log({
                username,
                email,
                password
            });
            let hashedpassword= await bcrypt.hash(password,8);
            console.log("passhash", passHash);
            pool.query(
                'SELECT * FROM users WHERE email=$1 and name=$1',
                [email,name],function (err,res){
                    if(err){
                        throw err;
                    }
                    console.log(res.rows);
                }
                );
            });


app.post('/user/register',
  passport.authenticate('local', { successRedirect: '/',
                                   failureFlash: true })
);

require('dotenv').config({ path: '.env.example' });