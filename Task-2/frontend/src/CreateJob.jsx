/* frontend/src/CreateJob.jsx */
import React, { useState } from 'react';
import config from './config';

export default function CreateJob({ onJobCreated }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetForm = () => {
    setTitle('');
    setCompany('');
    setLocation('');
    setDescription('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!title.trim() || !company.trim()) {
      setMessage({ type: 'error', text: 'Please add title and company.' });
      return;
    }

    const payload = { title, company, location, description };

    try {
      setLoading(true);
      const res = await fetch(`${config.API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `HTTP error! status: ${res.status}`);
      }

      const newJob = await res.json();
      setMessage({ type: 'success', text: 'Job created successfully.' });

      if (typeof onJobCreated === 'function') onJobCreated(newJob);
      resetForm();
    } catch (err) {
      console.error('Create job error:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to create job' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 2500);
    }
  };

  return (
    <div className="create-job" style={{ marginBottom: 20 }}>
      <h3>Create a new job</h3>
      <form onSubmit={handleSubmit} className="create-job-form" style={{ display:'grid', gap:8, maxWidth:600 }}>
        <input placeholder="Job title (required)" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Company (required)" value={company} onChange={e => setCompany(e.target.value)} required />
        <input placeholder="Location (optional)" value={location} onChange={e => setLocation(e.target.value)} />
        <textarea placeholder="Short description" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
        <div style={{ display:'flex', gap:8 }}>
          <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Job'}</button>
          <button type="button" onClick={resetForm} disabled={loading}>Reset</button>
        </div>
        {message && <div style={{ color: message.type === 'error' ? 'crimson' : 'green' }}>{message.text}</div>}
      </form>
    </div>
  );
}
