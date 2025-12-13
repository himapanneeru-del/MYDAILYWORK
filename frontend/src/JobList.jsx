/* frontend/src/JobList.jsx */
import React, { useEffect, useState } from "react";
import config from "./config";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/jobs`)
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        setJobs(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch(err => {
        console.error('JobList fetch error:', err);
        setError(err.message || 'Failed to load');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading jobs…</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div className="job-list" style={{ display:'grid', gap:12 }}>
      {jobs.map(job => (
        <div key={job._id} className="job-card" style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
          <div style={{ fontWeight:700 }}>{job.title}</div>
          <div style={{ color:'#555' }}>{job.company} — {job.location}</div>
          <div style={{ marginTop:8 }}>{job.description}</div>
        </div>
      ))}
    </div>
  );
}
