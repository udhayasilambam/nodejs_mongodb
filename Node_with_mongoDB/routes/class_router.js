const express = require('express');
const router = express.Router();

const ClassSchema = require('../models/class_schema')

router.get('/',async(req,res)=>{
    try {
        const SchemasResponse=await ClassSchema.find();
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
})

router.put('/:id',async(req,res)=>{
    try {
        const SchemasResponse=await ClassSchema.findOne({
            class:req?.body?.class,
            section: req?.body?.section,
        });
        if(SchemasResponse){
            res.send("Class Already Exist");
        }else{
            const SavedData= await ClassSchema.updateOne(
                {
                    _id:req?.params?.id,
                },
                {
                    class:req?.body?.class,
                    section: req?.body?.section,
                }
            );
            res.json(SavedData);
        }
    } catch (error) {
        res.send("Error : "+error);
    }
})

router.post('/',async(req,res)=>{
    try {
        const SchemasResponse=await ClassSchema.findOne({
            class:req?.body?.class,
            section: req?.body?.section,
        });
        if(SchemasResponse){
            res.send("Class Already Exist");
        }else{
            const Classdata= new ClassSchema({
                class:req?.body?.class,
                section: req?.body?.section,
            })
            const SavedData= await Classdata.save();
            res.json(SavedData);
        }
    } catch (error) {
        res.send("Error : "+error);
    }
})

module.exports = router;