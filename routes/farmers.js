// Successful farmers
// with contact info and including pictures
const express = require('express');
const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');

const {Farmer} = require('../models/farmer');
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const farmers = await Farmer.find().sort('name');
        res.send(farmers);
    }
    catch(ex){
        res.status(500).send('Internal Server Error');
    }
    
});


router.post('/',[auth,admin],async(req,res)=>{
    
    try{
        const {error} = validateFarmer(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let farmer = new Farmer({
            name: req.body.name,
            crop: req.body.crop,
            place: req.body.place,
            contact: req.body.contact
        });

        farmer = await farmer.save();
        res.send(farmer);     
    }
    catch(ex){
        res.status(500).send('Internal Server Error');
    }

});


router.put('/:id',[auth,admin],async(req,res)=>{

    try{
        const {error} = validateFarmer(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        
        const farmer = await Farmer.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                crop:req.body.crop,
                place:req.body.place,
                contact:req.body.contact
        },{new:true});
        
        if(!farmer) res.status(404).send('Record with given id Not Found');
        res.send(farmer);
    }
    catch(ex){
        res.status(500).send('Internal Server Error');
    }
    
});

router.delete('/:id',[auth,admin],async(req,res)=>{

    try{
        const farmer = await Farmer.findByIdAndRemove(req.params.id);
        if(!farmer) return res.status(404).send("Record with given id not found");
        res.send(farmer);
    }
    catch(ex){
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id',[auth,admin],async(req,res)=>{
    
    try{
        
        const farmer = await Farmer.findById(req.params.id);
        if(!farmer) return res.status(404).send("Record Not Found");
        res.send(farmer);
    }
    catch(ex){
        res.status(500).send('Internal Server Error');
    }
});



function validateFarmer(farmer){
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        crop: Joi.string().max(10).required(),
        place: Joi.string().max(20).required(),
        contact: Joi.string().email().required()
    });

    return schema.validate(farmer);
}


module.exports = router;