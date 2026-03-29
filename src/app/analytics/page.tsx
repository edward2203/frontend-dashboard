'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/stats`);
        const stats = await res.json();
        setData([{ name: 'Hoy', visitas: stats.totalVisits || 0 }]);
      } catch (err) {
        console.error("Error conectando al backend:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h2>📊 Monitor Euclidiano - Analíticas Reales</h2>
      <div style={{ width: '100%', height: 300, backgroundColor: '#2a2a2a', borderRadius: '8px', padding: '10px' }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="visitas" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}