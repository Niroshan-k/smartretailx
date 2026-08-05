import React from 'react';
import { X } from 'lucide-react';

export default function ImagePreviewModal({ previewImage, onClose }) {
  if (!previewImage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        zIndex: 300
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          background: '#11131a',
          border: '1px solid #f43f5e',
          padding: '1.25rem',
          borderRadius: 4,
          maxWidth: 500,
          width: '90%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h4 style={{ fontSize: '0.85rem', color: '#f43f5e', marginBottom: '0.85rem', fontFamily: 'var(--font-mono)' }}>
          PRODUCT IMAGE PREVIEW
        </h4>
        <img
          src={previewImage}
          alt="Product High-Res Preview"
          style={{ width: '100%', maxHeight: 360, objectFit: 'contain', background: '#000', borderRadius: 2 }}
        />
      </div>
    </div>
  );
}
