import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const plumberProfiles = [
  {
    id: 'omar',
    name: 'Omar Ben Dehud',
    rate: '₪150/hour',
    rating: 4.9,
    tags: ['20+ years experience', 'Water heater specialist'],
  },
  {
    id: 'david',
    name: 'David Turgeman',
    rate: '₪180/hour',
    rating: 4.8,
    tags: ['Licensed master plumber', 'Emergency repairs'],
  },
  {
    id: 'sahar',
    name: 'Sahar Dagan',
    rate: '₪220/hour',
    rating: 5.0,
    tags: ['Renovations', 'Bilingual'],
  },
  {
    id: 'rudi',
    name: 'Rudi Edri',
    rate: '₪300/hour',
    rating: 4.7,
    tags: ['Commercial expertise', 'Transparent quotes'],
  },
];

const issueOptions = ['Leak', 'Clog', 'Water heater', 'Installation', 'Burst pipe', 'Other'];
const urgencyOptions = [
  { id: 'routine', label: 'Routine', subtitle: 'Within 3 days' },
  { id: 'same-day', label: 'Same-day', subtitle: 'Later today' },
  { id: 'emergency', label: 'Emergency', subtitle: 'Within 2 hours' },
];

const initialFormState = {
  address: '',
  issueType: 'Leak',
  description: '',
  urgency: 'routine',
  extraDetails: '',
  photos: [],
  selectedPlumberId: '',
  date: '',
  time: '',
  flexible: false,
  paymentMethod: 'google-pay',
};

