const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const Signature = "Suraj12365";
// Create User using: POST "/api/auth/register" 
router.post(
  "/register",
  [
    body("username").isLength({ min: 5 }),
    body("email", "Enter valid email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.send({ success, errors: errors.array() });
    }
    try {
      const { email } = req.body;
      let existingUser = await User.findOne({ email });
      console.log(existingUser);

      if (existingUser) {
        success = false;
        return res
          .status(400)
          .json({ success, errors: [{ msg: "User already exists with this email" }] });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: secPass,
        });

        const data = {
          user: {
            id: user.id,
          },
        };
        const token = jwt.sign(data, Signature);
        success = true;
        return res.json({success,token});
      }
    } catch (err) {
      console.error("Error creating User", err);
      return res.status(500).send("Server Error");
    }
  }
);
// Authenticate a User using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({success, errors: "Please enter correct credentials" });
      } else {
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
          success = false;
          return res
            .status(400)
            .json({ success, errors: "Please enter correct credentials" });
        }
        const data = {
          user: {
            id: user.id,
          },
        };

        const token = jwt.sign(data, Signature);
        success =true;
        return res.json({ success,token});
      }
    } catch (error) {
      console.error("Error creating User", error);
      return res.status(500).send("Server Error");
    }
  }
);

// Get logged in user details

router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
    
  } catch (error) {
    console.error("Error creating User", error);
    return res.status(500).send("Server Error");
  }
})

module.exports = router;
