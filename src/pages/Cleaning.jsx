import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const cleaningTypes = ['Standard', 'Deep', 'Move-in/out', 'Post-renovation'];
const homeSizes = [
  { id: 'small', label: 'Studio or 1 bedroom' },
  { id: 'medium', label: '2 bedrooms' },
  { id: 'large', label: '3+ bedrooms' },
  { id: 'custom', label: 'Something else' },
];
const extras = [
  { id: 'windows', label: 'Window washing' },
  { id: 'laundry', label: 'Laundry service' },
  { id: 'inside-appliances', label: 'Inside appliances' },
  { id: 'linen-change', label: 'Linen change' },
];

const cleaningProfiles = [
  {
    id: 'noa',
    name: 'Noa Mizrahi',
    rate: '₪160/hour',
    rating: 4.9,
    reviews: 128,
    tags: ['Eco-friendly supplies', 'Move-outs specialist'],
  },
  {
    id: 'amir',
    name: 'Amir Vaknin',
    rate: '₪180/hour',
    rating: 4.8,
    reviews: 92,
    tags: ['Team of two', 'Deep cleaning pro'],
  },
  {
    id: 'lea',
    name: 'Lea Ben-Zion',
    rate: '₪150/hour',
    rating: 5.0,
    reviews: 210,
    tags: ['Hotel-standard finish', 'Pet-friendly'],
  },
  {
    id: 'gali',
    name: 'Gali Regev',
    rate: '₪200/hour',
    rating: 4.7,
    reviews: 65,
    tags: ['Post-renovation', 'Own equipment'],
  },
];

const initialState = {
  address: '',
  cleaningType: cleaningTypes[0],
  notes: '',
  homeSize: '',
  extras: [],
  description: '',
  selectedCleanerId: '',
  date: '',
  time: '',
  flexible: false,
  paymentMethod: 'google-pay',
};

