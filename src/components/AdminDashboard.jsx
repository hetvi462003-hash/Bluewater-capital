import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, FileText, Briefcase, CheckCircle, Clock, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('consultations');
  const [consultations, setConsultations] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Server error connecting to backend.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [consRes, resRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/consultations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/resources`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      if (consRes.ok && resRes.ok) {
        setConsultations(await consRes.json());
        setResources(await resRes.json());
      } else if (consRes.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
    setLoading(false);
  };

  const updateStatus = async (type, id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/${type}/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchData(); // refresh data
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  // Login Screen
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--soft-silver)' }}>
        <div style={{ background: 'var(--white)', padding: '50px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '70px', height: '70px', background: 'rgba(57,142,203,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Lock size={32} color="var(--executive-blue)" />
          </div>
          <h2 style={{ color: 'var(--deep-navy)', marginBottom: '8px', fontSize: '1.75rem' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Blue Water Capital Internal Access</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
            {loginError && <p style={{ color: '#E11D48', fontSize: '0.9rem', textAlign: 'left', margin: '-5px 0' }}>{loginError}</p>}
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Secure Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div style={{ minHeight: '100vh', background: 'var(--soft-silver)' }}>
      {/* Admin Header */}
      <header style={{ background: 'var(--deep-navy)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--white)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ShieldCheck color="var(--light-blue)" size={28} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Admin Dashboard</h1>
        </div>
        <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition-fast)' }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Main Content */}
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button 
            onClick={() => setActiveTab('consultations')}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'consultations' ? 'var(--executive-blue)' : 'var(--white)',
              color: activeTab === 'consultations' ? 'var(--white)' : 'var(--text-muted)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-fast)'
            }}
          >
            <Briefcase size={18} /> Consultations ({consultations.length})
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'resources' ? 'var(--executive-blue)' : 'var(--white)',
              color: activeTab === 'resources' ? 'var(--white)' : 'var(--text-muted)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)',
              transition: 'var(--transition-fast)'
            }}
          >
            <FileText size={18} /> Resource Requests ({resources.length})
          </button>
        </div>

        {/* Data Table */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading records...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--deep-navy)', color: 'var(--white)', textAlign: 'left' }}>
                  <th style={{ padding: '20px', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '20px', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Client Info</th>
                  <th style={{ padding: '20px', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Request Type</th>
                  <th style={{ padding: '20px', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '20px', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'consultations' && consultations.map((item) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid var(--border-silver)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                      {new Date(item.createdAt).toLocaleDateString()}<br/>
                      <span style={{ fontSize: '0.8rem' }}>{new Date(item.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.email}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                      {item.company && <div style={{ fontSize: '0.85rem', color: 'var(--executive-blue)', marginTop: '4px' }}>🏢 {item.company}</div>}
                    </td>
                    <td style={{ padding: '20px', maxWidth: '300px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--executive-blue)', marginBottom: '8px' }}>{item.service}</div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'var(--soft-silver)', padding: '10px', borderRadius: '8px' }}>
                        {item.details}
                      </p>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: item.status === 'Contacted' ? '#DCFCE7' : '#FEF3C7',
                        color: item.status === 'Contacted' ? '#166534' : '#92400E',
                        display: 'inline-flex', alignItems: 'center', gap: '6px'
                      }}>
                        {item.status === 'Contacted' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      {item.status !== 'Contacted' && (
                        <button 
                          onClick={() => updateStatus('consultations', item._id, 'Contacted')}
                          style={{
                            background: 'var(--executive-blue)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 500
                          }}
                        >
                          Mark Contacted
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {activeTab === 'resources' && resources.map((item) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid var(--border-silver)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                      {new Date(item.createdAt).toLocaleDateString()}<br/>
                      <span style={{ fontSize: '0.8rem' }}>{new Date(item.createdAt).toLocaleTimeString()}</span>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--deep-navy)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.email}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                      {item.organization && <div style={{ fontSize: '0.85rem', color: 'var(--executive-blue)', marginTop: '4px' }}>🏢 {item.organization}</div>}
                    </td>
                    <td style={{ padding: '20px', maxWidth: '300px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--executive-blue)', marginBottom: '8px' }}>📄 {item.requestedDocument}</div>
                      {item.requestDetails && (
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, background: 'var(--soft-silver)', padding: '10px', borderRadius: '8px' }}>
                          {item.requestDetails}
                        </p>
                      )}
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        background: item.status === 'Sent' ? '#DCFCE7' : '#FEF3C7',
                        color: item.status === 'Sent' ? '#166534' : '#92400E',
                        display: 'inline-flex', alignItems: 'center', gap: '6px'
                      }}>
                        {item.status === 'Sent' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      {item.status !== 'Sent' && (
                        <button 
                          onClick={() => updateStatus('resources', item._id, 'Sent')}
                          style={{
                            background: 'var(--executive-blue)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 500
                          }}
                        >
                          Mark Sent
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && activeTab === 'consultations' && consultations.length === 0 && (
             <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>No consultations found.</div>
          )}
          {!loading && activeTab === 'resources' && resources.length === 0 && (
             <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>No resource requests found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
