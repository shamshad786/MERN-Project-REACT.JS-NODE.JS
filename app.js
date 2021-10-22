const express = require('express')
const app = express();
const cookieParser =require("cookie-parser");

require('dotenv').config();

//database connection
require('./db/conn');
app.use(express.json());

//User Schema database 
const User = require('./model/userSchema');

//middleware
app.use(cookieParser())
app.use(require('./router/auth'));
//app.use(express.json());


//heroku production deployment code

if(process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    })
}


const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server running on ${port}`)
});
