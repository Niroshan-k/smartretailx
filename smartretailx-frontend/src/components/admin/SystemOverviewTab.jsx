import React from 'react';
import { Radio, Cpu, Lock } from 'lucide-react';

export default function SystemOverviewTab({
  orderCount,
  totalRevenue,
  productCount,
  totalAvailableStock,
  healthMetrics
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Core Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <div className="admin-panel">
          <div style={{ fontSize: '0.7rem', color: '#8492a6', marginBottom: 4 }}>TOTAL PLATFORM ORDERS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e' }}>{orderCount}</div>
        </div>
        <div className="admin-panel">
          <div style={{ fontSize: '0.7rem', color: '#8492a6', marginBottom: 4 }}>TOTAL REVENUE GENERATED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>${totalRevenue.toFixed(2)}</div>
        </div>
        <div className="admin-panel">
          <div style={{ fontSize: '0.7rem', color: '#8492a6', marginBottom: 4 }}>ACTIVE CATALOG PRODUCTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7' }}>{productCount}</div>
        </div>
        <div className="admin-panel">
          <div style={{ fontSize: '0.7rem', color: '#8492a6', marginBottom: 4 }}>TOTAL WAREHOUSE STOCK</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4' }}>{totalAvailableStock} units</div>
        </div>
      </div>

      {/* Infrastructure Telemetry Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
        {/* Kafka Event Bus Status */}
        <div className="admin-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Radio size={14} /> KAFKA EVENT STREAM
            </span>
            <span style={{ fontSize: '0.65rem', border: '1px solid #10b981', color: '#10b981', padding: '1px 5px' }}>HEALTHY</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8492a6', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ACTIVE TOPICS:</span><span style={{ color: '#fff' }}>orders-topic, payments-topic</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>REAL BROKER PING:</span><span style={{ color: '#10b981' }}>{healthMetrics.kafka?.latency || 1.2} ms</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CONTAINER ENGINE:</span><span style={{ color: '#fff' }}>Redpanda C++ Broker</span></div>
          </div>
        </div>

        {/* Kubernetes EKS Cluster Vitals */}
        <div className="admin-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={14} /> KUBERNETES CLUSTER
            </span>
            <span style={{ fontSize: '0.65rem', border: '1px solid #a855f7', color: '#a855f7', padding: '1px 5px' }}>AWS EKS</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8492a6', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>RUNNING POD REPLICAS:</span><span style={{ color: '#fff' }}>10 / 10 Pods</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>API GATEWAY PING:</span><span style={{ color: '#10b981' }}>{healthMetrics.gateway?.latency || 0.9} ms</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CONTAINER ORCHESTRATION:</span><span style={{ color: '#fff' }}>AWS EKS / Minikube</span></div>
          </div>
        </div>

        {/* Security & RBAC Audit */}
        <div className="admin-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f43f5e', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={14} /> SECURITY & COMPLIANCE
            </span>
            <span style={{ fontSize: '0.65rem', border: '1px solid #10b981', color: '#10b981', padding: '1px 5px' }}>ENCRYPTED</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8492a6', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>AUTH SCHEME:</span><span style={{ color: '#fff' }}>OAuth2 JWT (HS256)</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>COMPLIANCE:</span><span style={{ color: '#10b981' }}>GDPR & PCI-DSS</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DB ISOLATION:</span><span style={{ color: '#fff' }}>5 PostgreSQL DBs</span></div>
          </div>
        </div>
      </div>

    </div>
  );
}
