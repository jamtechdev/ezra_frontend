import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, providers } from '../data';

export default function Customer() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    budget: '',
    time: '',
  });
  const [showProviders, setShowProviders] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProviders(true);
  };

  const handleBook = (provider) => {
    alert(`Booked ${provider.name}! (This is just a demo)`);
  };

  if (showProviders) {
    const filteredProviders = providers.filter(p => 
      formData.category ? p.service.toLowerCase() === formData.category.toLowerCase() : true
    );

    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
        <Link to="/customer" onClick={() => setShowProviders(false)} style={{ color: '#0ea5e9', textDecoration: 'none' }}>
          ← Back to form
        </Link>
        
        <h2 style={{ marginTop: 24, marginBottom: 24 }}>Available Providers</h2>
        
        <div style={{ display: 'grid', gap: 16 }}>
          {filteredProviders.map(provider => (
            <div 
              key={provider.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 20,
                background: 'white',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 20 }}>{provider.name}</h3>
                  <p style={{ margin: '4px 0', color: '#666' }}>{provider.service}</p>
                </div>
                {provider.verified && (
                  <span style={{ background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              
              <div style={{ marginBottom: 16, color: '#555' }}>
                <div>⭐ Rating: {provider.rating}</div>
                <div>Price: {provider.price}</div>
              </div>
              
              <button
                onClick={() => handleBook(provider)}
                style={{
                  padding: '10px 20px',
                  background: '#0ea5e9',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <Link to="/" style={{ color: '#0ea5e9', textDecoration: 'none' }}>← Home</Link>
      
      <h1 style={{ marginTop: 24, marginBottom: 8 }}>Post a Job</h1>
      <p style={{ color: '#666', marginBottom: 32 }}>Tell us what you need</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 16,
            }}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Describe what you need..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 16,
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            placeholder="City, Street"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: 6,
              fontSize: 16,
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Budget (₪)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
              placeholder="400"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: 6,
                fontSize: 16,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Preferred Time</label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              placeholder="Tomorrow, 2 PM"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: 6,
                fontSize: 16,
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: '14px 32px',
            background: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 18,
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          Find Providers
        </button>
      </form>
    </div>
  );
}

