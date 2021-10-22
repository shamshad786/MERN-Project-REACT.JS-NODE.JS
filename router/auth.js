const express = require('express');
require('../db/conn');
const User = require('../model/userSchema');
const router = express.Router()
const bcrypt = require('bcryptjs') // ye password hashing ke liye use kiya hai, 
//const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')
const Form = require('../model/formData');

// ye promises ke sath hai then & cath ke sath

// router.post('/register',(req,res)=>{ 
   
//     const {name, email, phone, work, password, cpassword} =  req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: 'all fields are require'});
//     }
//         User.findOne({email: email}).then((userExist)=>{

//             if(userExist){
//                 return res.status(422).json({error: 'E-Mail Already Exist'});
//             }
//                 const user = new User ({name, email, work, phone, password, cpassword});
                
//                 user.save().then(()=>{
//                     res.status(201).json({message: "user registered"});
//                 }).catch((err)=>{
//                     res.status(500).json({error: "There is error user not saved"});
//                     console.log(err)
//                 })
//         }).catch((err)=>{
//             console.log(err)
//         });
// });
//--------------------------------------------------------------------------------------------------------
router.post('/register', async(req,res)=>{ // async await
   
    const {name, email, phone, work, password, cpassword} =  req.body; // ye user se data get karne ke liye hai jab user react page ke register page se form data fill karega usko yaha aise get kar skate hai
        // console.log(req.body)
        // res.status(201).json({message: " user input fields data "+ name,email,phone,work,password,cpassword});
    if(!name || !email || !phone || !work || !password || !cpassword){ // ye validation hai kiya hai agar user koi ek bhi field nahi bharta hai to error throw kiya hai
        return res.status(422).json({error: 'all fields are require'});// ye server se status error send kiya json format me jab bhi koi field reh jata hai 
    }
         try{
       const userExist = await User.findOne({email: email}); // ye agar use saare field sahi se bharta hai to aur karega to us user ke email ko serch karega 

       if(userExist){
        return res.status(423).json({error: 'E-Mail Already Exist'}); // ye validation me agar email same milta hai to json error send kiya server se
    }else if(password != cpassword){ // yaha pe password ka validation check kiya agar same password nahi hota hai to
        return res.status(424).json({error: "password not matching"}); // pass matching na hone pr json json error server se send kiya hai
    }
    else{
        const user = new User ({name, email, work, phone, password, cpassword}); // aur yaha pr agar user saare details sahi se fill karta hai to uska detail form me save karega
        const userRegister = await user.save();// yaha pr user save ho jayega
            if (userRegister){
                res.status(201).json({message: "user registered"});// user save ho jata hai to usko response json format me send kiya hai
            }else {
                res.status(500).json({error: "There is error user not saved"}); // aur agar koi error aa jata hai user save nahi hota hai to json error send kr dega
            }
    }
        
    }catch(err){
        console.log("something went wrong " + err); 

    }              
});

//LOGIN Route & Validation 
router.post('/signin', async(req,res)=>{
    // console.log(req.body);
    // res.json({message: "sign in response"});

    const {email, password} = req.body;// yaha pr use react ke login page se form ke field me data fill karega to usko get kiya hai

    if(!email || !password){
        return res.status(400).json({error: "All Fields are required" });// agar koi field reh jata hai to json error sever send kar dega
    }
        const userLogin = await User.findOne({email:email});// yaha email se databse ke ander se us user ko search karega 
        console.log(userLogin);
        if(userLogin){ // agar use mil jata hai to 
            const isMatch = await bcrypt.compare(password, userLogin.password);// agar user mil jata hai to uska passowrd jo bcrypt form me save kiya hai  database me ussey match karega
            
            const token = await userLogin.generateAuthToken();//yaha jwt token generate kiya hai jab bhi user login karega to sab fields sahi hone pr uska token 'generateAuthToken()' function call ho jayega jo ki humne userSchema.js me logic banaya hai 
            console.log(token)

            res.cookie('jwToken', token,{ // yaha login hote hai use ke cookies me 'jwToken' ke naame ke ander uska token generate ho ke save ho jayega
                expires: new Date(Date.now()+25892000000),// ye us user ke cookies ko expire karne ka time set kiya milli seconds me hai means 30 days
                httpOnly: true // ye isliye likha taki locak host ke bina https ke server bhi cookies run kare, kyuki cookies https pr hi save hota hai
            });

        if(!isMatch){ // yaha pr agar password match nahi hota hai to json error server send kar dega 
            return res.status(400).json({error: "Invalid Credentials"});// yaha agar password match nahi hua to password wrong wala error server send kar dega
        }else{
            return res.status(200).json({message: "User Login"});// aur sab fields sahi hota hai aur koi error nahi hota hai to user login ho jayega
        }
        }else {
            return res.status(400).json({error: "Invalid Credentials"}); // aur user login pr yaha email wrong dalta hai to email wrong ka json error send hoga
        }
        

});


