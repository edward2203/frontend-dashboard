'use client';

import React, { useEffect, useState } from 'react';
import { uptimeService, MonitorStatus } from '@/features/uptime/services/fetchMonitors';

export default function UptimePage() {
  const [monitors, setMonitors] = useState<MonitorStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMonitors = async () => {
    const data = await uptimeService.getAllMonitors();
    setMonitors(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMonitors();
    const interval = setInterval(loadMonitors, 20000); // Actualizar cada 20 segundos
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-8 text-slate-500 animate-pulse">Escaneando latencia de servidores...</p>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Vigilancia de Uptime</h1>
        <p className="text-slate-500">Estado de los servicios externos e internos</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {monitors.length > 0 ? (
          monitors.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800">{m.name}</h3>
                <p className="text-xs text-blue-500 truncate max-w-[200px]">{m.url}</p>
                <div className="flex gap-4 mt-3">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Latencia</p>
                    <p className="font-mono text-sm font-bold text-slate-700">{m.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Uptime</p>
                    <p className="font-mono text-sm font-bold text-slate-700">{m.uptimePercentage}</p>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col items-center p-4 rounded-lg ${
                m.status === 'online' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                <div className={`w-3 h-3 rounded-full mb-1 animate-pulse ${
                  m.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-[10px] font-black uppercase tracking-widest">{m.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-slate-400 py-12 italic border-2 border-dashed rounded-xl">
            No hay monitores configurados en el backend.
          </p>
        )}
      </div>
    </div>
  );
}
