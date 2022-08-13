const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    class_id: {
        type:String,
        required:true,
    },
    parent_id: {
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:false,
    },
    academic_year:{
        type:String,
        required:true,
    },
    is_active:{
        type:Boolean,
        default:true,
    },
})

module.exports = mongoose.model('Studentschema',StudentSchema)