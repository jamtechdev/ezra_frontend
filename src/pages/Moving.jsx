import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const vehicleOptions = [
  { id: 'car', label: 'Car (small loads)' },
  { id: 'truck', label: 'Truck (larger moves)' },
];

const taskSizes = [
  { id: 'one-hour', label: '1 hour — quick help' },
  { id: 'two-three', label: '2–3 hours — standard move' },
  { id: 'three-plus', label: '3+ hours — bigger move' },
];

const movingProfiles = [
  {
    id: 'itzik',
    name: 'Itzik Hadar',
    rate: '₪220/hour',
    rating: 4.9,
    reviews: 143,
    availability: 'Usually available within 24 hours',
    tags: ['Team of 3', 'Furniture disassembly'],
  },
  {
    id: 'lior',
    name: 'Lior Sasson',
    rate: '₪180/hour',
    rating: 4.8,
    reviews: 96,
    availability: 'Late afternoons & weekends',
    tags: ['Elevator buildings', 'Packing support'],
  },
  {
    id: 'adi',
    name: 'Adi Rahamim',
    rate: '₪260/hour',
    rating: 5.0,
    reviews: 210,
    availability: 'Same-day available',
    tags: ['Truck included', 'Fragile handling'],
  },
  {
    id: 'bar',
    name: 'Bar Daniel',
    rate: '₪200/hour',
    rating: 4.7,
    reviews: 78,
    availability: 'Morning slots open',
    tags: ['Two-person crew', 'Local & long distance'],
  },
];

const initialState = {
  pickupAddress: '',
  dropoffAddress: '',
  needVehicle: true,
  vehicleType: 'truck',
  taskSize: '',
  description: '',
  selectedMoverId: '',
  date: '',
  time: '',
  flexible: false,
  paymentMethod: 'google-pay',
};

