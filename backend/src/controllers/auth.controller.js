import emailNotification from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be at least 6 characters"})
        }
        //check if email is valid : Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email"})
            
        }
        //whatif email already existed
        const user = await User.findOne({email})
        if(user)  return res.status(400).json({message: "Email Already exists"})
        // ok so hash the password now!
        
        const salt = await bcrypt.genSalt(10)
        console.log(salt)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if(newUser){
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res);
            
            await emailNotification(newUser.fullName, newUser.email); //third parameter should be app link.

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email:newUser.email,
                profilePic: newUser.profilePic,
            })

        }
        else{
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller:", error)
        res.status(500).json({message: "Internal server error!"})
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //check this email exists or not, if exists then rehash the password then simply create token, and login.
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "Invalid credentials"})
        
        const isPassMatch = await bcrypt.compare(password, user.password)
        if(!isPassMatch) return res.status(400).json({message: "Invalid credentials"})
        
        if(user){
            generateToken(user._id, res);
            res.status(200).json({message: "You have successfully logged in."})
        }
        else{
            res.status(400).json({message: "Invalid credential"})
        }
        
        
    } catch (error) {
        console.log("Error in login controller:", error)
        res.status(500).json({message: "Internal server error!"})
    }
}

export const logout = (_ , res) => {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "You have logged out successfully"})
}

export const updateProfile = async (req, res) => {
    try {
        const profilePic = req.body;
        if(!profilePic) return res.status(400).json({message: "Profile pic is required!"})
        
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(  //puted cloudinary url into database.
            userId,  
            {profilePic : uploadResponse.secure_url},
            {new: true}
        ).select("-password");
        res.status(200).json(updatedUser);



    } catch (error) {
        console.log("Error in updating profile pic:", error)
        res.status(500).json({message: "Internal server error!"})
    }
}