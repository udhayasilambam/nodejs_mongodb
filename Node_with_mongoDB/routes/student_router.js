const express = require('express');
const router = express.Router();

const Studentschema = require('../models/student_schema');
const Parantschema = require('../models/parents_schema');
const ClassSchema = require('../models/class_schema');

router.get('/all',async(req,res)=>{
    try {
        let StudentData=await Studentschema.find({
            is_active:true
        });
        res.send(StudentData);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
})
router.get('/:id',async(req,res)=>{
    try {
        let StudentData=await Studentschema.findOne({
            _id:req?.params?.id
        });
        const parentDataValue=await Parantschema.findOne({
            _id:StudentData?.parent_id
        });
        const classDataValue=await ClassSchema.findOne({
            _id:StudentData?.class_id
        });
        res.send({
            StudentData,parentDataValue,classDataValue
        });
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});

router.put('/:id',async(req,res)=>{
    try {
        let ClassResponse;
        if(req?.body?.class && req?.body?.section){
            ClassResponse=await ClassSchema.findOne({
                class: req?.body?.class,
                section: req?.body?.section,
            });
        }
        if(ClassResponse || (!req?.body?.class && !req?.body?.section)){
            await Studentschema.updateOne(
                {
                _id:req?.params?.id
                },
                {
                    name: req?.body?.name,
                    academic_year:req?.body?.academic_year,
                }
            );
            let StudentData=await Studentschema.findOne({
                _id:req?.params?.id
            });
            await Parantschema.findOne(
                {
                _id:StudentData?.parent_id
                },
                {
                    parant_name:req?.body?.parant_name,
                    parant_type: req?.body?.parant_type,
                    mobile_number:req?.body?.mobile_number,
                    email_id:req?.body?.email_id,
                }
            );
            await ClassSchema.findOne(
                {
                _id:StudentData?.class_id
                },
                {
                    class: req?.body?.class,
                    section: req?.body?.section,
                }
            );
        }else{
            if(!req?.body?.class || !req?.body?.section){
                res.send("Please Check Class and section");
            }else{
                res.send("Invalid Class and section");
            }
        }
        res.send(StudentData);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});

router.put('/active/:id',async(req,res)=>{
    try {
        await Studentschema.updateOne(
            {
            _id:req?.params?.id
            },
            {
                is_active: true,
            }
        );
        res.send("Activated");
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});


router.delete('/:id',async(req,res)=>{
    try {
        await Studentschema.updateOne(
            {
            _id:req?.params?.id
            },
            {
                is_active: false,
            }
        );
        res.send("Deleted");
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});
router.delete('/',async(req,res)=>{
    try {
        const SchemasResponse=await Studentschema.delete();
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
})

router.post('/',async(req,res)=>{
    try {
        const ClassResponse=await ClassSchema.findOne({
            class: req?.body?.class,
            section: req?.body?.section,
        });
        if(ClassResponse?._id){
            const SaveParentdata= new Parantschema({
                parant_name:req?.body?.parant_name,
                parant_type: req?.body?.parant_type,
                mobile_number:req?.body?.mobile_number,
                email_id:req?.body?.email_id,
            });
            const ParentData= await SaveParentdata.save();
            const SaveStudentdata= new Studentschema({
                name: req?.body?.name,
                dob: new Date(),
                class_id: ClassResponse?._id,
                parent_id: ParentData?._id,
                academic_year:req?.body?.academic_year,
            });
            const SavedData= await SaveStudentdata.save();
            res.json(SavedData);
        }else{
            res.send("Class dose not exist");
        }
    } catch (error) {
        res.send("Error : "+error);
    }
})

module.exports = router;