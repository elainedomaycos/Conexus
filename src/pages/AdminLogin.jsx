import { useState, useEffect } from 'react';
import { signIn, getCurrentUser } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await getCurrentUser();
    if (user) {
      window.location.href = '/admin.html';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        // Redirect to admin panel
        window.location.href = '/admin.html';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background} />
      
      <div style={styles.formContainer}>
        <div style={styles.card}>
          <div style={styles.logoSection}>
            <h1 style={styles.title}>Conexus</h1>
            <p style={styles.subtitle}>Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>
              {isSignUp ? 'Create Admin Account' : 'Admin Login'}
            </h2>

            {error && (
              <div style={styles.errorBox}>
                {error}
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p style={styles.divider}>OR</p>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={styles.toggleBtn}
            >
              {isSignUp ? 'Back to Login' : 'Create New Account'}
            </button>

            {isSignUp && (
              <p style={styles.infoText}>
                Contact your administrator to be added to the team.
              </p>
            )}
          </form>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              For security concerns, contact your administrator.
            </p>
          </div>
        </div>

        {/* Gradient decoration */}
        <div style={styles.gradientTop} />
        <div style={styles.gradientBottom} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`,
    pointerEvents: 'none',
  },
  formContainer: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '420px',
    padding: '20px',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    border: '1px solid rgba(51, 65, 85, 0.5)',
    borderRadius: '16px',
    padding: '40px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #06b6d4 0%, #22c55e 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
    margin: '0 0 20px 0',
  },
  errorBox: {
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#fca5a5',
    fontSize: '14px',
    marginBottom: '10px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#cbd5e1',
  },
  input: {
    padding: '12px 16px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(51, 65, 85, 0.5)',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.3s',
    outline: 'none',
  },
  submitBtn: {
    padding: '12px 16px',
    backgroundColor: '#06b6d4',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '10px',
  },
  divider: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '13px',
    margin: '20px 0',
  },
  toggleBtn: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    color: '#06b6d4',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  infoText: {
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center',
    margin: '0',
    paddingTop: '10px',
  },
  footer: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(51, 65, 85, 0.3)',
  },
  footerText: {
    fontSize: '12px',
    color: '#64748b',
    textAlign: 'center',
    margin: 0,
  },
  gradientTop: {
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: '-50%',
    left: '-20%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
};
