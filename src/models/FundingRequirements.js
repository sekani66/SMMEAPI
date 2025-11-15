import mongoose from 'mongoose';

const fundReqSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    fundingType: {
        type: String,
        required: true,
    },
    paymentPlan: {
        type: String,
        required: true,
    },
    exitStrategy: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const FundingRequirements = mongoose.model("FundingRequirements", fundReqSchema);
export default FundingRequirements;