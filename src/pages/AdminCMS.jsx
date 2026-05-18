import { useState, useEffect } from 'react';
import { supabase, signOut, getCurrentUser, uploadImage, getContentData, updateContentData } from '../lib/supabase';

export default function AdminCMS() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('team');
  const [contentData, setContentData] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuth();
    loadContentData();
  }, []);

  const checkAuth = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      window.location.href = '/admin-login.html';
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  };

  const loadContentData = async () => {
    const { data, error } = await getContentData();
    if (error) {
      console.error('Error loading content:', error);
    } else {
      setContentData(data?.content || {});
      setEditingData(data?.content || {});
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/admin-login.html';
  };

  const handleImageUpload = async (e, category, index, field = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { data, error } = await uploadImage(file, category);
    
    if (error) {
      setMessage(`Error uploading image: ${error}`);
      setUploading(false);
      return;
    }

    // Update local state
    const updated = { ...editingData };
    if (!updated[category]) updated[category] = [];
    if (!updated[category][index]) updated[category][index] = {};
    updated[category][index][field] = data.publicUrl;
    
    setEditingData(updated);
    setMessage(`Image uploaded successfully!`);
    setUploading(false);
  };

  const handleTextEdit = (category, index, field, value) => {
    const updated = { ...editingData };
    if (!updated[category]) updated[category] = [];
    if (!updated[category][index]) updated[category][index] = {};
    updated[category][index][field] = value;
    setEditingData(updated);
  };

  const handleSave = async () => {
    const { error } = await updateContentData({ content: editingData });
    if (error) {
      setMessage(`Error saving: ${error.message}`);
    } else {
      setMessage('Changes saved successfully!');
      setContentData(editingData);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Conexus Admin CMS</h1>
          <div style={styles.userInfo}>
            <span style={styles.userEmail}>{user?.email}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div style={styles.messageAlert}>
          {message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('team')}
          style={{ ...styles.tab, ...(activeTab === 'team' ? styles.tabActive : {}) }}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveTab('services')}
          style={{ ...styles.tab, ...(activeTab === 'services' ? styles.tabActive : {}) }}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          style={{ ...styles.tab, ...(activeTab === 'projects' ? styles.tabActive : {}) }}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          style={{ ...styles.tab, ...(activeTab === 'achievements' ? styles.tabActive : {}) }}
        >
          Achievements
        </button>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {activeTab === 'team' && renderTeamSection(editingData, handleImageUpload, handleTextEdit, uploading)}
        {activeTab === 'services' && renderServicesSection(editingData, handleTextEdit)}
        {activeTab === 'projects' && renderProjectsSection(editingData, handleImageUpload, handleTextEdit, uploading)}
        {activeTab === 'achievements' && renderAchievementsSection(editingData, handleImageUpload, handleTextEdit, uploading)}
      </div>

      {/* Save Button */}
      <div style={styles.footer}>
        <button onClick={handleSave} style={styles.saveBtn} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

// Team Section Component
function renderTeamSection(data, handleImageUpload, handleTextEdit, uploading) {
  const team = data?.team || [];
  
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Team Members</h2>
      {team.map((member, idx) => (
        <div key={idx} style={styles.cardContainer}>
          <div style={styles.cardImage}>
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} style={styles.imagePreview} />
            ) : (
              <div style={styles.noImage}>No image</div>
            )}
            <label style={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'team', idx, 'avatar')}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              Change Image
            </label>
          </div>

          <div style={styles.cardContent}>
            <input
              type="text"
              placeholder="Name"
              value={member.name || ''}
              onChange={(e) => handleTextEdit('team', idx, 'name', e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Role"
              value={member.role || ''}
              onChange={(e) => handleTextEdit('team', idx, 'role', e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={member.linkedin || ''}
              onChange={(e) => handleTextEdit('team', idx, 'linkedin', e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Facebook URL"
              value={member.facebook || ''}
              onChange={(e) => handleTextEdit('team', idx, 'facebook', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Services Section Component
function renderServicesSection(data, handleTextEdit) {
  const services = data?.services || [];
  
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Services</h2>
      {services.map((service, idx) => (
        <div key={idx} style={styles.cardContainerSimple}>
          <input
            type="text"
            placeholder="Service Title"
            value={service.title || ''}
            onChange={(e) => handleTextEdit('services', idx, 'title', e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Service Description"
            value={service.desc || ''}
            onChange={(e) => handleTextEdit('services', idx, 'desc', e.target.value)}
            style={{ ...styles.textarea }}
          />
        </div>
      ))}
    </div>
  );
}

// Projects Section Component
function renderProjectsSection(data, handleImageUpload, handleTextEdit, uploading) {
  const projects = data?.projects || [];
  
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Projects</h2>
      {projects.map((project, idx) => (
        <div key={idx} style={styles.cardContainer}>
          <div style={styles.cardImage}>
            {project.image ? (
              <img src={project.image} alt={project.name} style={styles.imagePreview} />
            ) : (
              <div style={styles.noImage}>No image</div>
            )}
            <label style={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'projects', idx, 'image')}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              Change Image
            </label>
          </div>

          <div style={styles.cardContent}>
            <input
              type="text"
              placeholder="Project Name"
              value={project.name || ''}
              onChange={(e) => handleTextEdit('projects', idx, 'name', e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Project Type"
              value={project.type || ''}
              onChange={(e) => handleTextEdit('projects', idx, 'type', e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Project Description"
              value={project.detail || ''}
              onChange={(e) => handleTextEdit('projects', idx, 'detail', e.target.value)}
              style={styles.textarea}
            />
            <input
              type="text"
              placeholder="Location"
              value={project.location || ''}
              onChange={(e) => handleTextEdit('projects', idx, 'location', e.target.value)}
              style={styles.input}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Achievements Section Component
function renderAchievementsSection(data, handleImageUpload, handleTextEdit, uploading) {
  const achievements = data?.achievements || [];
  
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Achievements</h2>
      {achievements.map((achievement, idx) => (
        <div key={idx} style={styles.cardContainer}>
          <div style={styles.cardImage}>
            {achievement.image ? (
              <img src={achievement.image} alt={achievement.title} style={styles.imagePreview} />
            ) : (
              <div style={styles.noImage}>No image</div>
            )}
            <label style={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'achievements', idx, 'image')}
                disabled={uploading}
                style={{ display: 'none' }}
              />
              Change Image
            </label>
          </div>

          <div style={styles.cardContent}>
            <input
              type="text"
              placeholder="Achievement Title"
              value={achievement.title || ''}
              onChange={(e) => handleTextEdit('achievements', idx, 'title', e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Achievement Description"
              value={achievement.description || ''}
              onChange={(e) => handleTextEdit('achievements', idx, 'description', e.target.value)}
              style={styles.textarea}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    padding: '20px 0',
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#f1f5f9',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#cbd5e1',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  messageAlert: {
    maxWidth: '1400px',
    margin: '20px auto',
    padding: '12px 20px',
    backgroundColor: '#10b981',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '14px',
  },
  tabsContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    borderBottom: '1px solid #334155',
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#06b6d4',
    borderBottomColor: '#06b6d4',
  },
  contentArea: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    minHeight: 'calc(100vh - 300px)',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#f1f5f9',
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #334155',
  },
  cardContainerSimple: {
    padding: '20px',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #334155',
  },
  cardImage: {
    flex: '0 0 150px',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
    display: 'block',
  },
  noImage: {
    width: '100%',
    height: '150px',
    backgroundColor: '#334155',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    fontSize: '12px',
  },
  uploadLabel: {
    position: 'absolute',
    bottom: '5px',
    left: '5px',
    right: '5px',
    padding: '6px 10px',
    backgroundColor: 'rgba(6, 182, 212, 0.9)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px 12px',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '10px 12px',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    minHeight: '100px',
    resize: 'vertical',
  },
  footer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #334155',
  },
  saveBtn: {
    padding: '12px 30px',
    backgroundColor: '#06b6d4',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  loadingText: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
  },
};
