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

router.post("/", protectRoute, async( eq, res) => {
    try {
        const { owner , identityNumber, contact, email, name, lastName, title } = req.body;
        if(!owner || !identityNumber || !contact || !email || !name || !lastName || !title)
        {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        } 
        if(isNumeric(identityNumber)){
            return res.status(400).json({
                message: "ID Number can only contain digits"
            })
        }
        if(identityNumber.length !== 13)
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
        const userProfile = new Profile({
            owner,
            identityNumber,
            contact, 
            email,
            name,
            lastName,
            title,
            user: req.user._id
        });

        await userProfile.save();
        res.status(201).json(userProfile);

    } catch (error) {
        console.log("Error creating userProfile");
        res.status(500).json({
            message: error.message
        });
    }
});

export default router;