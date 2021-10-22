const express = require('express');
require('../db/conn');
const User = require('../model/userSchema');
const router = express.Router()
const bcrypt = require('bcryptjs')
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
   
    const {name, email, phone, work, password, cpassword} =  req.body;
        // console.log(req.body)
        // res.status(201).json({message: " user input fields data "+ name,email,phone,work,password,cpassword});
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: 'all fields are require'});
    }
         try{
       const userExist = await User.findOne({email: email});

       if(userExist){
        return res.status(423).json({error: 'E-Mail Already Exist'});
    }else if(password != cpassword){
        return res.status(424).json({error: "password not matching"});
    }
    else{
        const user = new User ({name, email, work, phone, password, cpassword});
        const userRegister = await user.save();
            if (userRegister){
                res.status(201).json({message: "user registered"});
            }else {
                res.status(500).json({error: "There is error user not saved"});
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

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "All Fields are required" });
    }
        const userLogin = await User.findOne({email:email});
        console.log(userLogin);
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            const token = await userLogin.generateAuthToken();//jwt token generate
            console.log(token)

            res.cookie('jwToken', token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly: true 
            });

        if(!isMatch){
            return res.status(400).json({error: "Invalid Credentials"});
        }else{
            return res.status(200).json({message: "User Login"});
        }
        }else {
            return res.status(400).json({error: "Invalid Credentials"});
        }
        

});


//authentication for JWT Token
router.get('/about',authenticate , (req,res)=>{
    console.log("This is about page from server side")
    res.send(req.rootUser);
});


//get user data for contact and home page 
router.get('/getdata', authenticate,(req,res)=>{
    console.log("this is get data route")
    res.send(req.rootUser);
});


router.post('/contact',authenticate,async (req,res)=>{
     try {
            const {name,email,phone,message} = req.body;

            if(!name || !email || !phone || !message){
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

            const userContact = await User.findOne({_id:req.userID}); // aur ye code usi user collection ke ander hi new object bana ke data save karne ke liye hai

            if(userContact){
                    const userMessage =  await userContact.addMessage(name,email,phone,message);
                    await userContact.save();
                    res.status(201).json({message: 'form data has been saved'});
            }
     }catch(err){
         console.log(err)
     }
});


//logout functionality define

router.get('/logout',(req,res)=>{
    console.log('logout from server side');
    res.clearCookie('jwToken',{path:'/'})
    res.status(200).send('User logout');
})

module.exports = router;