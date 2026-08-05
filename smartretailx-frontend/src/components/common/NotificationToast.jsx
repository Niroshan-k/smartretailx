import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function NotificationToast({ notification }) {
  if (!notification) return null;
  const isError = notification.type === 'error';
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 200,
      background: '#212121',
      color: '#ffffff',
      padding: '0.85rem 1.25rem',
      fontSize: '0.85rem',
      fontWeight: 600,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      borderLeft: isError ? '4px solid #f57224' : '4px solid #10b981'
    }}>
      {isError ? <AlertCircle size={18} color="#f57224" /> : <CheckCircle size={18} color="#10b981" />}
      {notification.msg}
    </div>
  );
}
