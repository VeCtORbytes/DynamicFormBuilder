import express from 'express';
import FormSubmission from '../models/FormSubmission.js';
import FormTemplate from '../models/FormTemplate.js';

const router = express.Router();

//create - submmit a form response

router.post('/' , async(req, res)=>{
    try{
        const{templateId, responses, submitterEmail} = req.body;

        const template = await FormTemplate.findById(templateId);
        if(!template){
            return res.status(404).json({error :'Template not found'});
        }
        for(const field of template.fields){
            if(field.required && !responses[field.id]){
                return res.status(404).json({
                    error :  `${field.label} is required`
                });
            }
        }
        const submission = new FormSubmission({
        templateId,
        responses,
        submitterEmail
    });
    await submission.save();
    res.status(201).json(submission);
    }catch(error){
        console.error('Submission error :' , error);
         res.status(500).json({ error: error.message });
    }
});

router.get('/template/:templateId' , async(req,res)=>{
    try{
        const submission = await FormSubmission.find({
             templateId : req.params.templateId
        }).sort({submittedAt : -1});
        res.json(submission);
    }catch(error){
        res.status(500).json({error : error.message});
    }
});

export default router;