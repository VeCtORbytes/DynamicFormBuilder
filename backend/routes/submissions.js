import express from 'express';
import FormSubmission from '../models/FormSubmission.js';
import FormTemplate from '../models/FormTemplate.js';

const router = express.Router();

// CREATE – submit a form response
router.post('/', async (req, res) => {
  try {
    const { templateId, responses, submitterEmail } = req.body;

    const template = await FormTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const field of template.fields) {
      const value = responses[field.id];

      // Required validation
      if (field.required && (value === undefined || value === '')) {
        return res.status(400).json({
          error: `${field.label} is required`
        });
      }

      // Email validation
      if (field.type === 'email' && value) {
        if (!emailRegex.test(value)) {
          return res.status(400).json({
            error: `Invalid email for ${field.label}`
          });
        }
      }

      // Number min / max validation
      if (field.type === 'number' && value !== undefined && value !== '') {
        const numValue = Number(value);

        if (Number.isNaN(numValue)) {
          return res.status(400).json({
            error: `${field.label} must be a number`
          });
        }

        if (field.min !== undefined && numValue < field.min) {
          return res.status(400).json({
            error: `${field.label} must be at least ${field.min}`
          });
        }

        if (field.max !== undefined && numValue > field.max) {
          return res.status(400).json({
            error: `${field.label} must be at most ${field.max}`
          });
        }
      }
    }

    const submission = new FormSubmission({
      templateId,
      responses,
      submitterEmail
    });

    await submission.save();

    res.status(201).json(submission);
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// READ – get submissions for a template
router.get('/template/:templateId', async (req, res) => {
  try {
    const submissions = await FormSubmission.find({
      templateId: req.params.templateId
    }).sort({ submittedAt: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
