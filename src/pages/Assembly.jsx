import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const projectTypes = ['Flat-pack furniture', 'Workout equipment', 'Storage system', 'Outdoor set', 'Custom install'];
const roomOptions = ['Living room', 'Bedroom', 'Office', 'Kids room', 'Outdoor / patio'];
const extras = [
  { id: 'mounting', label: 'Wall mounting' },
  { id: 'haul-away', label: 'Packaging haul-away' },
  { id: 'electrical', label: 'Electrical hookup' },
  { id: 'prep', label: 'Layout & measuring' },
];

const assemblyProfiles = [
  {
    id: 'yael',
    name: 'Yael Shachar',
    rate: '₪180/hour',
    rating: 4.9,
    reviews: 154,
    tags: ['IKEA pro', 'Careful with delicate finishes'],
  },
  {
    id: 'omer',
    name: 'Omer Sade',
    rate: '₪200/hour',
    rating: 4.8,
    reviews: 98,
    tags: ['Gym equipment expert', 'Licensed & insured'],
  },
  {
    id: 'lia',
    name: 'Lia Grinberg',
    rate: '₪160/hour',
    rating: 5.0,
    reviews: 176,
    tags: ['Quick build teams', 'Hardware on hand'],
  },
  {
    id: 'ron',
    name: 'Ron Halper',
    rate: '₪220/hour',
    rating: 4.7,
    reviews: 84,
    tags: ['Custom cabinetry', 'Precise measurements'],
  },
];

const initialState = {
  address: '',
  projectType: projectTypes[0],
  rooms: [],
  extras: [],
  description: '',
  selectedAssemblerId: '',
  date: '',
  time: '',
  flexible: false,
  paymentMethod: 'google-pay',
};

