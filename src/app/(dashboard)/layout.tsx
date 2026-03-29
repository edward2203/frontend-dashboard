import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Definimos los vectores de navegación (Rutas)
  const navItems = [
    { name: '📈 Analíticas', href: '/analytics', description: 'Clon de Umami' },
    { name: '🚨 Errores', href: '/errors', description: 'Clon de Sentry' },
    { name: '⏱️ Uptime', href: '/uptime', description: 'Better Stack' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR: El eje vertical de control */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-blue-400">
            Monitor Euclidiano
          </h1>
          <p className="text-xs text-slate-400 uppercase mt-1">Santísima Trinidad</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            >
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-[10px] text-slate-500 uppercase">{item.description}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            Arquitectura: v1.0.0
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL: Donde se proyectan los módulos */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
