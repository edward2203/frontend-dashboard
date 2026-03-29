'use client';

import React, { useEffect, useState } from 'react';

interface ErrorLog {
  _id: string;
  type: string;
  message: string;
  file: string;
  line: number;
  occurrences: number;
  lastSeen: string;
}

export default function ErrorsPage() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchErrors = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/errors');
      const data = await response.json();
      setErrors(data);
    } catch (err) {
      console.error("Error recuperando logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
  }, []);

  if (loading) return <p className="p-8 text-slate-500 animate-pulse">Sincronizando con la base de datos de errores...</p>;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Rastreo de Errores</h1>
          <p className="text-slate-500">Excepciones críticas detectadas por el Escudo de Errores</p>
        </div>
        <button 
          onClick={fetchErrors}
          className="text-xs bg-slate-800 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Refrescar
        </button>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Incidencia</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">Eventos</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Ubicación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {errors.length > 0 ? (
              errors.map((error) => (
                <tr key={error._id} className="hover:bg-red-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-red-600">{error.type}</span>
                      <span className="text-sm text-slate-600 truncate max-w-md">{error.message}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">
                      {error.occurrences || 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 italic">
                    {error.file}:{error.line}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                  No se han registrado errores. El sistema está estable.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
