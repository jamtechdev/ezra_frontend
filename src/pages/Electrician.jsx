import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const jobTypes = ['Installation', 'Wiring issue', 'Light fixture', 'Power outage', 'Other'];
const urgencyOptions = [
  { id: 'routine', label: 'Routine', subtitle: 'Within 3 days' },
  { id: 'same-day', label: 'Same-day', subtitle: 'Later today' },
  { id: 'emergency', label: 'Emergency', subtitle: 'Within 2 hours' },
];

const electricianProfiles = [
  {
    id: 'ilan',
    name: 'Ilan Peretz',
    rate: '₪220/hour',
    rating: 4.9,
    reviews: 112,
    tags: ['Licensed electrician', 'Smart home installs'],
  },
  {
    id: 'maya',
    name: 'Maya Ron',
    rate: '₪250/hour',
    rating: 5.0,
    reviews: 98,
    tags: ['Emergency specialist', '24/7 availability'],
  },
  {
    id: 'rorri',
    name: 'Rorri Azulay',
    rate: '₪200/hour',
    rating: 4.8,
    reviews: 140,
    tags: ['Lighting design', 'Commercial certified'],
  },
  {
    id: 'niv',
    name: 'Niv Meir',
    rate: '₪280/hour',
    rating: 4.7,
    reviews: 76,
    tags: ['Panel upgrades', 'Generator installs'],
  },
];

const initialState = {
  address: '',
  jobType: jobTypes[0],
  description: '',
  urgency: 'routine',
  photos: [],
  selectedElectricianId: '',
  date: '',
  time: '',
  flexible: false,
  paymentMethod: 'google-pay',
};

