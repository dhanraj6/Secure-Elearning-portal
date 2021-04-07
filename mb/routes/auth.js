var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const {signout, signup, signin, isSignedin} = require("../controllers/auth");


router.post("/signup", [
    check("name", "name should be atleast 3 chars").isLength({min: 3}),
    check("email", "email to be provided").isEmail(),
    check("password", "password field is required").isLength({min: 3})
], signup);


router.post("/signin", [
    check("email", "email to be provided").isEmail(),
    check("password", "password field is required").isLength({min: 3})
], signin);

router.get("/signout", signout);

router.get("/testroute",isSignedin, (req,res) => {
    res.send("a protected route")
});

module.exports = router;