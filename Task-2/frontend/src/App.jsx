/* frontend/src/App.jsx */
import React, { useState } from "react";
import CreateJob from "./CreateJob";
import JobList from "./JobList";
import "./App.css";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Called by CreateJob when a new job is created — bump key to force JobList reload.
  const handleJobCreated = (newJob) => {
    // easiest way: re-render JobList by changing refreshKey
    setRefreshKey(k => k + 1);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Hello Hima! 🚀</h1>
      <h2>Your frontend is running</h2>

      <CreateJob onJobCreated={handleJobCreated} />

      {/* JobList will re-run its useEffect when refreshKey changes */}
      <div style={{ marginTop: 12 }}>
        <h3>Job Listings</h3>
        <JobList key={refreshKey} />
      </div>
    </div>
  );
}