export default function Moving() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);

  const selectedMover = useMemo(
    () => movingProfiles.find((profile) => profile.id === formData.selectedMoverId) ?? null,
    [formData.selectedMoverId],
  );

  const goNext = () => setStep((prev) => Math.min(prev + 1, 6));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCompleteBooking = () => {
    goNext();
  };

  const renderStepIndicator = () => {
    const steps = ['Basics', 'Move details', 'Movers', 'Schedule', 'Confirm', 'Done'];
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
                  ? 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)'
                  : completed
                    ? 'rgba(249, 115, 22, 0.2)'
                    : 'rgba(255,255,255,0.6)',
                color: active ? 'white' : '#9a3412',
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
                      ? 'rgba(249, 115, 22, 0.2)'
                      : 'rgba(253, 186, 116, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: active ? 'white' : '#9a3412',
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
          color: '#9a3412',
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
            ? 'linear-gradient(135deg, rgba(249,115,22,0.35) 0%, rgba(239,68,68,0.35) 100%)'
            : 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: 16,
          cursor: primaryDisabled ? 'not-allowed' : 'pointer',
          boxShadow: primaryDisabled
            ? 'none'
            : '0 14px 36px rgba(249, 115, 22, 0.32), inset 0 1px 0 rgba(255,255,255,0.25)',
          minWidth: 180,
        }}
      >
        {primaryLabel}
      </button>
    </div>
  );

  const renderBasicsStep = () => (
    <div>
      <h1 style={{ fontSize: 44, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -1 }}>
        Moving made easy.
      </h1>
      <p style={{ color: '#7c2d12', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Start with where we’re going and whether you need a vehicle.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
            Pickup address
          </label>
          <input
            value={formData.pickupAddress}
            onChange={(e) => setFormData((prev) => ({ ...prev, pickupAddress: e.target.value }))}
            placeholder="From: 12 Ibn Gabirol St, Tel Aviv"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #fed7aa',
              fontSize: 16,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
            Drop-off address
          </label>
          <input
            value={formData.dropoffAddress}
            onChange={(e) => setFormData((prev) => ({ ...prev, dropoffAddress: e.target.value }))}
            placeholder="To: 48 Agripas St, Jerusalem"
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #fed7aa',
              fontSize: 16,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
            Do you need a vehicle?
          </label>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, needVehicle: true }))}
              style={{
                padding: '12px 18px',
                borderRadius: 999,
                border: 'none',
                background: formData.needVehicle ? 'rgba(249,115,22,0.15)' : 'rgba(124,45,18,0.08)',
                color: formData.needVehicle ? '#9a3412' : '#7c2d12',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Yes, include a vehicle
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, needVehicle: false, vehicleType: '' }))}
              style={{
                padding: '12px 18px',
                borderRadius: 999,
                border: 'none',
                background: !formData.needVehicle ? 'rgba(249,115,22,0.15)' : 'rgba(124,45,18,0.08)',
                color: !formData.needVehicle ? '#9a3412' : '#7c2d12',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              No vehicle needed
            </button>
          </div>
        </div>

        {formData.needVehicle && (
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
              Choose vehicle type
            </label>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {vehicleOptions.map((option) => {
                const active = formData.vehicleType === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, vehicleType: option.id }))}
                    style={{
                      padding: '12px 18px',
                      borderRadius: 999,
                      border: 'none',
                      background: active ? 'rgba(249,115,22,0.18)' : 'rgba(124,45,18,0.08)',
                      color: active ? '#9a3412' : '#7c2d12',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {renderNavigation({
        primaryLabel: 'Continue',
        primaryDisabled: !formData.pickupAddress || !formData.dropoffAddress || (formData.needVehicle && !formData.vehicleType),
      })}
    </div>
  );

  const renderMoveDetailsStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -0.5 }}>
        What are we moving?
      </h2>
      <p style={{ color: '#7c2d12', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Tell us how big the job is and anything else we should prepare for.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
            Task size
          </label>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {taskSizes.map((size) => {
              const active = formData.taskSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, taskSize: size.id }))}
                  style={{
                    padding: '18px 16px',
                    borderRadius: 18,
                    border: 'none',
                    background: active ? 'rgba(249,115,22,0.18)' : 'rgba(124,45,18,0.06)',
                    color: active ? '#9a3412' : '#7c2d12',
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
          <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
            Describe your move (optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={5}
            placeholder="Tell us about stairs, fragile items, number of boxes, parking instructions..."
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 16,
              border: '2px solid #fed7aa',
              fontSize: 16,
              lineHeight: 1.6,
            }}
          />
        </div>
      </div>

      {renderNavigation({
        primaryLabel: 'See Available Movers',
        primaryDisabled: !formData.taskSize,
      })}
    </div>
  );

  const renderMoverStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -0.5 }}>
        Choose your moving crew
      </h2>
      <p style={{ color: '#7c2d12', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Trusted Ezras with transparent hourly rates and real reviews.
      </p>

      <div style={{ display: 'grid', gap: 20 }}>
        {movingProfiles.map((mover) => {
          const active = formData.selectedMoverId === mover.id;
          return (
            <div
              key={mover.id}
              style={{
                borderRadius: 24,
                padding: 28,
                background: 'rgba(255,255,255,0.97)',
                border: active ? '2px solid rgba(249,115,22,0.4)' : '1px solid rgba(251,191,36,0.2)',
                boxShadow: active
                  ? '0 18px 48px rgba(249, 115, 22, 0.35)'
                  : '0 12px 30px rgba(124,45,18,0.16)',
                transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#7c2d12' }}>{mover.name}</h3>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
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
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 17, color: '#9a3412' }}>{mover.rate}</span>
                    <span style={{ color: '#9a3412' }}>⭐ {mover.rating} ({mover.reviews} reviews)</span>
                    <span style={{ color: '#fb923c', fontWeight: 600 }}>{mover.availability}</span>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {mover.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 999,
                          background: 'rgba(249,115,22,0.15)',
                          color: '#9a3412',
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
                  onClick={() => setFormData((prev) => ({ ...prev, selectedMoverId: mover.id }))}
                  style={{
                    padding: '14px 22px',
                    borderRadius: 14,
                    border: 'none',
                    alignSelf: 'flex-start',
                    background: active
                      ? 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)'
                      : 'rgba(249,115,22,0.15)',
                    color: active ? 'white' : '#9a3412',
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
        primaryDisabled: !formData.selectedMoverId,
      })}
    </div>
  );

  const renderScheduleStep = () => (
    <div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -0.5 }}>
        Set your move time
      </h2>
      <p style={{ color: '#7c2d12', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Confirm when the movers should arrive.
      </p>

      <div style={{ display: 'grid', gap: 24 }}>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
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
                border: '2px solid #fed7aa',
                fontSize: 16,
                background: formData.flexible ? 'rgba(254,215,170,0.4)' : 'white',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 700, color: '#7c2d12' }}>
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
                border: '2px solid #fed7aa',
                fontSize: 16,
                background: formData.flexible ? 'rgba(254,215,170,0.4)' : 'white',
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
            color: '#9a3412',
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
      <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -0.5 }}>
        Review your move
      </h2>
      <p style={{ color: '#7c2d12', marginBottom: 28, fontSize: 16, fontWeight: 500 }}>
        Payment is held securely until your movers confirm completion.
      </p>

      <div
        style={{
          borderRadius: 24,
          padding: 28,
          background: 'rgba(255,255,255,0.97)',
          border: '1px solid rgba(251,191,36,0.22)',
          boxShadow: '0 18px 48px rgba(249,115,22,0.25)',
          display: 'grid',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7c2d12' }}>Move summary</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8, color: '#9a3412', fontSize: 15 }}>
            <div><strong>Pickup:</strong> {formData.pickupAddress}</div>
            <div><strong>Drop-off:</strong> {formData.dropoffAddress}</div>
            <div>
              <strong>Vehicle:</strong>{' '}
              {formData.needVehicle ? vehicleOptions.find((opt) => opt.id === formData.vehicleType)?.label ?? 'Requested' : 'No vehicle required'}
            </div>
            <div><strong>Task size:</strong> {taskSizes.find((size) => size.id === formData.taskSize)?.label ?? '—'}</div>
            {formData.description && (
              <div><strong>Details:</strong> {formData.description}</div>
            )}
          </div>
        </div>

        {selectedMover && (
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7c2d12' }}>Your Ezra</h3>
            <div style={{ marginTop: 12, color: '#9a3412', fontSize: 15 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{selectedMover.name}</div>
              <div>{selectedMover.rate} • ⭐ {selectedMover.rating}</div>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7c2d12' }}>Schedule</h3>
          <div style={{ marginTop: 12, color: '#9a3412', fontSize: 15 }}>
            {formData.flexible ? 'Flexible timing — your movers will coordinate with you.' : `${formData.date} at ${formData.time}`}
          </div>
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#7c2d12' }}>Pay securely</h3>
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
                      ? 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)'
                      : 'rgba(249,115,22,0.15)',
                    color: active ? 'white' : '#9a3412',
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
            color: '#9a3412',
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
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
            color: 'white',
            fontWeight: 800,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 20px 55px rgba(249,115,22,0.3)',
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
          background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 40,
          margin: '0 auto 24px',
          boxShadow: '0 24px 65px rgba(249,115,22,0.35)',
        }}
      >
        ✓
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 12, color: '#7c2d12', letterSpacing: -0.5 }}>
        Your movers are on the way!
      </h2>
      <p style={{ color: '#7c2d12', marginBottom: 32, fontSize: 16, fontWeight: 500 }}>
        Sit tight—your Ezra crew will reach out to coordinate the rest.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          style={{
            padding: '16px 28px',
            borderRadius: 14,
            border: 'none',
            background: 'rgba(249,115,22,0.18)',
            color: '#9a3412',
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
            background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 20px 48px rgba(249,115,22,0.3)',
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
        return renderMoveDetailsStep();
      case 3:
        return renderMoverStep();
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
        background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 55%, #fdba74 100%)',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <Link
            to="/"
            style={{
              color: '#9a3412',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 16,
              background: 'rgba(255,255,255,0.88)',
              padding: '12px 20px',
              borderRadius: 12,
              boxShadow: '0 8px 22px rgba(249,115,22,0.25)',
            }}
          >
            ← Back to EZRA
          </Link>
          <div
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: '#9a3412',
              letterSpacing: '0.4px',
            }}
          >
            Moving Booking
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 36,
            padding: '48px 44px',
            boxShadow: '0 30px 75px rgba(249,115,22,0.22)',
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

