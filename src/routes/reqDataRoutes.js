import express from 'express';
import {
    isValidEmailControl,  
    isValidSouthAfricaNumber, 
    isAlphaOnly,
    isNumeric
} from '../models/Validations.js';
import Profile from '../models/UserProfile.js';

import protectRoute from '../middleware/auth.middleware.js';


const router = express.Router();

router.post("/userProfile", protectRoute, async( req, res) => {
    try {
        const { identityNumber, contact, email, name, lastName, title, gender, age } = req.body;
        if(!identityNumber || !contact || !email || !name || !lastName || !title || !gender || !age)
        {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        } 
        if(identityNumber && isNumeric(identityNumber)){
            return res.status(400).json({
                message: "ID Number can only contain digits"
            });
        }
        if(identityNumber && identityNumber.length !== 13)
        {
            return res.status(400).json(
                {
                    message: "Invalid ID Number"
            });
        }
        if(contact && !isValidSouthAfricaNumber(contact))
        {
            return res.status(400).json(
                {
                    number: "Invalid contact number format"
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
        if(name && !isAlphaOnly(name))
        {
            return res.status(400).json(
                {
                    message: "Name can only contain letters"
                }
            );
        }
        if(lastName && !isAlphaOnly(lastName))
        {
            return res.status(400).json(
                {
                    message: "Last name can only contain letters"
                }
            );
        }
        if(isNumeric(age)){
            return res.status(400).json({
                message: "Age can only contain digits"
            });
        }

        const userProfile = new Profile({
            identityNumber,
            contact, 
            email,
            name,
            lastName,
            title,
            gender,
            age,
            user: req.user._id
        });
        
        await userProfile.save();
        res.status(201).json({ message: "Profile successfully created" });
    } catch (error) {
        console.log("Error creating User Profile: ", error);
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;