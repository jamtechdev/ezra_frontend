import { Link } from 'react-router-dom';

export default function Provider() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 50%, #fce7f3 100%)',
    }}>
      <div style={{
        maxWidth: 520,
        width: '100%',
        background: 'rgba(255,255,255,0.96)',
        borderRadius: 28,
        padding: '48px 44px',
        boxShadow: '0 35px 80px rgba(79, 70, 229, 0.15)',
        border: '1px solid rgba(255,255,255,0.7)',
        textAlign: 'center',
      }}>
        <Link to="/" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          ← Back to Home
        </Link>
        <h1 style={{ marginTop: 24, marginBottom: 12, fontSize: 32, fontWeight: 900, color: '#312e81' }}>
          Become an EZRA
        </h1>
        <p style={{ color: '#4c1d95', lineHeight: 1.7, fontSize: 16, marginBottom: 28 }}>
          Thanks for your interest! We’ve moved applications into a quick popup on the homepage. Click the
          <strong> “Become an EZRA”</strong> buttons there to submit your details and our team will reach out.
        </p>
        <p style={{ color: '#4c1d95', lineHeight: 1.7, fontSize: 16, marginBottom: 32 }}>
          Already applied? We’ll be in touch within one business day. For urgent questions, email
          <br />
          <a href="mailto:Ezrainisrael1@gmail.com" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
            Ezrainisrael1@gmail.com
          </a>
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 28px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            boxShadow: '0 20px 48px rgba(99, 102, 241, 0.3)',
          }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

