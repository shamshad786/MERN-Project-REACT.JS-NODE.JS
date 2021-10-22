const express = require('express')
const app = express();
const cookieParser =require("cookie-parser"); // ye hume jarurat padti hai react.js se jab cookies server pr send karte hai usko parse karne ke liye

require('dotenv').config();

//database connection
require('./db/conn');
app.use(express.json());

//User Schema database 
const User = require('./model/userSchema');

//middleware
app.use(cookieParser())// yaha cookies ko use kiya as middleware taki server pr use kar sake
app.use(require('./router/auth'));
//app.use(express.json());


//heroku production deployment code

if(process.env.NODE_ENV == 'production') { // ye code heroku pr host karne ke liye hai likhan padta hai jab hum react,node ke project ko host karte hai
    app.use(express.static("client/build"));// ye react ke production build folder ka location hai 
    // app.get('*',(req,res)=>{
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')
    //     );
    // })
}


const port = process.env.PORT || 8000; 
app.listen(port,()=>{
    console.log(`server running on ${port}`)
});
