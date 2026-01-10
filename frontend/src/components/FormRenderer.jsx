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
    for (const field of template.fields) {
      if (field.required && !responses[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
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