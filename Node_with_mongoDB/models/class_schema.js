const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    class: {
        type:Number,
        required:true,
    },
    section:{
        type:String,
        required:false,
    },
    is_deleted:{
        type:Boolean,
        default:false,
    },
})

module.exports = mongoose.model('ClassSchema',ClassSchema)