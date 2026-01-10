import mongoose from 'mongoose';

// Define what a field looks like
const fieldSchema = new mongoose.Schema({
  id: String,
  label: String,
  type: {
    type: String,
    required:true,
    enum: ['text', 'number', 'date', 'select', 'textarea', 'email']
  },
  required:{
    type:Boolean,
    default:false,
  },
  placeholder: String,
  options: [String],  // For select dropdowns
  order: Number
}, { _id: false });

// Define what a form template looks like
const formTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  fields: [fieldSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

formTemplateSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
});

export default mongoose.model('FormTemplate', formTemplateSchema);