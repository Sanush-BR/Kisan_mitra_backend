// Various agricultural loans providers details

const express = require('express');
const Joi = require('joi');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const {Loan} = require('../models/loan');
const router = express.Router();


router.get('/',async(req,res)=>{
    
    try{
        const loan_details = await Loan.find().sort('provider');
        res.send(loan_details);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
});


router.post('/',[auth,admin],async(req,res)=>{
 
    try{
        const {error} = validateLoan(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
    
        let loan_detail = new Loan({
            provider:req.body.provider,
            interest:req.body.interest
        });
    
    
        loan_detail = await loan_detail.save();
        res.send(loan_detail);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }

});

router.put('/:id',[auth,admin],async(req,res)=>{

        try{
            const {error} = validateLoan(req.body);
            if(error) return res.status(400).send(error.details[0].message);
    
        
            const loan_detail = await Loan.findByIdAndUpdate(req.paramas.id,{
                provider:req.body.provider,
                interest:req.body.interest
            },{new:true});
        
            if(!loan_detail) return res.status(404).send("details with given id not found");
            
            res.send(loan_detail);

        }
        catch(ex){
        res.status(500).send('Internal Service Error');
    }
  
    
});

router.delete('/:id',[auth,admin],async(req,res)=>{
    
    try{
        const loan_detail = await Loan.findByIdAndRemove(req.params.id);
        if(!loan_detail) return res.status(404).send("details with given id not found");
        res.send(loan_detail);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
});

router.get('/:id',[auth,admin],async(req,res)=>{

    try{
        const loan_detail = await Loan.findById(req.params.id);
        if(!loan_detail) return res.status(404).send("details with given id not found");
        res.send(loan_detail);
    }
    catch(ex){
        res.status(500).send('Internal Service Error');
    }
});

function validateLoan(loan){
    const schema = Joi.object({
        provider: Joi.string().min(4).required(),
        interest: Joi.string().required()
    });

    return schema.validate(loan);
}


module.exports = router;