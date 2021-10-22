const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required:true
            },
            phone:{
                type: Number,
                required:true
            },
            message:{
                type: String,
                required:true
            }

        }
    ],
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})
//password hashing

userSchema.pre('save', async function(next){ // yaha schema me user ka 'passward data' save hone se pehle hash kiya hai thk kab aur kiske pehle save karna hai to batane ke liye 'pre()' use kiya hai jisme 'save' dala hai ye wo 'save' jo user register karne pr jaha '/register' ke path pr jaha 'save()' call kiya databse me user ko save karne liye thk us save se pehle password bcrypt kar dega aur  this.password aur this.cpassword hai wo uper schema wala password hai jo user dalega 
    if(this.isModified('password')){ // yaha pr normal function as middleware define kiya hai kyu ki arrow function 'this' operator ko understand nahi karta hai
        this.password = await bcrypt.hash(this.password,12);// yaha pssword aur cpassword dono ko hash kiya hai taki database me password plain text me naa dikhe
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();// sab sahi hone pr middleware ko next call kiya takii code nex line pr jaa sake
});
//JWT token generate 
userSchema.methods.generateAuthToken = async function(){ // yaha token generate ka function define kiya jisko humne  /signin  path me call kiya jab user login karega
        try{
            let tokenGenerate = jwt.sign({_id: this._id}, process.env.SECRET_KEY);// yaha pr humne token  create kiya hai jwt token create karne ke liye 'jwt.sign()' ka use karte hai ye 2 parameter accept karta hai 1 'object{}' jo ki unique hona chahiye aur dusra ek 'Sting' ya ek secret key 
            this.tokens = this.tokens.concat({token: tokenGenerate});// yaha token  ko Schema ke ander 'tokens' key ke ander 'token'  ke value me generate kiya hua token save karenge
            this.save();// yaha token generate karne ke baad usko save kiya hai
            return tokenGenerate;// yaha 'tokenGenerate' ko return kiya hai taki usko use kar sake
        }catch(err){
            console.log('jwt token generate problem '+err)

        }
}
// store form data from contact page

userSchema.methods.addMessage =  async function (name,email,phone,message){ // ye logic isliye banaya hai agar same user '/contact' ke page se message send karta hai to same use ke database ke collection me message ko save kar dega is 'addMessage' ke function ko '/contact' path pr auth.js me call kiya hai aur yahaye user ke contact wale page ke fields 'name,email,phone,message' ko as parameter get karega isko humne 'addMessage()' ke ander /contach me path pt define kiya hai
    try{
            this.messages = this.messages.concat({name,email,phone,message}); // yaha schema me 'messages' ke naame se fields banai hai aur uske ander 'name,email,phone,message' is fields ko define kiya taki iske ander user ka message save ho aur uske baki ke details bhi
            await this.save();// fir us message ko user ke same database ke collection me save kiya hai
            return this.messages;// fir us message ko return kiya taki usko use kar ke save kiya hai
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('USER', userSchema)

module.exports = User;




