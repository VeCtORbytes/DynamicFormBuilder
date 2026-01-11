import { useState } from 'react';
import '../styles/FormRenderer.css';

export default function FormRenderer({ template, onSubmit }) {
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldId, value) => {
    setResponses({ ...responses, [fieldId]: value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Required check
    for (const field of template.fields) {
      const value = responses[field.id];
      if (field.required && !responses[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
        continue;
      }

        // Email format check
      if (field.type === 'email' && value) {
      if (!emailRegex.test(value)) {
        newErrors[field.id] = 'Invalid email address';
      }
    }
    // Min / Max validation
      if (field.type === 'number' && value !== undefined) {
      if (field.min !== undefined && value < field.min) {
        newErrors[field.id] = `Minimum value is ${field.min}`;
      }
      if (field.max !== undefined && value > field.max) {
        newErrors[field.id] = `Maximum value is ${field.max}`;
      }
    }
  }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        templateId: template._id,
        responses
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-renderer">
      <h2>{template.title}</h2>
      <p>{template.description}</p>

      {template.fields.map(field => (
        <div key={field.id} className="form-field">
          <label>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              placeholder={field.placeholder}
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'email' && (
            <input
              type="email"
              placeholder={field.placeholder}
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'number' && (
            <input
              type="number"
              placeholder={field.placeholder}
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'date' && (
            <input
              type="date"
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}

          {field.type === 'select' && (
            <select
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            >
              <option value="">-- Select --</option>
              {field.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {field.type === 'textarea' && (
            <textarea
              placeholder={field.placeholder}
              value={responses[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}

          {errors[field.id] && <p className="error">{errors[field.id]}</p>}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}