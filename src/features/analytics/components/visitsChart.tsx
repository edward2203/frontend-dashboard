'use client';

import React from 'react';

interface ChartData {
  date: string;
  visits: number;
}

interface VisitsChartProps {
  data: ChartData[];
}

export const VisitsChart = ({ data }: VisitsChartProps) => {
  // Encontramos el valor máximo para escalar las barras proporcionalmente
  const maxVisits = Math.max(...data.map(d => d.visits), 1);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-end h-48 gap-2">
        {data.map((day, index) => {
          // Cálculo geométrico de la altura porcentual
          const heightPercentage = (day.visits / maxVisits) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group relative">
              {/* Tooltip flotante */}
              <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {day.visits} visitas
              </div>
              
              {/* Barra de la gráfica */}
              <div 
                className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 hover:bg-blue-600"
                style={{ height: `${heightPercentage}%` }}
              />
              
              {/* Etiqueta del día */}
              <span className="text-[10px] text-slate-400 mt-2 font-medium">
                {day.date}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tráfico Semanal</span>
        <span className="text-xs text-green-500 font-medium">↑ 12% vs semana anterior</span>
      </div>
    </div>
  );
};
