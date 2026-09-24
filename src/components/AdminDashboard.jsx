import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, FileText, Briefcase, CheckCircle, Clock, LogOut, Activity, Users, LayoutDashboard, Settings, Check, Trash2, Search, Filter, Download } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [consultations, setConsultations] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Pending', 'Completed'

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (token) {
      fetchData();
      
      // Auto-refresh data every 10 seconds silently
      const interval = setInterval(() => {
        fetchData(false);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
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

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const [consRes, resRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/consultations`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/resources`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      if (consRes.ok && resRes.ok) {
        const consData = await consRes.json();
        const resData = await resRes.json();
        setConsultations(consData.data || consData);
        setResources(resData.data || resData);
      } else if (consRes.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
    if (showLoading) setLoading(false);
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
        fetchData(); 
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const deleteRecord = async (type, id) => {
    if(!window.confirm('Are you sure you want to permanently delete this record?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const exportToCSV = (type) => {
    const data = type === 'consultations' ? consultations : resources;
    if(data.length === 0) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(data[0]).filter(k => !['_id', '__v'].includes(k));
    csvContent += headers.join(",") + "\n";
    
    data.forEach(row => {
      const rowData = headers.map(header => {
        let val = row[header];
        if(val === null || val === undefined) val = "";
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csvContent += rowData.join(",") + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingConsultations = consultations.filter(c => c.status !== 'Contacted').length;
  const pendingResources = resources.filter(r => r.status !== 'Sent').length;

  const getFilteredData = (data, isConsultation) => {
    return data.filter(item => {
      // Status Filter
      const isCompleted = isConsultation ? item.status === 'Contacted' : item.status === 'Sent';
      if(filterStatus === 'Pending' && isCompleted) return false;
      if(filterStatus === 'Completed' && !isCompleted) return false;
      
      // Search Filter
      if(searchTerm) {
        const searchLow = searchTerm.toLowerCase();
        const searchMatch = (
          (item.name && item.name.toLowerCase().includes(searchLow)) ||
          (item.email && item.email.toLowerCase().includes(searchLow)) ||
          (item.phone && item.phone.toLowerCase().includes(searchLow))
        );
        if(!searchMatch) return false;
      }
      return true;
    });
  };

  const filteredConsultations = getFilteredData(consultations, true);
  const filteredResources = getFilteredData(resources, false);

  if (!token) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, rgba(5, 18, 35, 0.9) 0%, rgba(11, 31, 58, 0.85) 100%), url("/images/Group 1 - website photo.jpg") no-repeat center center / cover',
        padding: '20px'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at center, rgba(57,142,203,0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        
        <ScrollReveal direction="up">
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '50px 40px', 
            borderRadius: '24px', 
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)', 
            maxWidth: '440px', 
            width: '100%', 
            textAlign: 'center',
            position: 'relative',
            zIndex: 10
          }}>
            <div style={{ 
              width: '80px', height: '80px', 
              background: 'linear-gradient(135deg, var(--executive-blue) 0%, var(--deep-navy) 100%)', 
              borderRadius: '20px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              margin: '0 auto 24px',
              boxShadow: '0 10px 25px rgba(22, 75, 122, 0.4)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <ShieldCheck size={36} color="var(--white)" />
            </div>
            
            <h2 style={{ color: 'var(--white)', marginBottom: '8px', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Command Center
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px', fontSize: '1.05rem' }}>
              Blue Water Capital Internal Access
            </p>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Admin Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--light-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  required
                />
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  placeholder="Secure Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.2)',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--light-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  required
                />
              </div>
              
              {loginError && (
                <div style={{ background: 'rgba(225, 29, 72, 0.1)', borderLeft: '3px solid #E11D48', padding: '10px', borderRadius: '4px', color: '#FDA4AF', fontSize: '0.9rem', textAlign: 'left' }}>
                  {loginError}
                </div>
              )}
              
              <button 
                type="submit" 
                style={{
                  marginTop: '10px',
                  background: 'linear-gradient(90deg, var(--executive-blue) 0%, var(--deep-navy) 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '18px',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(11, 31, 58, 0.4)',
                  transition: 'transform 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Lock size={18} /> Authorize Access
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F0F4F8' }}>
      
      <aside style={{
        width: '280px',
        background: 'var(--deep-navy)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '30px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <img src="/images/bw1.png" alt="Logo" style={{ width: '140px', filter: 'brightness(0) invert(1)', opacity: 0.9, marginBottom: '20px' }} />
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
            Management Console
          </div>
        </div>

        <div style={{ padding: '20px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'consultations', label: 'Consultations', icon: Briefcase, count: pendingConsultations },
            { id: 'resources', label: 'Library Requests', icon: FileText, count: pendingResources },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSearchTerm(''); setFilterStatus('All'); }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: '10px',
                  background: isActive ? 'linear-gradient(90deg, rgba(22, 75, 122, 0.8) 0%, rgba(22, 75, 122, 0.2) 100%)' : 'transparent',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                  border: 'none', cursor: 'pointer',
                  borderLeft: isActive ? '3px solid var(--light-blue)' : '3px solid transparent',
                  transition: 'all 0.2s',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => { if(!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                onMouseOut={(e) => { if(!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} color={isActive ? 'var(--light-blue)' : 'rgba(255,255,255,0.5)'} />
                  {item.label}
                </div>
                {item.count > 0 && (
                  <div style={{ background: '#E11D48', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '20px' }}>
                    {item.count}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout} 
            style={{ 
              width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white', 
              border: '1px solid rgba(255,255,255,0.1)', padding: '12px', 
              borderRadius: '8px', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(225, 29, 72, 0.8)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <LogOut size={16} /> End Session
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '40px 50px', overflowY: 'auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--deep-navy)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'consultations' && 'Consultation Bookings'}
              {activeTab === 'resources' && 'Business Library Requests'}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Monitor and manage client interactions in real-time.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Administrator</div>
              <div style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></div> Secure Connection
              </div>
            </div>
            <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--executive-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', boxShadow: 'var(--shadow-sm)' }}>
              A
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <ScrollReveal direction="up">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              
              <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '18px', background: 'rgba(57,142,203,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={30} color="var(--executive-blue)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Pending Consults</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1 }}>{pendingConsultations}</div>
                </div>
              </div>

              <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '18px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={30} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Pending Resources</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--deep-navy)', lineHeight: 1 }}>{pendingResources}</div>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, var(--executive-blue) 0%, var(--deep-navy) 100%)', padding: '30px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(22, 75, 122, 0.2)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1 }}>
                  <Activity size={150} />
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Total Interactions</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '10px' }}>{consultations.length + resources.length}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>Across all website forms</div>
                </div>
              </div>

            </div>

            <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ width: '80px', height: '80px', background: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={36} color="var(--light-blue)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-navy)', marginBottom: '10px' }}>System Operational</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>Navigate to the Consultations or Library Requests tabs on the left to manage pending client inquiries.</p>
            </div>
          </ScrollReveal>
        )}

        {(activeTab === 'consultations' || activeTab === 'resources') && (
          <ScrollReveal direction="up">
            <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)' }}>
              
              <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-silver)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--deep-navy)' }}>
                    {activeTab === 'consultations' ? `Consultations (${filteredConsultations.length})` : `Requests (${filteredResources.length})`}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid var(--border-silver)', padding: '6px 12px', borderRadius: '8px' }}>
                    <Search size={16} color="var(--text-light)" />
                    <input 
                      type="text" 
                      placeholder="Search name/email..." 
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '150px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid var(--border-silver)', padding: '6px 12px', borderRadius: '8px' }}>
                    <Filter size={16} color="var(--text-light)" />
                    <select 
                      value={filterStatus}
                      onChange={e => setFilterStatus(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '0.85rem', cursor: 'pointer', background: 'transparent' }}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => exportToCSV(activeTab)} style={{ background: 'white', border: '1px solid var(--border-silver)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dark)' }}>
                    <Download size={14} /> Export CSV
                  </button>
                  <button onClick={fetchData} style={{ background: 'var(--light-blue)', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--executive-blue)' }}>
                    <Activity size={14} /> Refresh
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-light)' }}>
                  <div className="animate-spin" style={{ display: 'inline-block', marginBottom: '16px' }}><Settings size={32} color="var(--executive-blue)" /></div>
                  <div>Syncing with database...</div>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--white)', borderBottom: '2px solid var(--soft-silver)' }}>
                        <th style={{ padding: '20px 30px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Submitted</th>
                        <th style={{ padding: '20px 30px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client Details</th>
                        <th style={{ padding: '20px 30px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Request Info</th>
                        <th style={{ padding: '20px 30px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                        <th style={{ padding: '20px 30px', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* --- CONSULTATIONS TABLE --- */}
                      {activeTab === 'consultations' && filteredConsultations.map((item) => (
                        <tr key={item._id} style={{ borderBottom: '1px solid var(--soft-silver)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} /> {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </td>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1.05rem', marginBottom: '6px' }}>{item.name}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}><a href={`mailto:${item.email}`} style={{ color: 'var(--executive-blue)', textDecoration: 'none' }}>{item.email}</a></div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                            {item.company && <div style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#F1F5F9', borderRadius: '4px', display: 'inline-block', marginTop: '8px', color: 'var(--text-dark)', fontWeight: 600 }}>🏢 {item.company}</div>}
                          </td>
                          <td style={{ padding: '24px 30px', maxWidth: '350px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 700, color: 'var(--executive-blue)', marginBottom: '10px', fontSize: '0.95rem' }}>{item.service}</div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', margin: 0 }}>
                              "{item.details}"
                            </p>
                          </td>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <span style={{
                              padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                              background: item.status === 'Contacted' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: item.status === 'Contacted' ? '#047857' : '#B45309',
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              border: item.status === 'Contacted' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                            }}>
                              {item.status === 'Contacted' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                              {item.status || 'Pending'}
                            </span>
                          </td>
                          <td style={{ padding: '24px 30px', textAlign: 'right', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              {item.status !== 'Contacted' && (
                                <button 
                                  onClick={() => updateStatus('consultations', item._id, 'Contacted')}
                                  style={{ background: 'var(--executive-blue)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <Check size={16} /> Mark Handled
                                </button>
                              )}
                              <button 
                                onClick={() => deleteRecord('consultations', item._id)}
                                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* --- RESOURCES TABLE --- */}
                      {activeTab === 'resources' && filteredResources.map((item) => (
                        <tr key={item._id} style={{ borderBottom: '1px solid var(--soft-silver)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} /> {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </td>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1.05rem', marginBottom: '6px' }}>{item.name}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}><a href={`mailto:${item.email}`} style={{ color: 'var(--executive-blue)', textDecoration: 'none' }}>{item.email}</a></div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.phone}</div>
                            {item.organization && <div style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#F1F5F9', borderRadius: '4px', display: 'inline-block', marginTop: '8px', color: 'var(--text-dark)', fontWeight: 600 }}>🏢 {item.organization}</div>}
                          </td>
                          <td style={{ padding: '24px 30px', maxWidth: '350px', verticalAlign: 'top' }}>
                            <div style={{ fontWeight: 700, color: 'var(--executive-blue)', marginBottom: '10px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <FileText size={16} /> {item.requestedDocument}
                            </div>
                            {item.requestDetails && (
                              <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, background: '#F8FAFC', padding: '14px', borderRadius: '10px', border: '1px solid #E2E8F0', margin: 0 }}>
                                "{item.requestDetails}"
                              </p>
                            )}
                          </td>
                          <td style={{ padding: '24px 30px', verticalAlign: 'top' }}>
                            <span style={{
                              padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                              background: item.status === 'Sent' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: item.status === 'Sent' ? '#047857' : '#B45309',
                              display: 'inline-flex', alignItems: 'center', gap: '6px',
                              border: item.status === 'Sent' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                            }}>
                              {item.status === 'Sent' ? <CheckCircle size={14}/> : <Clock size={14}/>}
                              {item.status || 'Pending'}
                            </span>
                          </td>
                          <td style={{ padding: '24px 30px', textAlign: 'right', verticalAlign: 'top' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              {item.status !== 'Sent' && (
                                <button 
                                  onClick={() => updateStatus('resources', item._id, 'Sent')}
                                  style={{ background: 'var(--executive-blue)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                  <Check size={16} /> Mark Sent
                                </button>
                              )}
                              <button 
                                onClick={() => deleteRecord('resources', item._id)}
                                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Empty States */}
                  {!loading && activeTab === 'consultations' && filteredConsultations.length === 0 && (
                     <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-light)' }}>
                       <Briefcase size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                       <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>No results found</div>
                       <p>Try adjusting your search or filters.</p>
                     </div>
                  )}
                  {!loading && activeTab === 'resources' && filteredResources.length === 0 && (
                     <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-light)' }}>
                       <FileText size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
                       <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>No results found</div>
                       <p>Try adjusting your search or filters.</p>
                     </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </main>
    </div>
  );
}
