const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');



const Authenticate = async (req, res,next) =>{
        try{
                const token = req.cookies.jwToken; 
                console.log(token)
                const verifyToken =  jwt.verify(token, process.env.SECRET_KEY);// yaha pr token aur secret key match kar jata hai to verifyToken ke ander apne aap sara user ka data aa jayega
                const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});// yaha token ko virfy kiya h jo verifytoken ke ander user id h usko databse ke tokens ke ander jo token h usko match kiya h jo yaha cookies me jwt ka token hai
                console.log(rootUser._id)
                console.log(rootUser.name)

                if(!rootUser){
                    throw new Error('User not found');
                   }
                   req.token = token;
                   req.rootUser = rootUser;
                   req.userID = rootUser._id;               
                   
                   next();

                }catch(err){
            res.status(401).send('Unauthorized: No token provided')
                console.log(err);
        }
}


module.exports = Authenticate;