const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');



const Authenticate = async (req, res,next) =>{ // ye pura fucntion as middleware authentication ke liye banaya taki same user ko uske cookies ke ander jwt ke token se match kr ke verify kar sake
        try{
                const token = req.cookies.jwToken; // yaha token ko get kiya hai taki usko verify kar sake isko humne '/singup' ke path pr 'generateAuthToken()' ke function me generate kiya hai
                console.log(token)
                const verifyToken =  jwt.verify(token, process.env.SECRET_KEY);//  yaha token ko verify kiya hai verify ke liye 'jwt.verify' ka use kiya jata ye same wahi 'token aur secret key' leta hai jo 'generateAuthToken()' me generate kiya hai,& token aur secret key match kar jata hai to verifyToken ke ander apne aap sara user ka data aa jayega
                const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});// yaha database me user '_id' hai usko 'verifyToken' ke ander user ki saari details aa gai hai jab user verify ho gya hai uske ander bhi '_id' hai jab wo id aur database ke 'tokens' ke ander jo verifyToken wala 'token' wo match kar jata hai to token ko virfy kiya h jo 'verifytoken' ke ander user id h usko databse ke tokens ke ander jo token h usko match kiya h jo yaha cookies me jwt ka token hai
                console.log(rootUser._id)
                console.log(rootUser.name)

                if(!rootUser){
                    throw new Error('User not found'); // agar token match nahi hota hai user se to user nahi h uske ander matlab
                   }
                   req.token = token; // yaha sab detail match hone ke baad  'req.token' ke ander uper jo token get kiya hua h us token ko req.token me save kr diya taki auth.js me use kar sake
                   req.rootUser = rootUser; // req.rootUser ke ander user ki saari detail get kar ke save kiya hai
                   req.userID = rootUser._id;  // req.userID ke ander us user ki ID ko get kar ke save kiya hai             
                   
                   next();// fir yaha pr is middleware ko call kiya taki code aagey run kare

                }catch(err){
            res.status(401).send('Unauthorized: No token provided')// aur yaha token verify na hone pr user ko identify nahi karega 
                console.log(err);
        }
}


module.exports = Authenticate;