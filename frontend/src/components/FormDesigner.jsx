import { useState } from 'react';
import '../styles/FormDesigner.css';

export default function FormDesigner({ onSave, initialTemplate }) {
  const [title, setTitle] = useState(initialTemplate?.title || '');
  const [description, setDescription] = useState(initialTemplate?.description || '');
  const [fields, setFields] = useState(initialTemplate?.fields || []);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const addField = (type) => {
    const newField = {
      id: `field_${Date.now()}`,
      label: `New ${type} field`,
      type,
      required: false,
      placeholder: '',
      options: type === 'select' ? [''] : [],
      min: undefined,
      max: undefined,
      order: fields.length
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (fieldId, updates) => {
    setFields(fields.map(f =>
      f.id === fieldId ? { ...f, ...updates } : f
    ));
  };

  const removeField = (fieldId) => {
    setFields(fields.filter(f => f.id !== fieldId));
    setSelectedFieldId(null);
  };

  const moveFieldUp = (index) => {
    if (index === 0) return;
    const newFields = [...fields];
    [newFields[index - 1], newFields[index]] =
      [newFields[index], newFields[index - 1]];
    setFields(newFields);
  };

  const moveFieldDown = (index) => {
    if (index === fields.length - 1) return;
    const newFields = [...fields];
    [newFields[index + 1], newFields[index]] =
      [newFields[index], newFields[index + 1]];
    setFields(newFields);
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a form title');
      return;
    }
    if (fields.length === 0) {
      alert('Please add at least one field');
      return;
    }

    // Clean select options before saving
    const cleanedFields = fields.map(field => {
      if (field.type === 'select') {
        return {
          ...field,
          options: field.options.filter(o => o.trim() !== '')
        };
      }
      return field;
    });

    onSave({ title, description, fields: cleanedFields });
  };

  return (
    <div className="designer">
      <h2>Create New Form</h2>

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <textarea
        placeholder="Form Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="description-input"
      />

      <div className="field-buttons">
        <button onClick={() => addField('text')}>+ Text</button>
        <button onClick={() => addField('number')}>+ Number</button>
        <button onClick={() => addField('email')}>+ Email</button>
        <button onClick={() => addField('date')}>+ Date</button>
        <button onClick={() => addField('select')}>+ Select</button>
        <button onClick={() => addField('textarea')}>+ Textarea</button>
      </div>

      <div className="fields">
        {fields.length === 0 ? (
          <p className="no-fields">No fields added yet</p>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className={`field-item ${selectedFieldId === field.id ? 'selected' : ''}`}
              onClick={() => setSelectedFieldId(field.id)}
            >
              <div className="field-header">
                <span className="field-type">{field.type}</span>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  placeholder="Field Label"
                  onClick={(e) => e.stopPropagation()}
                  className="field-label"
                />
              </div>

              {selectedFieldId === field.id && (
                <div className="field-options" onClick={(e) => e.stopPropagation()}>
                  <label>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(field.id, { required: e.target.checked })
                      }
                    />
                    Required
                  </label>

                  <input
                    type="text"
                    placeholder="Placeholder text"
                    value={field.placeholder}
                    onChange={(e) =>
                      updateField(field.id, { placeholder: e.target.value })
                    }
                    className="option-input"
                  />

                  {/* SELECT OPTIONS */}
                  {field.type === 'select' && (
                    <textarea
                      value={field.options.join(', ')}
                      onChange={(e) => {
                        const options = e.target.value
                          .split(',')
                          .map(o => o.trim());

                        updateField(field.id, {
                          options: options.length ? options : ['']
                        });
                      }}
                      className="option-input"
                      rows="3"
                      placeholder="Enter options separated by commas"
                    />
                  )}

                  {/* NUMBER MIN / MAX */}
                  {field.type === 'number' && (
                    <div className="number-rules">
                      <input
                        type="number"
                        placeholder="Min value"
                        value={field.min ?? ''}
                        onChange={(e) =>
                          updateField(field.id, {
                            min: e.target.value === ''
                              ? undefined
                              : Number(e.target.value)
                          })
                        }
                        className="option-input"
                      />

                      <input
                        type="number"
                        placeholder="Max value"
                        value={field.max ?? ''}
                        onChange={(e) =>
                          updateField(field.id, {
                            max: e.target.value === ''
                              ? undefined
                              : Number(e.target.value)
                          })
                        }
                        className="option-input"
                      />
                    </div>
                  )}

                  <div className="field-controls">
                    {index > 0 && (
                      <button
                        onClick={() => moveFieldUp(index)}
                        className="btn-control"
                      >
                        ↑ Move Up
                      </button>
                    )}
                    {index < fields.length - 1 && (
                      <button
                        onClick={() => moveFieldDown(index)}
                        className="btn-control"
                      >
                        ↓ Move Down
                      </button>
                    )}
                    <button
                      onClick={() => removeField(field.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button onClick={handleSave} className="save-btn">
        Save Form
      </button>
    </div>
  );
}
