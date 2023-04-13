import { model, Schema } from "mongoose";

const adminSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: Number,
        required: true
    },
    pasword: {
        type: String,
        required: true
    }
});
export default model('adminModel', adminSchema);