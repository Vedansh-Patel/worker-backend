
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [platform, setPlatform] = useState('web');
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  async function createJob() {
    if (!idea) return alert('Enter idea');
    setMessage('Creating job...');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea, platform })
    });
    const j = await res.json();
    if (j.error) setMessage('Error: ' + j.error);
    else {
      setMessage('Job created: ' + j.id);
      fetchJobs();
    }
  }

  async function fetchJobs() {
    const res = await fetch('/api/jobs');
    const arr = await res.json();
    setJobs(arr);
  }

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>mobile-magic-proto</h1>
      <p>Enter app idea and press Generate. Sign in with Clerk (demo) to access your jobs.</p>

      <input value={idea} onChange={(e)=>setIdea(e.target.value)} placeholder="Idea e.g. Habit tracker" style={{width:'100%', padding:8}}/>
      <select value={platform} onChange={(e)=>setPlatform(e.target.value)} style={{marginTop:8}}>
        <option value="web">web</option>
      </select>
      <div style={{ marginTop:8 }}>
        <button onClick={createJob}>Generate</button>
      </div>
      <div style={{ marginTop:12, background:'#f7f7f7', padding:8, borderRadius:6 }}>{message}</div>

      <h3 style={{ marginTop:20 }}>Jobs</h3>
      <ul>
        {jobs.map(j => (
          <li key={j.id}>
            {j.id} — {j.idea} — {j.status} — {j.artifactPath ? <a href={j.downloadUrl}>Download</a> : 'No artifact yet'}
          </li>
        ))}
      </ul>
    </div>
  );
}
