const express = require('express');
const router = express.Router();

const Parantschema = require('../models/parents_schema');
router.get('/all',async(req,res)=>{
    try {
        const SchemasResponse=await Parantschema.find();
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});

router.get('/:id',async(req,res)=>{
    try {
        const SchemasResponse=await Parantschema.findOne({
            _id:req?.params?.id
        });
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});

router.put('/:id',async(req,res)=>{
    try {
        const SchemasResponse=await Parantschema.findOne(
            {
                _id:req?.params?.id
            },
            {
                parant_name:req?.body?.parant_name,
                parant_type: req?.body?.parant_type,
                mobile_number:req?.body?.mobile_number,
                email_id:req?.body?.email_id,
            }
        );
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
});
// router.delete('/:id',async(req,res)=>{
//     try {
//         await Parantschema.deleteOne({
//             _id:req?.params?.id,
//         });
//         res.send("deleted");
//     } catch (error) {
//         console.log("Error",error);
//         res.send("Error : "+error);
//     }
// })
router.put('/:id',async(req,res)=>{
    try {
        const data={
            _id:req?.params?.id,
            parant_name:req?.body?.parant_name,
            parant_type: req?.body?.parant_type,
            mobile_number:req?.body?.mobile_number,
            email_id:req?.body?.email_id,
        }
        const SchemasResponse=await Parantschema.save(data);
        res.json(SchemasResponse);
    } catch (error) {
        console.log("Error",error);
        res.send("Error : "+error);
    }
})


module.exports = router;