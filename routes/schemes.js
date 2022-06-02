// Government schemes from this farmer can get money help from an government
// hyperlink to schemes so that on click opens that page on browser
const express = require('express');
const Joi = require('joi');

const {Scheme} = require('../models/scheme');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();




router.get('/',async(req,res)=>{
    try{
        const schemes = await Scheme.find().sort('name');
        res.send(schemes);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
});



router.post('/',[auth,admin],async(req,res)=>{
    
    try{
        const {error} = validateScheme(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let scheme = new Scheme({
            name:req.body.name,
            link:req.body.link
        });

        scheme = await scheme.save();
        res.send(scheme);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
    
});

router.put('/:id',[auth,admin],async(req,res) => {
    
        try{
            const {error} = validateScheme(req.body);
            if(error) return res.status(400).send(error.details[0].message);

    
            let scheme = Scheme.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                link:req.body.name
            },{new:true});

            if(!scheme) return res.status(404).send("Scheme with given id not found");
    
            res.send(scheme);
        }
        catch(ex){
            res.status(500).send('Internal Service Error');
        }
   
});

router.delete('/:id',[auth,admin],async(req,res)=>{
    
    try{
        let scheme = Scheme.findByIdAndRemove(req.params.id);
    
        if(!scheme) return res.status(404).send("Scheme with given id not found");
    
        res.send(scheme);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
    
});

router.get('/:id',[auth,admin],async(req,res)=>{
    try{
        const scheme = await Scheme.findById(req.params.id);
        if(!scheme) res.status(404).send("Record not found");
        res.send(scheme);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
 

});

function validateScheme(scheme){
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        link: Joi.string().required()
    });
    
    return schema.validate(scheme);   
}

module.exports = router;