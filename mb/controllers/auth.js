const User = require("../models/user")
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup =  (req,res) =>{

    const errorFormatter = ({msg, param }) => {
        return `[${param}]: ${msg}`;
      };
      
    const result = validationResult(req).formatWith(errorFormatter);

    if(!result.isEmpty()){
        return res.status(422).json({
            error: result.array()
        })
    }

    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to save user in DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};

exports.signin = (req,res) => {
    
    const errorFormatter = ({msg, param }) => {
        return `[${param}]: ${msg}`;
      };
      
    const result = validationResult(req).formatWith(errorFormatter);

    const {email, password} = req.body

    if(!result.isEmpty()){
        return res.status(422).json({
            error: result.array()
        })
    }

    User.findOne({email}, (err, user) => {

        if(err || !user){
            return res.status(400).json({
                error : "user does not exists"
            });
        }

        //if email exists check password
        if(!(user.autheniciate(password))){
            return res.status(401).json({
                error: "email and passwod does not match"
            })
        }
        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
    
        //put token in cookie
        res.cookie("token", token, {expire: new Date + 9999});

        //send response to backend
        const {_id, name, email, role} = user;
        return res.json({
            token,
            user: {name, email, role, _id}
        });
    });
};

exports.signout =  (req,res) =>{
    res.clearCookie("token");
    res.json({
        messgae: "User Signout successfully"
    });
};

//protected routes
exports.isSignedin = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//custome made middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: " You are not admin, ACCESS DENIED"
        });
    }
    next();
}