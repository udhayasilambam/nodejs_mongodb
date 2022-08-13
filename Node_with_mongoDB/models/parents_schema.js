const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    parant_name: {
        type:String,
        required:true,
    },
    parant_type: {
        type:String,
        required:true,
    },
    mobile_number:{
        type:String,
        required:false,
    },
    email_id:{
        type:String,
        required:false,
    },
    is_deleted:{
        type:Boolean,
        default:true,
    },
})

module.exports = mongoose.model('Parentschema',ParentSchema)