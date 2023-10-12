const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const app=express();

const port=3000;
const userRoute=require('./routes/user.router');
const authRoute=require('../src/routes/auth.router');
//parses incoming requests
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:'http://localhost:5173', 
        credentials:true,            
        optionSuccessStatus:200
    }
))

//default route
app.use("/api/user/", userRoute);
app.use("/api/auth/", authRoute);

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}/api`);
});