export default function Electrician() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const selectedElectrician = useMemo(
    () => electricianProfiles.find((profile) => profile.id === formData.selectedElectricianId) ?? null,
    [formData.selectedElectricianId],
  );

  const goNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    setFormData((prev) => ({ ...prev, photos: files }));
  };

  const handleCompleteBooking = () => {
    goNext();
  };

  const renderStepIndicator = () => {
    const steps = ['Basics', 'Urgency', 'Electricians', 'Schedule', 'Confirm', 'Done'];
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
                  ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                  : completed
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(255,255,255,0.6)',
                color: active ? 'white' : '#1d4ed8',
                fontWeight: 600,
                fontSize: 14,
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
                      ? 'rgba(59,130,246,0.15)'
                      : 'rgba(191,219,254,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'white' : '#1d4ed8',
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
          background: step === 1 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.85)',
          color: '#1d4ed8',
          fontWeight: 600,
          fontSize: 15,
          cursor: step === 1 ? 'default' : 'pointer',
          minWidth: 140,
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
            ? 'linear-gradient(135deg, rgba(37,99,235,0.35) 0%, rgba(124,58,237,0.35) 100%)'
            : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          boxShadow: primaryDisabled
            ? 'none'
            : '0 14px 36px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.25)',
          minWidth: 180,
        }}
      >
        {primaryLabel}
      </button>
    </div>
  );

  const renderBasicsStep = () => (
    <div>
      <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -1 }}>
        Professional electricians on-demand.
      </h1>
      <p style={{ color: '#1d4ed8', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Start with your location and the job you need help with.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
            Address
          </label>
          <input
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="15 HaArba'a St, Tel Aviv"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #bfdbfe',
              fontSize: 16,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
            Type of job
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {jobTypes.map((type) => {
              const active = formData.jobType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, jobType: type }))}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? 'rgba(37,99,235,0.16)' : 'rgba(30,64,175,0.08)',
                    color: active ? '#1d4ed8' : '#1e3a8a',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
            Describe the problem (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={5}
            placeholder="Share symptoms, past work, access notes, or anything helpful."
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #bfdbfe',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          />
        </div>
      </div>

      {renderNavigation({
        primaryLabel: 'Continue',
        primaryDisabled: !formData.address,
      })}
    </div>
  );

  const renderUrgencyStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -0.5 }}>
        How urgent is it?
      </h2>
      <p style={{ color: '#1d4ed8', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        We prioritize Ezras who are available in your timeframe.
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
                  ? 'linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(124,58,237,0.16) 100%)'
                  : 'rgba(255,255,255,0.85)',
                boxShadow: active
                  ? '0 14px 36px rgba(59,130,246,0.28)'
                  : '0 8px 20px rgba(30,64,175,0.12)',
                cursor: 'pointer',
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#1e3a8a' }}>{option.label}</div>
                <div style={{ color: '#1d4ed8', fontSize: 15 }}>{option.subtitle}</div>
              </div>
              <span style={{ fontSize: 20, color: active ? '#2563eb' : '#93c5fd' }}>
                {active ? '✓' : '→'}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 32 }}>
        <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
          Add photos (optional)
        </label>
        <label
          htmlFor="electrician-photo-upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            borderRadius: 14,
            border: '2px dashed rgba(37,99,235,0.35)',
            background: 'rgba(255,255,255,0.9)',
            color: '#1d4ed8',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          📷 Upload photos
        </label>
        <input
          id="electrician-photo-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {formData.photos.length > 0 && (
          <div style={{ marginTop: 12, color: '#1d4ed8', fontSize: 14 }}>
            {formData.photos.length} file{formData.photos.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {renderNavigation({
        primaryLabel: 'See Available Electricians',
      })}
    </div>
  );

  const renderElectricianList = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -0.5 }}>
        Choose a trusted Ezra
      </h2>
      <p style={{ color: '#1d4ed8', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Licensed electricians with transparent pricing and community reviews.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {electricianProfiles.map((electrician) => {
          const active = formData.selectedElectricianId === electrician.id;
          return (
            <div
              key={electrician.id}
              style={{
                borderRadius: 24,
                padding: 28,
                background: 'rgba(255,255,255,0.95)',
                border: active ? '2px solid rgba(59,130,246,0.35)' : '1px solid rgba(191,219,254,0.4)',
                boxShadow: active
                  ? '0 18px 48px rgba(59,130,246,0.28)'
                  : '0 12px 30px rgba(30,64,175,0.14)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1e3a8a' }}>{electrician.name}</h3>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      ✓ Verified
                    </span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, color: '#1d4ed8' }}>
                    <span style={{ fontWeight: 700, fontSize: 17 }}>{electrician.rate}</span>
                    <span>•</span>
                    <span>⭐ {electrician.rating} ({electrician.reviews} reviews)</span>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {electrician.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: 'rgba(37,99,235,0.15)',
                          color: '#1d4ed8',
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
                  onClick={() => setFormData((prev) => ({ ...prev, selectedElectricianId: electrician.id }))}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: 'none',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                      : 'rgba(37,99,235,0.15)',
                    color: active ? 'white' : '#1d4ed8',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
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
        primaryDisabled: !formData.selectedElectricianId,
      })}
    </div>
  );

  const renderScheduleStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -0.5 }}>
        Schedule your visit
      </h2>
      <p style={{ color: '#1d4ed8', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Your Ezra will confirm the time after accepting the job.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
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
                border: '2px solid #bfdbfe',
                fontSize: 16,
                background: formData.flexible ? 'rgba(191,219,254,0.45)' : 'white',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#1e3a8a' }}>
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
                border: '2px solid #bfdbfe',
                fontSize: 16,
                background: formData.flexible ? 'rgba(191,219,254,0.45)' : 'white',
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
            color: '#1d4ed8',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={formData.flexible}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                flexible: !prev.flexible,
                date: !prev.flexible ? '' : prev.date,
                time: !prev.flexible ? '' : prev.time,
              }))
            }
          />
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
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -0.5 }}>
        Review your booking
      </h2>
      <p style={{ color: '#1d4ed8', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Payment is held securely until the job is complete.
      </p>

      <div
        style={{
          borderRadius: 24,
          padding: 28,
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(191,219,254,0.35)',
          boxShadow: '0 18px 48px rgba(37,99,235,0.22)',
          display: 'grid',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1e3a8a' }}>Job summary</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#1d4ed8', fontSize: 15 }}>
            <div><strong>Address:</strong> {formData.address}</div>
            <div><strong>Job type:</strong> {formData.jobType}</div>
            <div>
              <strong>Urgency:</strong>{' '}
              {urgencyOptions.find((option) => option.id === formData.urgency)?.label ?? 'Routine'}
            </div>
            {formData.description && (
              <div><strong>Details:</strong> {formData.description}</div>
            )}
            {formData.photos.length > 0 && (
              <div><strong>Photos added:</strong> {formData.photos.length}</div>
            )}
          </div>
        </div>

        {selectedElectrician && (
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1e3a8a' }}>Your Ezra</h3>
            <div style={{ marginTop: 12, color: '#1d4ed8', fontSize: 15 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{selectedElectrician.name}</div>
              <div>{selectedElectrician.rate} • ⭐ {selectedElectrician.rating}</div>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1e3a8a' }}>Schedule</h3>
          <div style={{ marginTop: 12, color: '#1d4ed8', fontSize: 15 }}>
            {formData.flexible ? 'Flexible — your electrician will coordinate the best window.' : `${formData.date} at ${formData.time}`}
          </div>
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#1e3a8a' }}>Pay securely</h3>
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
                      ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                      : 'rgba(37,99,235,0.18)',
                    color: active ? 'white' : '#1d4ed8',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
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
            background: 'rgba(255,255,255,0.85)',
            color: '#1d4ed8',
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
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            fontWeight: 800,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 20px 55px rgba(59,130,246,0.3)',
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
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 40,
          margin: '0 auto 24px',
          boxShadow: '0 22px 60px rgba(59,130,246,0.32)',
        }}
      >
        ✓
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#1e3a8a', letterSpacing: -0.5 }}>
        Your electrician is on the way!
      </h2>
      <p style={{ color: '#1d4ed8', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Quick, safe, and professional — that’s Ezra.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(37,99,235,0.16)',
            color: '#1d4ed8',
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
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 20px 55px rgba(59,130,246,0.3)',
          }}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1:
        return renderBasicsStep();
      case 2:
        return renderUrgencyStep();
      case 3:
        return renderElectricianList();
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
        background: 'linear-gradient(135deg, #dbeafe 0%, #c4b5fd 55%, #e0e7ff 100%)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#1d4ed8',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.85)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: '#1d4ed8',
              letterSpacing: '0.4px',
            }}
          >
            Electrician Booking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.96)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 30px 75px rgba(37,99,235,0.24)',
            border: '1px solid rgba(255,255,255,0.7)',
          }}
        >
          {renderStepIndicator()}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