export default function Plumbing() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);

  const selectedPlumber = useMemo(
    () => plumberProfiles.find((profile) => profile.id === formData.selectedPlumberId) ?? null,
    [formData.selectedPlumberId],
  );

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    setFormData((prev) => ({ ...prev, photos: files }));
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSelectPlumber = (plumberId) => {
    setFormData((prev) => ({ ...prev, selectedPlumberId: plumberId }));
  };

  const handleFlexibleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      flexible: !prev.flexible,
      date: !prev.flexible ? '' : prev.date,
      time: !prev.flexible ? '' : prev.time,
    }));
  };

  const handleCompleteBooking = () => {
    goNext();
  };

  const renderStepIndicator = () => {
    const steps = ['Basics', 'Urgency', 'Plumbers', 'Schedule', 'Confirm', 'Done'];
    return (
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
        {steps.map((label, idx) => {
          const currentIndex = idx + 1;
          const active = step === currentIndex;
          const completed = currentIndex < step;
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 18px',
                borderRadius: 999,
                background: active
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : completed
                    ? 'rgba(102, 126, 234, 0.15)'
                    : 'rgba(255, 255, 255, 0.5)',
                color: active ? 'white' : '#4338ca',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.3s',
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: active
                    ? 'rgba(255,255,255,0.25)'
                    : completed
                      ? 'rgba(102, 126, 234, 0.2)'
                      : 'rgba(99,102,241,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'white' : '#4338ca',
                  fontSize: 13,
                }}
              >
                {completed ? '✓' : currentIndex}
              </span>
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNavigation = ({ primaryLabel, secondaryLabel, primaryDisabled = false }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, marginTop: 32 }}>
      <button
        type="button"
        onClick={step === 1 ? undefined : goBack}
        disabled={step === 1}
        style={{
          padding: '16px 24px',
          borderRadius: 14,
          border: 'none',
          background: step === 1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)',
          color: '#4b5563',
          fontWeight: 600,
          fontSize: 15,
          cursor: step === 1 ? 'default' : 'pointer',
          transition: 'all 0.2s',
          minWidth: 140,
        }}
        onMouseEnter={(e) => {
          if (step !== 1) {
            e.currentTarget.style.background = 'rgba(255,255,255,1)';
          }
        }}
        onMouseLeave={(e) => {
          if (step !== 1) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.8)';
          }
        }}
      >
        {secondaryLabel ?? 'Back'}
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={primaryDisabled}
        style={{
          padding: '16px 32px',
          borderRadius: 14,
          border: 'none',
          background: primaryDisabled
            ? 'linear-gradient(135deg, rgba(102,126,234,0.4) 0%, rgba(118,75,162,0.4) 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          boxShadow: primaryDisabled
            ? 'none'
            : '0 12px 30px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          minWidth: 180,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!primaryDisabled) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 18px 40px rgba(102, 126, 234, 0.45)';
          }
        }}
        onMouseLeave={(e) => {
          if (!primaryDisabled) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
          }
        }}
      >
        {primaryLabel}
      </button>
    </div>
  );

  const renderBasicsStep = () => (
    <div>
      <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12, letterSpacing: -1, color: '#111827' }}>
        Plumbing help, fast.
      </h1>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Start with the essentials so we can match you with the right Ezra.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
            Address
          </label>
          <input
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="123 Dizengoff St, Tel Aviv"
            required
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #e5e7eb',
              fontSize: 16,
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
            What do you need help with?
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {issueOptions.map((issue) => {
              const active = formData.issueType === issue;
              return (
                <button
                  type="button"
                  key={issue}
                  onClick={() => setFormData((prev) => ({ ...prev, issueType: issue }))}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? 'rgba(102,126,234,0.15)' : 'rgba(17,24,39,0.05)',
                    color: active ? '#4c1d95' : '#4b5563',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: active ? 'inset 0 0 0 2px rgba(102,126,234,0.45)' : 'none',
                  }}
                >
                  {issue}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
            Describe the issue
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={5}
            placeholder="Tell us what’s happening. For example: “Water is dripping steadily under the sink and the shut-off valve is stuck.”"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #e5e7eb',
              fontSize: 16,
              lineHeight: 1.6,
              resize: 'vertical',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {renderNavigation({
        primaryLabel: 'Continue',
        primaryDisabled: !(formData.address && formData.description),
      })}
    </div>
  );

  const renderUrgencyStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#111827', letterSpacing: -0.5 }}>
        How urgent is this job?
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        We’ll highlight Ezras available in your timeframe. Add details or a photo to help them prepare.
      </p>

      <div style={{ display: 'grid', gap: 18 }}>
        {urgencyOptions.map((option) => {
          const active = formData.urgency === option.id;
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => setFormData((prev) => ({ ...prev, urgency: option.id }))}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderRadius: 20,
                border: 'none',
                background: active
                  ? 'linear-gradient(135deg, rgba(102,126,234,0.12) 0%, rgba(118,75,162,0.1) 100%)'
                  : 'rgba(255,255,255,0.7)',
                boxShadow: active
                  ? '0 12px 30px rgba(102, 126, 234, 0.25)'
                  : '0 6px 18px rgba(15, 23, 42, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#1f2937' }}>{option.label}</div>
                <div style={{ color: '#6b7280', fontSize: 15 }}>{option.subtitle}</div>
              </div>
              {active ? (
                <span style={{ fontSize: 20, color: '#6366f1' }}>✓</span>
              ) : (
                <span style={{ fontSize: 22, color: '#cbd5f5' }}>→</span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 32 }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
          Extra details (optional)
        </label>
        <textarea
          value={formData.extraDetails}
          onChange={(e) => setFormData((prev) => ({ ...prev, extraDetails: e.target.value }))}
          rows={4}
          placeholder="Anything else your plumber should know?"
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: 16,
            border: '2px solid #e5e7eb',
            fontSize: 16,
            transition: 'all 0.2s',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
          Add photos (optional)
        </label>
        <label
          htmlFor="plumbing-photo-upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            borderRadius: 14,
            border: '2px dashed rgba(102,126,234,0.4)',
            background: 'rgba(255,255,255,0.65)',
            color: '#4c1d95',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <span>📷 Upload photos</span>
        </label>
        <input
          id="plumbing-photo-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {formData.photos.length > 0 && (
          <div style={{ marginTop: 12, color: '#6b7280', fontSize: 14 }}>
            {formData.photos.length} file{formData.photos.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {renderNavigation({
        primaryLabel: 'See Available Plumbers',
      })}
    </div>
  );

  const renderPlumberList = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#111827', letterSpacing: -0.5 }}>
        Choose a verified Ezra
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        All plumbers listed are background-checked and reviewed by our community.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {plumberProfiles.map((plumber) => {
          const active = formData.selectedPlumberId === plumber.id;
          return (
            <div
              key={plumber.id}
              style={{
                borderRadius: 24,
                padding: 28,
                background: 'rgba(255,255,255,0.96)',
                border: active ? '2px solid rgba(102,126,234,0.6)' : '1px solid rgba(148, 163, 184, 0.25)',
                boxShadow: active
                  ? '0 18px 45px rgba(102, 126, 234, 0.35)'
                  : '0 12px 30px rgba(15, 23, 42, 0.08)',
                transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1f2937' }}>{plumber.name}</h3>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.3px',
                      }}
                    >
                      ✓ Verified
                    </span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, color: '#6b7280' }}>
                    <span style={{ fontWeight: 700, fontSize: 17, color: '#4c1d95' }}>{plumber.rate}</span>
                    <span>•</span>
                    <span style={{ fontSize: 15 }}>⭐ {plumber.rating}</span>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {plumber.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: 'rgba(102,126,234,0.12)',
                          color: '#4338ca',
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPlumber(plumber.id)}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: 'none',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(102, 126, 234, 0.12)',
                    color: active ? 'white' : '#4c1d95',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: active ? '0 12px 28px rgba(102,126,234,0.35)' : 'none',
                    minWidth: 160,
                  }}
                >
                  {active ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {renderNavigation({
        primaryLabel: 'Continue',
        primaryDisabled: !formData.selectedPlumberId,
      })}
    </div>
  );

  const renderScheduleStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#111827', letterSpacing: -0.5 }}>
        Pick a time that works
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        The Ezra will confirm once they accept. You can mark the timing as flexible if you’re open to suggestions.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              disabled={formData.flexible}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 16,
                border: '2px solid #e5e7eb',
                fontSize: 16,
                background: formData.flexible ? 'rgba(229, 231, 235, 0.6)' : 'white',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, color: '#111827', fontSize: 15 }}>
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
              disabled={formData.flexible}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: 16,
                border: '2px solid #e5e7eb',
                fontSize: 16,
                background: formData.flexible ? 'rgba(229, 231, 235, 0.6)' : 'white',
              }}
            />
          </div>
        </div>

        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontWeight: 600,
            color: '#4c1d95',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input type="checkbox" checked={formData.flexible} onChange={handleFlexibleToggle} />
          I’m flexible on timing
        </label>
      </div>

      {renderNavigation({
        primaryLabel: 'Review & Confirm',
        primaryDisabled: !(formData.flexible || (formData.date && formData.time)),
      })}
    </div>
  );

  const renderConfirmationStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#111827', letterSpacing: -0.5 }}>
        Review your booking
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Secure payment is held until the job is marked complete.
      </p>

      <div
        style={{
          borderRadius: 24,
          padding: 28,
          background: 'rgba(255,255,255,0.96)',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
          display: 'grid',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1f2937' }}>Job summary</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#4b5563', fontSize: 15 }}>
            <div><strong>Address:</strong> {formData.address}</div>
            <div><strong>Issue:</strong> {formData.issueType}</div>
            <div><strong>Description:</strong> {formData.description}</div>
            <div>
              <strong>Urgency:</strong>{' '}
              {urgencyOptions.find((option) => option.id === formData.urgency)?.label ?? 'Routine'}
            </div>
          </div>
        </div>

        {selectedPlumber && (
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1f2937' }}>Your Ezra</h3>
            <div style={{ marginTop: 12, color: '#4b5563', fontSize: 15 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: '#4c1d95' }}>{selectedPlumber.name}</div>
              <div>{selectedPlumber.rate} • ⭐ {selectedPlumber.rating}</div>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1f2937' }}>Schedule</h3>
          <div style={{ marginTop: 12, color: '#4b5563', fontSize: 15 }}>
            {formData.flexible ? (
              <div>Flexible timing — your Ezra will reach out with options.</div>
            ) : (
              <div>
                {formData.date} at {formData.time}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1f2937' }}>Pay securely</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
            {[
              { id: 'google-pay', label: 'Google Pay' },
              { id: 'card', label: 'Credit / Debit Card' },
            ].map((method) => {
              const active = formData.paymentMethod === method.id;
              return (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 14,
                    border: 'none',
                    background: active
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'rgba(102,126,234,0.12)',
                    color: active ? 'white' : '#4c1d95',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, marginTop: 32 }}>
        <button
          type="button"
          onClick={goBack}
          style={{
            padding: '16px 24px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(255,255,255,0.8)',
            color: '#4b5563',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleCompleteBooking}
          style={{
            padding: '18px 36px',
            borderRadius: 16,
            border: 'none',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontWeight: 800,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 18px 45px rgba(16, 185, 129, 0.3)',
            letterSpacing: '0.4px',
          }}
        >
          Complete Booking
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 40,
          margin: '0 auto 24px',
          boxShadow: '0 20px 55px rgba(52, 211, 153, 0.35)',
        }}
      >
        ✓
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#111827', letterSpacing: -0.5 }}>
        Your plumber is on the way!
      </h2>
      <p style={{ color: '#6b7280', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        We’ve sent a confirmation to your email. You’ll get updates as soon as {selectedPlumber?.name ?? 'your Ezra'} checks in.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(102,126,234,0.12)',
            color: '#4c1d95',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Track booking
        </button>
        <Link
          to="/"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 14px 36px rgba(102, 126, 234, 0.35)',
          }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderBasicsStep();
      case 2:
        return renderUrgencyStep();
      case 3:
        return renderPlumberList();
      case 4:
        return renderScheduleStep();
      case 5:
        return renderConfirmationStep();
      case 6:
      default:
        return renderSuccessStep();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '60px 20px 80px',
        background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 35%, #f5d0fe 100%)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#4c1d95',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.8)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 6px 18px rgba(79, 70, 229, 0.15)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: '#4c1d95',
              letterSpacing: '0.4px',
            }}
          >
            Plumbing Booking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 30px 70px rgba(79, 70, 229, 0.18)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {renderStepIndicator()}
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
}

