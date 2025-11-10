import express from 'express';
import {isValidEmailControl,  isValidSouthAfricaNumber, isAlphaOnly } from '../models/Validations.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const generateToken = (userId) =>{
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});
};

router.post("/register", async (req, res) =>{
    
    try
    {
        const { name, surname, email, contact, password, confirmPassword } = req.body;
        if(!name || !surname || !email || !contact ||!password || confirmPassword)
        {
            return res.status(400).json(
                {
                    message: "Please fill all fields"
                }
            );
        }
        if(!isAlphaOnly(name))
        {
            return res.status(400).json(
                {
                    message: "Name can only contain letters"
                }
            );
        }
        if(!isAlphaOnly(surname))
        {
            return res.status(400).json(
                {
                    message: "Surname can only contain letters"
                }
            );
        }
        if(!isValidEmailControl(email))
        {
            return res.status(400).json(
                {
                    message: "Invalid email address format"
                }
            );
        }

        if(!isValidSouthAfricaNumber(contact))
        {
            return res.status(400).json(
                {
                    number: "Invalid contact number format"
                }
            );
        }
        if(password.length < 6)
        {
            return res.status(400).json(
                {
                    message: "Password must be at least 6 characters long"
                });
        }
        if(password !== confirmPassword)
        {
            return res.status(400).json(
                {
                    message: "Passwords do not match!"
                });
        }

        const checkUser = await User.findOne({email})
        if(checkUser)
        {
            return res.status(400).json(
                {
                    message: "Email already exists"
                }
            );
        }

        const user = new User({
            name,
            surname,
            email,
            contact,
            password
            
        });
        
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                contact: user.contact
            },
        });


    }
    catch(error)
    {
        console.log("Error in register route: ", error);
        res.status(500).json(
            {
                message: "Internal server error"
            }
        );
    }
    
});

router.post("/login", async (req, res) =>{
    const {email, password } = req.body;
    try
    {
        if(!email || !password)
        {
            res.status(400).json(
                {
                    message: "All fields are required"
                }
            );
        }

        const user = await User.findOne({email});
        if(!user)
        {
            res.status(400).json(
                {
                    message: "Invalid credentials"
                }
            );
        }

        const isPassCorrect = await user.comparePasswords(password);
        if(!isPassCorrect)
        {
            res.status(400).json(
                {
                    message: "Invalid credentials"
                }
            );
        }

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                contact: user.contact
            },
        });

    }
    catch(error)
    {
        console.log("Error in login route: ", error);
        res.status(500).json(
            {
                message: "Internal server error"
            }
        );
    }
});


export default router;