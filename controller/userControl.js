const userSch = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "REUNIONAPI"


const signup = async(req,res) => {

    const {email, password} = req.body;
    try{
        const userExist = await userSch.findOne({email: email});
        if (userExist){
            return res.status(400).json({message: "user exists"});
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const result = await userSch.create({
            email: email,
            password: hashedpassword
        });
        
        const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY)
        res.status(201).json({user: result, token: token}); 
    }catch(err){
        console.log(err)
        res.status(500).json({message: err});
    };
};


const signin = async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        console.log(req.body.email);
        const existingUser = await userSch.findOne({email: email}); 
        if (existingUser === null){
            return res.send("No user found");
        };
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (passwordMatch === false){
            return res.send("Invalid Credentials");
        };
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEY);
        res.json({user: existingUser, token: token});
    }catch(err){
        res.send(err);
    }
};  

module.exports = {signin,signup};