// const express = require('express')
// const router = express.Router()

// router.use(express.json())
// router.use(express.urlencoded({extended:true}))

// const path = require('path')

// const Signup = require('../model/Signup')

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await Signup.findOne({ email: email, password: password });
  
//       if (!user) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
  
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
  
//       const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
//       res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });
  
//       res.status(200).json({ message: "Login successful", user });
//     } catch (err) {
//       console.error('Error during login:', err);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   module.exports = router