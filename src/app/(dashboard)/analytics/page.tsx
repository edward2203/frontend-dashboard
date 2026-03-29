'use client';

import React, { useEffect, useState } from 'react';
import { analyticsService, AnalyticsStats } from '@/features/analytics/services/fetchAnalytics';
import { VisitsChart } from '@/features/analytics/components/VisitsChart';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intentamos cargar datos para el ID de prueba 'web-001'
    const loadData = async () => {
      try {
        const data = await analyticsService.getStats('web-001');
        setStats(data);
      } catch (error) {
        console.error("Error cargando analíticas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Recargar cada 60 segundos para mantener frescura de ClickHouse
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500 animate-pulse font-medium">
          📐 Arquitecto: Consultando vectores en ClickHouse...
        </p>
      </div>
    );
  }

  // Si no hay datos, mostramos un estado inicial limpio
  const currentStats = stats || {
    totalVisits: 0,
    uniqueVisitors: 0,
    topPages: [],
    visitsByDay: [{ date: 'Sin datos', visits: 0 }]
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Analíticas de Tráfico</h1>
        <p className="text-slate-500">Métricas de rendimiento en tiempo real (Umami Clone)</p>
      </header>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitas Totales</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">
            {currentStats.totalVisits.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visitantes Únicos</p>
          <p className="text-4xl font-bold text-slate-900 mt-1">
            {currentStats.uniqueVisitors.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Gráfica de Tendencia */}
      <VisitsChart data={currentStats.visitsByDay} />

      {/* Lista de Páginas */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase mb-4">Rutas con más tráfico</h3>
        <div className="space-y-3">
          {currentStats.topPages.length > 0 ? (
            currentStats.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{page.url}</code>
                <span className="font-mono font-bold text-slate-700">{page.count}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">No hay datos de rutas todavía.</p>
          )}
        </div>
      </div>
    </div>
  );
}