//authentication for JWT Token
router.get('/about',authenticate , (req,res)=>{ // ye path pr 'authenticate' middleware use kiya hai taki react ke about page pr user ki saari details ko get karne ke liye hai
    console.log("This is about page from server side")
    res.send(req.rootUser);// is 'req.rootUser' ke ander use ki saari A to Z detail h jo authenticate.js me get kiya hai, yaha server react ke page pr saara data send kr dega
});


//get user data for contact and home page 
router.get('/getdata', authenticate,(req,res)=>{// is path pr bhi user ka saara data jisko react ke contact wale page pr user ka data get kar ke contacts ke fields me dynamically show kiya hai
    console.log("this is get data route")
    res.send(req.rootUser);// is 'req.rootUser' ke ander use ki saari A to Z detail h jo authenticate.js me get kiya hai, yaha server react ke page pr saara data send kr dega
});


router.post('/contact',authenticate,async (req,res)=>{
     try {
            const {name,email,phone,message} = req.body; // ye user ke fields ko get kiya jo user contact ke page se message bhejne ke liye fields ko fill karega

            if(!name || !email || !phone || !message){// yaha koi bhi fields me data fill hona reh jata hai to server json error send kar dega 
                console.log("error in contact form from server side");
                return res.status(422).json({error: "fill the details in contact form"});
            }
            

            //ye code hai form se data ko alag collection me save karne ke liye hai 
            // else {                       
            //     const form = await new Form ({name,email,phone,message});
            //     const formDataSave =  await form.save();
            //     if (formDataSave){
            //         res.status(201).json({message: "message saved "});
            //     }else {
            //         res.status(500).json({error: "There is error message not saved"});
            //     }
            // }

            const userContact = await User.findOne({_id:req.userID}); // aur ye code usi user collection ke ander hi new object bana ke contact ke data ko save karne ke liye hai

            if(userContact){
                    const userMessage =  await userContact.addMessage(name,email,phone,message);// ye function call hoga jab user apna message send karega uske saare fields ko 'addMessage()' function me ye fields 'name,email,phone,message' as parameter diya hai, is parameter fucntion me get kar ke mesage save kiya hai jisko humne userSchema.js me define kiya hai
                    await userContact.save();// aur use ke message ko yaha save kiya hai.
                    res.status(201).json({message: 'form data has been saved'}); // yaha server json response  send kar dega jab message save ho jayega
            }
     }catch(err){
         console.log(err)
     }
});


//logout functionality define

router.get('/logout',(req,res)=>{ // is path pr simple logout logic hai jab bhi user react ke site se logout pr click karega
    console.log('logout from server side');
    res.clearCookie('jwToken',{path:'/'})// logout ke liye simple cookies ko clear kiya hai jaise hi cookies clear hoga user identify nahi hoga aur wo bina login kare about,conatct ke pages pr nahi jaa sakta
    res.status(200).send('User logout');
})

module.exports = router;