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

userSchema.pre('save', async function(next){ //this.password aur this.cpassword hai wo uper schema wala password hai jo user dalega 
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});
//JWT token generate 
userSchema.methods.generateAuthToken = async function(){
        try{
            let tokenGenerate = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token: tokenGenerate});
            this.save();
            return tokenGenerate;
        }catch(err){
            console.log('jwt token generate problem '+err)

        }
}
// store form data from contact page

userSchema.methods.addMessage =  async function (name,email,phone,message){
    try{
            this.messages = this.messages.concat({name,email,phone,message});
            await this.save();
            return this.messages;
    }catch(err){
        console.log(err)
    }
}


const User = mongoose.model('USER', userSchema)

module.exports = User;




