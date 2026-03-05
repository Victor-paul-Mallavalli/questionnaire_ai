import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        if (user) {
            generateTokenAndSetCookie(user._id,res);
            await user.save();
            res.status(201).json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                message: "User created successfully"
             });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in Signup controller:", error.message);
    }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log("Login error:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

export const logout = (req, res) => {
  try {

    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: false
    });

    res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};