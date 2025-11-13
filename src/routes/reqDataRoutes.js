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
        if(!identityNumber || !contact || !email || !name || !lastName || !title || !gender, !age)
        {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        } 
        if(isNumeric(identityNumber)){
            return res.status(400).json({
                message: "ID Number can only contain digits"
            });
        }
        if(identityNumber.length != 13)
        {
            return res.status(400).json(
                {
                    message: "Invalid ID Number"
            });
        }
        if(!isValidSouthAfricaNumber(contact))
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
        if(!isAlphaOnly(name))
        {
            return res.status(400).json(
                {
                    message: "Name can only contain letters"
                }
            );
        }
        if(!isAlphaOnly(lastName))
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

    } catch (error) {
        console.log("Error creating userProfile: ", error);
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;