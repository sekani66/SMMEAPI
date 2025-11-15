import express from 'express';
import {
    isValidEmailControl,  
    isValidSouthAfricaNumber, 
    isAlphaOnly,
    isNumeric
} from '../models/Validations.js';
import Profile from '../models/UserProfile.js';
import BusinessProfile from '../models/BusinessProfile.js';
import OwnerProfile from '../models/OwnerProfile.js';
import FundingRequirements from '../models/FundingRequirements.js';

import protectRoute from '../middleware/auth.middleware.js';


const router = express.Router();

router.post("/userProfile", protectRoute, async( req, res) => {
    try {
        const { identityNumber, contact, email, name, lastName, title, gender, age } = req.body;
        if(!identityNumber || !contact || !email || !name || !lastName || !title || !gender || !age)
        {
            return res.status(400).json({message: "Please fill all the required fields" });
        } 
        if(identityNumber && isNumeric(identityNumber)){
            return res.status(400).json({message: "ID Number can only contain digits"});
        }
        if(identityNumber && identityNumber.length !== 13)
        {
            return res.status(400).json({message: "Invalid ID Number"});
        }
        if(contact && !isValidSouthAfricaNumber(contact))
        {
            return res.status(400).json({number: "Invalid contact number format"});
        }
        if(!isValidEmailControl(email))
        {
            return res.status(400).json({message: "Invalid email address format"});
        }
        if(name && !isAlphaOnly(name))
        {
            return res.status(400).json({message: "First Name can only contain letters"});
        }
        if(lastName && !isAlphaOnly(lastName))
        {
            return res.status(400).json({message: "Last name can only contain letters"});
        }
        if(isNumeric(age)){
            return res.status(400).json({
                message: "Age can only contain digits"
            });
        }
        const existingProfile = await Profile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(200).json({success: true});
        }

        const id = await Profile.findOne({ identityNumber });
        if (id) {
            return res.status(200).json({success: true});
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
        console.log("Error creating User Profile: ", error);
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/businessProfile", protectRoute, async(req, res) => {
    try {
        const { businessName, regNo, taxNo, businessType, businessSector, tradingYears, 
                employeeNo, email, contact, physicalAddress, postalAddress } = req.body;

        if(!businessName || !regNo || !taxNo || !businessType || !businessSector || !tradingYears 
            || !employeeNo || !email || !contact || !physicalAddress || !postalAddress){
                return res.status(400).json({message: "Please fill all the required fields"})
            }
            if(regNo && isNumeric(regNo)){
                return res.status(400).json({message: "Registration Number can only include digits"});
            }
            if(regNo && regNo.length < 12){
                return res.status(400).json({message: "Invalid Registration Number"});
            }
            if(taxNo && isNumeric(taxNo)){
                return res.status(400).json({message: "Tax Number can only include digits"});
            }
            if(taxNo && taxNo.length < 10){
                return res.status(400).json({message: "Invalid Tax Number"});
            }     
            if(tradingYears && isNumeric(tradingYears)){
                return res.status(400).json({message: "Trading years is number of business operation years"});
            }
            if(employeeNo && isNumeric(employeeNo)){
                return res.status(400).json({message: "Invalid number of employees"});
            }
            if(email && !isValidEmailControl(email)){
                return res.status(400).json({message: "Invalid business email"});
            }
            if(contact && !isValidSouthAfricaNumber(contact)){
                return res.status(400).json({message: "Invalid business contact number"});
            }
            const existingProfile = await Profile.findOne({ user: req.user._id });
            if (existingProfile) {
                return res.status(200).json({success: true});
            }
            const id = await Profile.findOne({ regNo });
            if (id) {
                return res.status(200).json({success: true});
            }
            const tax = await Profile.findOne({ taxNo });
            if (tax) {
                return res.status(200).json({success: true});
            }
            const mail = await Profile.findOne({ email });
            if (mail) {
                return res.status(200).json({success: true});
            }

            const businessProfile = new BusinessProfile({
                businessName, 
                regNo, 
                taxNo, 
                businessType, 
                businessSector, 
                tradingYears, 
                employeeNo, 
                email, 
                contact, 
                physicalAddress, 
                postalAddress, 
                user: req.user._id
            });
            await businessProfile.save();
    } catch (error) {
        console.log("Error creating Business Profile: ", error);
        res.status(500).json({message: error.message});
    }
});

router.post("/ownerDetails", protectRoute, async( req, res ) =>{
    try {
        const { ownerName, ownerLastName, ownerID, ownerEmail, ownerContact, maritalStatus, ownerAge, homeAddress, shareOwners } = req.body;
        if(!ownerName || !ownerLastName || !ownerID || !ownerEmail || !ownerContact || !maritalStatus || !ownerAge || !homeAddress || !shareOwners){
            return res.status(400).json({message: "Please fill all the required fields"});
        }
        if(ownerName && !isAlphaOnly(ownerName)){
            return res.status(400).json({message: "Invalid first name format"});
        }
        if(ownerLastName && !isAlphaOnly(ownerLastName)){
            return res.status(400).json({message: "Invalid last name format"});
        }
        if(ownerID && isNumeric(ownerID) || ownerID.length < 13){
            return res.status(400).json({message: "Invalid ID number"})
        }
        if(ownerEmail && !isValidEmailControl(ownerEmail)){
            return res.status(400).json({message: "Invalid email address format"});
        }
        if(ownerContact && !isValidSouthAfricaNumber(ownerContact)){
            res.status(400).json({message: "Invalid contact number"});
        }
        if(maritalStatus && !isAlphaOnly(maritalStatus)){
            return res.status(400).json({message: "Invalid marital status"});
        }
        if(ownerAge && isNumeric(ownerAge)){
            return res.status(400).json({message: "Invalid age number value"});
        }
        if(shareOwners && isNumeric(shareOwners)){
            return res.status(400).json({message: "Invalid share holders value"});
        }
        const id = await OwnerProfile.findOne({ ownerID });
        if(id) return res.status(200).json({success: true});
        const email = await OwnerProfile.findOne({ ownerEmail });
        if(email) return res.status(200).json({success: true});
        const user = await OwnerProfile.findOne({ user: req.user._id});
        if(user) return res.status(200).json({success: true});

        const ownerDetails = new OwnerProfile({
            ownerName,
            ownerLastName,
            ownerID,
            ownerEmail,
            ownerContact,
            maritalStatus,
            ownerAge,
            homeAddress,
            shareOwners,
            user: req.user._id
        });
        await ownerDetails.save();

    } catch (error) {
        console.log("Error creating Owner Details: ", error);
        return res.status(500).json({message: error.message});
    }
});
router.post("/funds", protectRoute, async( req, res) =>{
    try {
        const { amount, purpose, fundingType, paymentPlan, exitStrategy } = req.body;
        if(!amount || !purpose || !fundingType || !paymentPlan || !exitStrategy ){
            return res.status(400).json({ message: "Please fill all the required fields"});
        }
        const id = await FundingRequirements.findOne({ user: req.user._id});
        if(id) return res.status(200).json({success: true});

        const fundingRequirements = new FundingRequirements({
            amount,
            purpose,            
            fundingType,
            paymentPlan,
            exitStrategy,
            user: req.user._id
        });
        await fundingRequirements.save();
    } catch (error) {
        console.log("Error saving funding requirements");
        return res.status(500).json({message: error.message});
    }
});
export default router;