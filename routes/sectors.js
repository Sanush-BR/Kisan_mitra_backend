// Various agricultural domains that farmers gets the agricultural loans
const express = require('express');
const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Sector} = require('../models/sector');

const router = express.Router();


router.get('/',async(req,res)=>{

    try{    
        const sectors = await Sector.find().sort('name');
        res.send(sectors);
    }
    catch(ex){
        res.status(500).send('Internal Sever Error');
    }

});


router.post('/',[auth,admin],async(req,res)=>{

    try{
            
        const {error} = validateType(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        let sector = new Sector({
            name:req.body.name
        });
    
        sector = await sector.save();

        res.send(sector);

    }
    catch(ex){
        res.status(500).send('Internal Sever Error');
    }


});

router.put('/:id',[auth,admin],async(req,res)=>{
    
    try{
        const {error} = validateType(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        
        const sector = Sector.findByIdAndUpdate(req.params.id,{
            name:req.body.name
        },{new:true});
        
        if(!sector) return res.status(404).send('Record with given id is not found');
        res.send(sector);
    }
    catch(ex){
        res.status(500).send('Internal Sever Error');
    }

    
});

router.delete('/:id',[auth,admin],async(req,res)=>{
   
    try{
        const sector = await Sector.findByIdAndRemove(req.params.id);
        if(!sector) return res.status(404).send('Record with given id is not found');
    
        res.send(sector);
    }
    catch(ex){
        res.status(500).send('Internal Sever Error');
    }

    
});

router.get('/:id',[auth,admin],async(req,res)=>{

    try{
        const sector = await Sector.findById(req.params.id);
        if(!sector) return res.status(404).send('Loan Type with given id is not found');
        res.send(sector);
    }
    catch(ex){
        res.status(500).send('Internal Sever Error');
    }


});


function validateType(type){
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(type);
}


module.exports = router;