export default function Assembly() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const selectedAssembler = useMemo(
    () => assemblyProfiles.find((profile) => profile.id === formData.selectedAssemblerId) ?? null,
    [formData.selectedAssemblerId],
  );

  const toggleRoom = (room) => {
    setFormData((prev) => {
      const set = new Set(prev.rooms);
      if (set.has(room)) {
        set.delete(room);
      } else {
        set.add(room);
      }
      return { ...prev, rooms: [...set] };
    });
  };

  const toggleExtra = (extraId) => {
    setFormData((prev) => {
      const set = new Set(prev.extras);
      if (set.has(extraId)) {
        set.delete(extraId);
      } else {
        set.add(extraId);
      }
      return { ...prev, extras: [...set] };
    });
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCompleteBooking = () => {
    goNext();
  };

  const renderStepIndicator = () => {
    const steps = ['Basics', 'Spaces', 'Assemblers', 'Schedule', 'Confirm', 'Done'];
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
                  ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                  : completed
                    ? 'rgba(248, 113, 113, 0.25)'
                    : 'rgba(255, 255, 255, 0.65)',
                color: active ? 'white' : '#b91c1c',
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
                      ? 'rgba(248,113,113,0.25)'
                      : 'rgba(254,226,226,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'white' : '#b91c1c',
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
          background: step === 1 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.85)',
          color: '#b91c1c',
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
            ? 'linear-gradient(135deg, rgba(239,68,68,0.45) 0%, rgba(185,28,28,0.45) 100%)'
            : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          boxShadow: primaryDisabled
            ? 'none'
            : '0 14px 38px rgba(239,68,68,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
          minWidth: 180,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!primaryDisabled) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 18px 48px rgba(239,68,68,0.45)';
          }
        }}
        onMouseLeave={(e) => {
          if (!primaryDisabled) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 14px 38px rgba(239,68,68,0.35), inset 0 1px 0 rgba(255,255,255,0.2)';
          }
        }}
      >
        {primaryLabel}
      </button>
    </div>
  );

  const renderBasicsStep = () => (
    <div>
      <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -1 }}>
        Assembly help, exactly when you need it.
      </h1>
      <p style={{ color: '#991b1b', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Share where the project is happening and what we’re building.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
            Address
          </label>
          <input
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="123 Dizengoff St, Tel Aviv"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #fecaca',
              fontSize: 16,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
            What are we assembling?
          </label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {projectTypes.map((type) => {
              const active = formData.projectType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 999,
                    border: 'none',
                    background: active ? 'rgba(248,113,113,0.2)' : 'rgba(127,29,29,0.08)',
                    color: active ? '#b91c1c' : '#7f1d1d',
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
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
            Notes (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Share brand, number of pieces, or anything tricky we should know."
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #fecaca',
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

  const renderSpacesStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -0.5 }}>
        Where should we set up?
      </h2>
      <p style={{ color: '#991b1b', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Choose the spaces involved and any extras you’d like help with.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
            Spaces involved
          </label>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {roomOptions.map((room) => {
              const active = formData.rooms.includes(room);
              return (
                <button
                  key={room}
                  type="button"
                  onClick={() => toggleRoom(room)}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 18,
                    border: 'none',
                    background: active ? 'rgba(248,113,113,0.2)' : 'rgba(127,29,29,0.06)',
                    color: active ? '#b91c1c' : '#7f1d1d',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {room}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 12, fontWeight: 700, color: '#7f1d1d' }}>
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
                    border: active ? '2px solid rgba(248,113,113,0.6)' : '2px solid rgba(127,29,29,0.15)',
                    background: active ? 'rgba(248,113,113,0.15)' : 'white',
                    color: '#b91c1c',
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
      </div>

      {renderNavigation({
        primaryLabel: 'See Available Assemblers',
        primaryDisabled: formData.rooms.length === 0,
      })}
    </div>
  );

  const renderAssemblersStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -0.5 }}>
        Choose a verified assembler
      </h2>
      <p style={{ color: '#991b1b', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        All Ezras bring the right tools and arrive on time—pick the one that fits your style.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {assemblyProfiles.map((assembler) => {
          const active = formData.selectedAssemblerId === assembler.id;
          return (
            <div
              key={assembler.id}
              style={{
                borderRadius: 24,
                padding: 28,
                background: 'rgba(255,255,255,0.96)',
                border: active ? '2px solid rgba(239,68,68,0.4)' : '1px solid rgba(248,113,113,0.25)',
                boxShadow: active
                  ? '0 18px 48px rgba(239,68,68,0.35)'
                  : '0 12px 30px rgba(127,29,29,0.14)',
                transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#7f1d1d' }}>{assembler.name}</h3>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
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
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, color: '#b91c1c' }}>
                    <span style={{ fontWeight: 700, fontSize: 17 }}>{assembler.rate}</span>
                    <span>•</span>
                    <span>⭐ {assembler.rating} ({assembler.reviews} reviews)</span>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {assembler.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: 'rgba(248,113,113,0.2)',
                          color: '#b91c1c',
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
                  onClick={() => setFormData((prev) => ({ ...prev, selectedAssemblerId: assembler.id }))}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: 'none',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                      : 'rgba(248,113,113,0.2)',
                    color: active ? 'white' : '#b91c1c',
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
        primaryDisabled: !formData.selectedAssemblerId,
      })}
    </div>
  );

  const renderScheduleStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -0.5 }}>
        Pick your time
      </h2>
      <p style={{ color: '#991b1b', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Assemblers arrive with everything ready—choose a time or mark it flexible.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
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
                border: '2px solid #fecaca',
                fontSize: 16,
                background: formData.flexible ? 'rgba(254,202,202,0.45)' : 'white',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7f1d1d' }}>
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
                border: '2px solid #fecaca',
                fontSize: 16,
                background: formData.flexible ? 'rgba(254,202,202,0.45)' : 'white',
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
            color: '#b91c1c',
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
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -0.5 }}>
        Review your setup
      </h2>
      <p style={{ color: '#991b1b', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        We hold payment securely until your Ezra marks the project complete.
      </p>

      <div
        style={{
          borderRadius: 24,
          padding: 28,
          background: 'rgba(255,255,255,0.96)',
          border: '1px solid rgba(248,113,113,0.35)',
          boxShadow: '0 18px 46px rgba(239,68,68,0.25)',
          display: 'grid',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7f1d1d' }}>Project summary</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#b91c1c', fontSize: 15 }}>
            <div><strong>Address:</strong> {formData.address}</div>
            <div><strong>Project:</strong> {formData.projectType}</div>
            {formData.rooms.length > 0 && (
              <div><strong>Spaces:</strong> {formData.rooms.join(', ')}</div>
            )}
            {formData.extras.length > 0 && (
              <div>
                <strong>Extras:</strong>{' '}
                {formData.extras.map((extraId) => extras.find((extra) => extra.id === extraId)?.label ?? extraId).join(', ')}
              </div>
            )}
            {formData.description && (
              <div><strong>Notes:</strong> {formData.description}</div>
            )}
          </div>
        </div>

        {selectedAssembler && (
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7f1d1d' }}>Your Ezra</h3>
            <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 15 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{selectedAssembler.name}</div>
              <div>{selectedAssembler.rate} • ⭐ {selectedAssembler.rating}</div>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7f1d1d' }}>Schedule</h3>
          <div style={{ marginTop: 12, color: '#b91c1c', fontSize: 15 }}>
            {formData.flexible ? 'Flexible timing — your Ezra will coordinate options with you.' : `${formData.date} at ${formData.time}`}
          </div>
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7f1d1d' }}>Pay securely</h3>
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
                      ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                      : 'rgba(248,113,113,0.2)',
                    color: active ? 'white' : '#b91c1c',
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
            color: '#b91c1c',
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
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            color: 'white',
            fontWeight: 800,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 20px 55px rgba(239,68,68,0.35)',
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
          background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 40,
          margin: '0 auto 24px',
          boxShadow: '0 24px 65px rgba(239,68,68,0.4)',
        }}
      >
        ✓
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#7f1d1d', letterSpacing: -0.5 }}>
        Your assembler is on the way!
      </h2>
      <p style={{ color: '#991b1b', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        We’ve sent a confirmation to your email with live tracking and messaging.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(248,113,113,0.18)',
            color: '#b91c1c',
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
            background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 20px 48px rgba(239,68,68,0.35)',
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
        return renderSpacesStep();
      case 3:
        return renderAssemblersStep();
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
        background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fca5a5 100%)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#b91c1c',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.88)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 8px 22px rgba(239,68,68,0.25)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: '#b91c1c',
              letterSpacing: '0.4px',
            }}
          >
            Assembly Booking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 30px 70px rgba(239,68,68,0.25)',
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

