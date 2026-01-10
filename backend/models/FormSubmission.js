import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    templateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'formTemplate',
        required : true
    },
    responses : {
        type : mongoose.Schema.Types.Mixed,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
  },
    submitterEmail : {
        type: String,
        lowercase: true,
        trim: true
    }

});

export default mongoose.model('FormSubmission' , submissionSchema);