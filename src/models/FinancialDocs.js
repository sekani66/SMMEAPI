import mongoose from "mongoose";


const financialPDFSchema = new mongoose.Schema({
    documentType: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    storagePath: {
        type: String,
        required: true,
        unique: true
    },
    mimetype: {
        type: String,
        default: 'application/pdf'
    },
    size: {
        type: Number,
        required: true
    },
}, 
    {
    timestamps: true
});

const FinancialPdf = mongoose.model('FinancialPdf', financialPDFSchema);
export default FinancialPdf;