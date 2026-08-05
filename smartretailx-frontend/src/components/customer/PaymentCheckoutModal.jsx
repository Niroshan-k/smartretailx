import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, X, CheckCircle } from 'lucide-react';

export default function PaymentCheckoutModal({
  isOpen,
  onClose,
  cart,
  cartTotal,
  onProcessPayment,
  loading
}) {
  const [cardNumber, setCardNumber] = useState('4532 8892 1049 8821');
  const [cardHolder, setCardHolder] = useState('Jane Doe');
  const [expDate, setExpDate] = useState('12/28');
  const [cvv, setCvv] = useState('882');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onProcessPayment({
      cardNumber,
      cardHolder,
      expDate,
      cvv
    });
  };

  const formatCardNumber = (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
      <div style={{ background: '#ffffff', width: '100%', maxWidth: 480, borderRadius: 4, padding: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', position: 'relative' }}>
        
        <button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', color: '#757575', cursor: 'pointer' }} onClick={onClose}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
            <CreditCard color="#f57224" size={24} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#212121' }}>Payment Gateway</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#10b981' }}>
            <Lock size={12} /> 256-Bit SSL Encrypted | PCI-DSS Compliant Gateway
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 2, padding: '0.85rem', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: '#757575', marginBottom: '0.4rem' }}>
            <span>TOTAL ITEMS ({cart.reduce((a, c) => a + c.quantity, 0)}):</span>
            <span style={{ color: '#212121' }}>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 900, color: '#f57224', paddingTop: '0.4rem', borderTop: '1px solid #eee' }}>
            <span>AMOUNT TO PAY:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>CARDHOLDER NAME</label>
            <input
              type="text"
              required
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Jane Doe"
              style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #ccc', borderRadius: 2, fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>CREDIT / DEBIT CARD NUMBER</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                maxLength="19"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="4532 •••• •••• 8821"
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #ccc', borderRadius: 2, fontSize: '0.9rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}
              />
              <CreditCard size={18} color="#757575" style={{ position: 'absolute', right: 12, top: 10 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>EXPIRY DATE</label>
              <input
                type="text"
                required
                maxLength="5"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="MM/YY"
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #ccc', borderRadius: 2, fontSize: '0.85rem', fontFamily: 'monospace' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#212121', marginBottom: '0.35rem' }}>CVV / CVC</label>
              <input
                type="password"
                required
                maxLength="4"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #ccc', borderRadius: 2, fontSize: '0.85rem', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              style={{ flex: 1, background: '#fff', color: '#757575', border: '1px solid #ccc', padding: '0.75rem', fontSize: '0.8rem', fontWeight: 700, borderRadius: 2, cursor: 'pointer' }}
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="daraz-btn-orange"
              style={{ flex: 2, margin: 0, padding: '0.75rem', fontSize: '0.85rem', fontWeight: 700, justifyContent: 'center' }}
            >
              {loading ? 'PROCESSING PAYMENT...' : `PAY $${cartTotal.toFixed(2)} NOW`}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