export default function Cleaning() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const selectedCleaner = useMemo(
    () => cleaningProfiles.find((profile) => profile.id === formData.selectedCleanerId) ?? null,
    [formData.selectedCleanerId],
  );

  const toggleExtra = (extraId) => {
    setFormData((prev) => {
      const extrasSet = new Set(prev.extras);
      if (extrasSet.has(extraId)) {
        extrasSet.delete(extraId);
      } else {
        extrasSet.add(extraId);
      }
      return { ...prev, extras: [...extrasSet] };
    });
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSelectCleaner = (cleanerId) => {
    setFormData((prev) => ({ ...prev, selectedCleanerId: cleanerId }));
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
    const steps = ['Basics', 'Home', 'Cleaners', 'Schedule', 'Confirm', 'Done'];
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
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : completed
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(255,255,255,0.6)',
                color: active ? 'white' : '#047857',
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
                      ? 'rgba(16, 185, 129, 0.2)'
                      : 'rgba(16, 185, 129, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'white' : '#047857',
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
          color: '#047857',
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
            ? 'linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(5,150,105,0.35) 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          boxShadow: primaryDisabled
            ? 'none'
            : '0 12px 30px rgba(16, 185, 129, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          minWidth: 180,
        }}
      >
        {primaryLabel}
      </button>
    </div>
  );

  const renderBasicsStep = () => (
    <div>
      <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -1 }}>
        Cleaning help on your schedule.
      </h1>
      <p style={{ color: '#065f46', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Tell us where you need service and the type of clean you’re after.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
            Address
          </label>
          <input
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="123 Rothschild Blvd, Tel Aviv"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #d1fae5',
              fontSize: 16,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
            Cleaning type
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {cleaningTypes.map((type) => {
              const active = formData.cleaningType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, cleaningType: type }))}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? 'rgba(16,185,129,0.16)' : 'rgba(6,94,63,0.08)',
                    color: active ? '#047857' : '#065f46',
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
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
            Notes (optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            rows={4}
            placeholder="Any specific instructions? Entry codes, pets, preferred supplies..."
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #d1fae5',
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

  const renderHomeStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -0.5 }}>
        Tell us about the space
      </h2>
      <p style={{ color: '#065f46', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        We’ll match you with cleaners who can handle the scope.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
            Home size
          </label>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {homeSizes.map((size) => {
              const active = formData.homeSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, homeSize: size.id }))}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 18,
                    border: 'none',
                    background: active ? 'rgba(16,185,129,0.16)' : 'rgba(6,94,63,0.05)',
                    color: active ? '#047857' : '#065f46',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 12, fontWeight: 700, color: '#064e3b' }}>
            Extra services
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {extras.map((item) => {
              const active = formData.extras.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleExtra(item.id)}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: active ? '2px solid rgba(16,185,129,0.4)' : '2px solid rgba(6,94,63,0.12)',
                    background: active ? 'rgba(16,185,129,0.1)' : 'white',
                    color: '#047857',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
            Anything else to share? (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Let us know about stairs, surfaces, appliances, or specific products."
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #d1fae5',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          />
        </div>
      </div>

      {renderNavigation({
        primaryLabel: 'See Available Cleaners',
        primaryDisabled: !formData.homeSize,
      })}
    </div>
  );

  const renderCleanerStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -0.5 }}>
        Choose a verified cleaner
      </h2>
      <p style={{ color: '#065f46', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        These Ezras bring their own supplies and arrive ready to refresh your space.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {cleaningProfiles.map((cleaner) => {
          const active = formData.selectedCleanerId === cleaner.id;
          return (
            <div
              key={cleaner.id}
              style={{
                borderRadius: 24,
                padding: 28,
                background: 'rgba(255,255,255,0.97)',
                border: active ? '2px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(52, 211, 153, 0.15)',
                boxShadow: active
                  ? '0 18px 48px rgba(16, 185, 129, 0.35)'
                  : '0 12px 30px rgba(15, 118, 110, 0.12)',
                transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#064e3b' }}>{cleaner.name}</h3>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
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
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, color: '#047857' }}>
                    <span style={{ fontWeight: 700, fontSize: 17 }}>{cleaner.rate}</span>
                    <span>•</span>
                    <span>⭐ {cleaner.rating} ({cleaner.reviews} reviews)</span>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {cleaner.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: 'rgba(16,185,129,0.12)',
                          color: '#047857',
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
                  onClick={() => handleSelectCleaner(cleaner.id)}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: 'none',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'rgba(16,185,129,0.12)',
                    color: active ? 'white' : '#047857',
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
        primaryDisabled: !formData.selectedCleanerId,
      })}
    </div>
  );

  const renderScheduleStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -0.5 }}>
        When should we arrive?
      </h2>
      <p style={{ color: '#065f46', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Pick a time that works best for you. Flexible scheduling is available.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
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
                border: '2px solid #d1fae5',
                fontSize: 16,
                background: formData.flexible ? 'rgba(229, 231, 235, 0.6)' : 'white',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#064e3b' }}>
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
                border: '2px solid #d1fae5',
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
            color: '#047857',
            cursor: 'pointer',
          }}
        >
          <input type="checkbox" checked={formData.flexible} onChange={handleFlexibleToggle} />
          I’m flexible on the schedule
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
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -0.5 }}>
        Review your booking
      </h2>
      <p style={{ color: '#065f46', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Secure payment is held until the clean is complete.
      </p>

      <div
        style={{
          borderRadius: 24,
          padding: 28,
          background: 'rgba(255,255,255,0.97)',
          border: '1px solid rgba(52, 211, 153, 0.18)',
          boxShadow: '0 14px 36px rgba(16, 185, 129, 0.18)',
          display: 'grid',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#064e3b' }}>Service summary</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#047857', fontSize: 15 }}>
            <div><strong>Address:</strong> {formData.address}</div>
            <div><strong>Cleaning type:</strong> {formData.cleaningType}</div>
            <div><strong>Home size:</strong> {homeSizes.find((size) => size.id === formData.homeSize)?.label ?? '—'}</div>
            {formData.extras.length > 0 && (
              <div>
                <strong>Extras:</strong> {formData.extras.map((extraId) => extras.find((extra) => extra.id === extraId)?.label ?? extraId).join(', ')}
              </div>
            )}
            {formData.notes && (
              <div><strong>Notes:</strong> {formData.notes}</div>
            )}
            {formData.description && (
              <div><strong>Details:</strong> {formData.description}</div>
            )}
          </div>
        </div>

        {selectedCleaner && (
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#064e3b' }}>Your Ezra</h3>
            <div style={{ marginTop: 12, color: '#047857', fontSize: 15 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{selectedCleaner.name}</div>
              <div>{selectedCleaner.rate} • ⭐ {selectedCleaner.rating}</div>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#064e3b' }}>Schedule</h3>
          <div style={{ marginTop: 12, color: '#047857', fontSize: 15 }}>
            {formData.flexible ? 'Flexible schedule — your Ezra will coordinate a time with you.' : `${formData.date} at ${formData.time}`}
          </div>
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#064e3b' }}>Pay securely</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
            {[
              { id: 'google-pay', label: 'Google Pay' },
              { id: 'card', label: 'Credit / Debit Card' },
            ].map((method) => {
              const active = formData.paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                  style={{
                    padding: '14px 24px',
                    borderRadius: 14,
                    border: 'none',
                    background: active
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'rgba(16,185,129,0.12)',
                    color: active ? 'white' : '#047857',
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
            color: '#047857',
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
            boxShadow: '0 20px 50px rgba(16,185,129,0.28)',
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
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 40,
          margin: '0 auto 24px',
          boxShadow: '0 22px 60px rgba(16,185,129,0.35)',
        }}
      >
        ✓
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#064e3b', letterSpacing: -0.5 }}>
        Your cleaner is on the way!
      </h2>
      <p style={{ color: '#065f46', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        We’ve sent a confirmation to your email with tracking details.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(16,185,129,0.12)',
            color: '#047857',
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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 18px 45px rgba(16,185,129,0.3)',
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
        return renderHomeStep();
      case 3:
        return renderCleanerStep();
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
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 55%, #bbf7d0 100%)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#047857',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.85)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 6px 18px rgba(16,185,129,0.18)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: '#047857',
              letterSpacing: '0.4px',
            }}
          >
            Cleaning Booking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.96)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 26px 65px rgba(16, 185, 129, 0.22)',
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

