import { model, Schema } from "mongoose";

const studentsSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    yob:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    }
});


export default model('studentsModel', studentsSchema)