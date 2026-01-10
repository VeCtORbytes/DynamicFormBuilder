import { useState, useEffect } from 'react';
import FormDesigner from './components/FormDesigner';
import FormRenderer from './components/FormRenderer';
import * as api from './services/api';
import './styles/main.css';

function App() {
  const [page, setPage] = useState('home');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [viewingResponses, setViewingResponses] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await api.getTemplates();
      setTemplates(res.data);
    } catch (error) {
      setMessage('Error loading templates');
    }
  };

  const handleCreateForm = async (formData) => {
    try {
      setLoading(true);
      await api.createTemplate(formData);
      setMessage('✅ Form created successfully!');
      setPage('home');
      loadTemplates();
    } catch (error) {
      setMessage('❌ Error creating form');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (submissionData) => {
    try {
      setLoading(true);
      await api.submitForm(submissionData);
      setMessage('✅ Form submitted successfully!');
      setPage('home');
    } catch (error) {
      setMessage('❌ Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await api.deleteTemplate(id);
        loadTemplates();
        setMessage('✅ Form deleted');
      } catch (error) {
        setMessage('❌ Error deleting form');
      }
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
         <button 
            onClick={() => { setPage('home'); setSelectedTemplate(null); }}
            className="logo-btn"
        >
            📋 Formify
          </button>
          <div className="nav-buttons">
            <button 
              className={`nav-btn ${page === 'home' ? 'active' : ''}`}
              onClick={() => { setPage('home'); setSelectedTemplate(null); }}
            >
              Home
            </button>
            {page !== 'create' && (
              <button 
                className="nav-btn create-btn"
                onClick={() => { setPage('create'); setSelectedTemplate(null); }}
              >
                 Create Form
              </button>
            )}
          </div>
        </div>
      </nav>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="close-btn">×</button>
        </div>
      )}

      {loading && <div className="loader">Loading...</div>}

      <div className="content">
        {page === 'home' && (
          <div className="home-page">
            <div className="hero">
              <h2>Welcome to FormBuilder</h2>
              <p>Create beautiful forms, collect responses, and manage data with ease</p>
            </div>

            <div className="templates-section">
              <h2>Your Forms ({templates.length})</h2>
              {templates.length === 0 ? (
                <div className="empty-state">
                  <p>📝 No forms yet</p>
                  <button onClick={() => setPage('create')} className="btn-primary">
                    Create Your First Form
                  </button>
                </div>
              ) : (
                <div className="templates-grid">
                  {templates.map(template => (
                    <div key={template._id} className="template-card">
                      <div className="card-header">
                        <h3>{template.title}</h3>
                      </div>
                      <p className="card-desc">{template.description}</p>
                      <div className="card-meta">
                        <span className="field-count">📊 {template.fields.length} fields</span>
                        <span className="created-date">
                          {new Date(template.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                     <div className="card-actions">
                     <button 
                        className="btn-fill"
                        onClick={() => {
                          setSelectedTemplate(template);
                           setPage('fill');
                           }}
                       >
                            Fill Form
                         </button>
                     <button 
                         className="btn-delete"
                         onClick={() => handleDeleteTemplate(template._id)}
                     >
                          Delete
                     </button>
                    </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {page === 'create' && (
          <FormDesigner onSave={handleCreateForm} />
        )}

        {page === 'fill' && selectedTemplate && (
          <FormRenderer template={selectedTemplate} onSubmit={handleSubmitForm} />
        )}
      </div>
    </div>
  );
}

export default App;